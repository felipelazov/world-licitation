'use server'

import { createClient } from '@/lib/supabase/server'
import { createClient as supabaseCreateClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('full_name') as string
  const cnpj = formData.get('cnpj') as string
  const razaoSocial = formData.get('razao_social') as string

  // 1. Create tenant using service role (bypasses RLS)
  const serviceClient = supabaseCreateClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )

  const { data: tenant, error: tenantError } = await serviceClient
    .from('tenants')
    .insert({ cnpj, razao_social: razaoSocial })
    .select('id')
    .single()

  if (tenantError) {
    if (tenantError.code === '23505') {
      return redirect('/auth/signup?error=cnpj_exists')
    }
    return redirect('/auth/signup?error=tenant_creation_failed')
  }

  // 2. Sign up user with tenant_id in metadata
  const { error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        tenant_id: tenant.id,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  })

  if (signUpError) {
    // Rollback tenant
    await serviceClient.from('tenants').delete().eq('id', tenant.id)
    return redirect('/auth/signup?error=signup_failed')
  }

  // 3. Create subscription (free plan, 14-day trial)
  const trialEnd = new Date()
  trialEnd.setDate(trialEnd.getDate() + 14)

  await serviceClient.from('subscriptions').insert({
    tenant_id: tenant.id,
    plan: 'free',
    status: 'trialing',
    trial_ends_at: trialEnd.toISOString(),
    current_period_start: new Date().toISOString(),
    current_period_end: trialEnd.toISOString(),
  })

  redirect('/auth/login?message=check_email')
}
