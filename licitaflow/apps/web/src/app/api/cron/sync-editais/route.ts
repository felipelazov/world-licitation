import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { fetchEditaisMultiplos } from '@/lib/services/pncp-api'
import { filterEditais, toEditalInsert } from '@/lib/services/edital-filter'
import type { FilterConfig } from '@/lib/services/edital-filter'

/**
 * GET /api/cron/sync-editais
 * Cron job — sincroniza editais do PNCP para TODOS os tenants com sync habilitado.
 * Protegido por CRON_SECRET (Vercel envia automaticamente).
 */
export const maxDuration = 300 // 5 minutos (Vercel Pro)

export async function GET(request: NextRequest) {
  // Verificar autorizacao do cron
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Nao autorizado' }, { status: 401 })
  }

  const startTime = Date.now()
  const supabase = createAdminClient()
  const results: Array<{ tenant_id: string; found: number; saved: number }> = []

  try {
    // Buscar todos os tenants com sync habilitado
    const { data: configs } = await supabase
      .from('tenant_monitoring_config')
      .select('*')
      .eq('sync_enabled', true)

    if (!configs || configs.length === 0) {
      return NextResponse.json({ message: 'Nenhum tenant com sync ativo', tenants: 0 })
    }

    // Buscar/criar source PNCP
    const { data: source } = await supabase
      .from('edital_sources')
      .select('id')
      .eq('name', 'PNCP')
      .single()

    let sourceId = source?.id

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

    // Periodo de busca: ultimos 3 dias
    const dataFinal = new Date()
    const dataInicial = new Date()
    dataInicial.setDate(dataInicial.getDate() - 3)

    // Processar cada tenant
    for (const config of configs) {
      const tenantId = config.tenant_id

      try {
        // Log de sync
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
              trigger: 'cron',
            },
          })
          .select('id')
          .single()

        const ufs = config.ufs?.length > 0 ? config.ufs : ['SP']
        const modalidades = config.modalidades?.length > 0 ? config.modalidades : [6]

        const contratacoes = await fetchEditaisMultiplos({
          dataInicial,
          dataFinal,
          modalidades,
          ufs,
        })

        const filterConfig: FilterConfig = {
          keywords: config.keywords || [],
          ufs,
          valorMin: config.valor_min ? Number(config.valor_min) : undefined,
          valorMax: config.valor_max ? Number(config.valor_max) : undefined,
          relevanceThreshold: config.relevance_threshold || 40,
        }

        const relevantes = filterEditais(contratacoes, filterConfig)

        // Upsert editais
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

        // Notificacao
        if (savedCount > 0 && config.notify_on_new_edital) {
          // Buscar qualquer user do tenant para notificar
          const { data: tenantUser } = await supabase
            .from('profiles')
            .select('id')
            .eq('tenant_id', tenantId)
            .limit(1)
            .single()

          if (tenantUser) {
            await supabase.from('notifications').insert({
              tenant_id: tenantId,
              user_id: tenantUser.id,
              type: 'edital_novo',
              title: `${savedCount} edital(is) novo(s) encontrado(s)`,
              body: `Sync automatico encontrou ${savedCount} editais relevantes de ${contratacoes.length} verificados.`,
              data: { source: 'pncp', count: savedCount, trigger: 'cron' },
            })
          }
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

        results.push({ tenant_id: tenantId, found: contratacoes.length, saved: savedCount })
      } catch (tenantError) {
        const message = tenantError instanceof Error ? tenantError.message : 'Erro'
        results.push({ tenant_id: tenantId, found: 0, saved: 0 })

        // Log de erro
        await supabase.from('sync_logs').insert({
          tenant_id: tenantId,
          source: 'pncp',
          status: 'error',
          params: { error: message, trigger: 'cron' },
          finished_at: new Date().toISOString(),
        })
      }
    }

    // Atualizar last_scraped_at do source
    await supabase
      .from('edital_sources')
      .update({ last_scraped_at: new Date().toISOString() })
      .eq('id', sourceId)

    return NextResponse.json({
      success: true,
      tenants_processed: results.length,
      results,
      duration_ms: Date.now() - startTime,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido'
    return NextResponse.json({
      success: false,
      error: message,
      duration_ms: Date.now() - startTime,
    }, { status: 500 })
  }
}
