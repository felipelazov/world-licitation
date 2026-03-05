import { createClient } from '@supabase/supabase-js'

/**
 * Supabase admin client — usa service_role key.
 * Bypass RLS. Usar APENAS em server-side (cron jobs, webhooks).
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  if (!serviceKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY nao configurada')
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  })
}
