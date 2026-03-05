import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * GET /api/monitoring
 * Retorna config de monitoramento do tenant.
 */
export async function GET() {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('tenant_id')
      .eq('id', user.id)
      .single()

    if (!profile?.tenant_id) {
      return NextResponse.json({ error: 'Tenant nao encontrado' }, { status: 404 })
    }

    const { data: config } = await supabase
      .from('tenant_monitoring_config')
      .select('*')
      .eq('tenant_id', profile.tenant_id)
      .single()

    return NextResponse.json({ data: config })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

/**
 * PUT /api/monitoring
 * Atualiza config de monitoramento do tenant.
 * Body: { ufs, keywords, modalidades, valor_min, valor_max, relevance_threshold, sync_enabled, notify_on_new_edital }
 */
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('tenant_id')
      .eq('id', user.id)
      .single()

    if (!profile?.tenant_id) {
      return NextResponse.json({ error: 'Tenant nao encontrado' }, { status: 404 })
    }

    const body = await request.json()

    const { data: config, error } = await supabase
      .from('tenant_monitoring_config')
      .upsert({
        tenant_id: profile.tenant_id,
        ufs: body.ufs || [],
        keywords: body.keywords || [],
        modalidades: body.modalidades || [6],
        valor_min: body.valor_min || null,
        valor_max: body.valor_max || null,
        relevance_threshold: body.relevance_threshold || 40,
        sync_enabled: body.sync_enabled ?? true,
        notify_on_new_edital: body.notify_on_new_edital ?? true,
      }, { onConflict: 'tenant_id' })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data: config })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
