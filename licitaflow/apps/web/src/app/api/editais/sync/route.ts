import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { fetchEditaisMultiplos } from '@/lib/services/pncp-api'
import { filterEditais, toEditalInsert } from '@/lib/services/edital-filter'
import type { FilterConfig } from '@/lib/services/edital-filter'

/**
 * GET /api/editais/sync
 * Sincroniza editais do PNCP para o tenant do usuario logado.
 */
export async function GET() {
  const startTime = Date.now()

  try {
    const supabase = await createClient()

    // Verificar autenticacao
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 })
    }

    // Buscar profile com tenant_id
    const { data: profile } = await supabase
      .from('profiles')
      .select('tenant_id')
      .eq('id', user.id)
      .single()

    if (!profile?.tenant_id) {
      return NextResponse.json({ error: 'Tenant nao encontrado' }, { status: 404 })
    }

    const tenantId = profile.tenant_id

    // Buscar config de monitoramento do tenant
    const { data: config } = await supabase
      .from('tenant_monitoring_config')
      .select('*')
      .eq('tenant_id', tenantId)
      .single()

    if (!config?.sync_enabled) {
      return NextResponse.json({ message: 'Sync desabilitado' }, { status: 200 })
    }

    // Buscar source_id do PNCP
    const { data: source } = await supabase
      .from('edital_sources')
      .select('id')
      .eq('name', 'PNCP')
      .single()

    let sourceId = source?.id

    // Criar source PNCP se nao existir
    if (!sourceId) {
      const { data: newSource } = await supabase
        .from('edital_sources')
        .insert({
          name: 'PNCP',
          portal_url: 'https://pncp.gov.br',
          scraper_type: 'api',
          is_active: true,
        })
        .select('id')
        .single()
      sourceId = newSource?.id
    }

    if (!sourceId) {
      return NextResponse.json({ error: 'Falha ao obter source PNCP' }, { status: 500 })
    }

    // Criar log de sync
    const { data: syncLog } = await supabase
      .from('sync_logs')
      .insert({
        tenant_id: tenantId,
        source: 'pncp',
        status: 'running',
        params: {
          ufs: config.ufs,
          modalidades: config.modalidades,
          keywords: config.keywords,
        },
      })
      .select('id')
      .single()

    // Definir periodo de busca (ultimos 3 dias)
    const dataFinal = new Date()
    const dataInicial = new Date()
    dataInicial.setDate(dataInicial.getDate() - 3)

    // Buscar editais do PNCP
    const ufs = config.ufs?.length > 0 ? config.ufs : ['SP'] // default SP
    const modalidades = config.modalidades?.length > 0 ? config.modalidades : [6]

    const contratacoes = await fetchEditaisMultiplos({
      dataInicial,
      dataFinal,
      modalidades,
      ufs,
    })

    // Filtrar por relevancia
    const filterConfig: FilterConfig = {
      keywords: config.keywords || [],
      ufs,
      valorMin: config.valor_min ? Number(config.valor_min) : undefined,
      valorMax: config.valor_max ? Number(config.valor_max) : undefined,
      relevanceThreshold: config.relevance_threshold || 40,
    }

    const relevantes = filterEditais(contratacoes, filterConfig)

    // Upsert editais no banco
    let savedCount = 0
    for (const result of relevantes) {
      const editalData = toEditalInsert(result, tenantId, sourceId)

      const { error } = await supabase
        .from('editals')
        .upsert(editalData, {
          onConflict: 'tenant_id,pncp_id',
          ignoreDuplicates: false,
        })

      if (!error) savedCount++
    }

    // Criar notificacoes para editais novos
    if (savedCount > 0 && config.notify_on_new_edital) {
      await supabase.from('notifications').insert({
        tenant_id: tenantId,
        user_id: user.id,
        type: 'edital_novo',
        title: `${savedCount} edital(is) novo(s) encontrado(s)`,
        body: `A sincronizacao encontrou ${savedCount} editais relevantes de ${contratacoes.length} verificados.`,
        data: { source: 'pncp', count: savedCount },
      })
    }

    // Atualizar log
    const duration = Date.now() - startTime
    if (syncLog?.id) {
      await supabase
        .from('sync_logs')
        .update({
          status: 'success',
          editais_found: contratacoes.length,
          editais_relevant: relevantes.length,
          editais_saved: savedCount,
          duration_ms: duration,
          finished_at: new Date().toISOString(),
        })
        .eq('id', syncLog.id)
    }

    // Atualizar last_scraped_at do source
    await supabase
      .from('edital_sources')
      .update({ last_scraped_at: new Date().toISOString() })
      .eq('id', sourceId)

    return NextResponse.json({
      success: true,
      found: contratacoes.length,
      relevant: relevantes.length,
      saved: savedCount,
      duration_ms: duration,
    })
  } catch (error) {
    const duration = Date.now() - startTime
    const message = error instanceof Error ? error.message : 'Erro desconhecido'

    return NextResponse.json({
      success: false,
      error: message,
      duration_ms: duration,
    }, { status: 500 })
  }
}
