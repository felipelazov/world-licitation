import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { fetchEditaisMultiplos } from '@/lib/services/pncp-api'
import { fetchPregoes } from '@/lib/services/compras-gov-api'
import { filterEditais, toEditalInsert, filterPregoes, pregaoToEditalInsert } from '@/lib/services/edital-filter'
import type { FilterConfig } from '@/lib/services/edital-filter'

/**
 * GET /api/cron/sync-editais
 * Cron job — sincroniza editais do PNCP + Compras.gov para TODOS os tenants.
 * Protegido por CRON_SECRET (Vercel envia automaticamente).
 */
export const maxDuration = 300 // 5 minutos

async function getOrCreateSource(supabase: ReturnType<typeof createAdminClient>, name: string, portalUrl: string) {
  const { data: source } = await supabase
    .from('edital_sources')
    .select('id')
    .eq('name', name)
    .single()

  if (source?.id) return source.id

  const { data: newSource } = await supabase
    .from('edital_sources')
    .insert({
      name,
      portal_url: portalUrl,
      scraper_type: 'api',
      is_active: true,
    })
    .select('id')
    .single()

  return newSource?.id
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Nao autorizado' }, { status: 401 })
  }

  const startTime = Date.now()
  const supabase = createAdminClient()
  const results: Array<{ tenant_id: string; pncp: { found: number; saved: number }; comprasgov: { found: number; saved: number } }> = []

  try {
    const { data: configs } = await supabase
      .from('tenant_monitoring_config')
      .select('*')
      .eq('sync_enabled', true)

    if (!configs || configs.length === 0) {
      return NextResponse.json({ message: 'Nenhum tenant com sync ativo', tenants: 0 })
    }

    // Buscar/criar sources
    const [pncpSourceId, comprasGovSourceId] = await Promise.all([
      getOrCreateSource(supabase, 'PNCP', 'https://pncp.gov.br'),
      getOrCreateSource(supabase, 'Compras.gov.br', 'https://compras.gov.br'),
    ])

    if (!pncpSourceId || !comprasGovSourceId) {
      return NextResponse.json({ error: 'Falha ao obter sources' }, { status: 500 })
    }

    // Periodo: ultimos 3 dias
    const dataFinal = new Date()
    const dataInicial = new Date()
    dataInicial.setDate(dataInicial.getDate() - 3)

    for (const config of configs) {
      const tenantId = config.tenant_id
      let pncpFound = 0, pncpSaved = 0, comprasGovFound = 0, comprasGovSaved = 0

      try {
        // Log de sync
        const { data: syncLog } = await supabase
          .from('sync_logs')
          .insert({
            tenant_id: tenantId,
            source: 'pncp+comprasgov',
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

        const filterConfig: FilterConfig = {
          keywords: config.keywords || [],
          ufs,
          valorMin: config.valor_min ? Number(config.valor_min) : undefined,
          valorMax: config.valor_max ? Number(config.valor_max) : undefined,
          relevanceThreshold: config.relevance_threshold || 40,
        }

        // ==========================================
        // FONTE 1: PNCP
        // ==========================================
        const contratacoes = await fetchEditaisMultiplos({
          dataInicial,
          dataFinal,
          modalidades,
          ufs,
        })
        pncpFound = contratacoes.length

        const relevantes = filterEditais(contratacoes, filterConfig)
        for (const result of relevantes) {
          const editalData = toEditalInsert(result, tenantId, pncpSourceId)
          const { error } = await supabase
            .from('editals')
            .upsert(editalData, { onConflict: 'tenant_id,source_id,external_id', ignoreDuplicates: false })
          if (!error) pncpSaved++
        }

        // ==========================================
        // FONTE 2: Compras.gov.br (Pregoes Legados)
        // ==========================================
        const { resultado: pregoes } = await fetchPregoes({ dataInicial, dataFinal })
        comprasGovFound = pregoes.length

        const pregoesRelevantes = filterPregoes(pregoes, filterConfig)
        for (const result of pregoesRelevantes) {
          const editalData = pregaoToEditalInsert(result, tenantId, comprasGovSourceId)
          const { error } = await supabase
            .from('editals')
            .upsert(editalData, { onConflict: 'tenant_id,source_id,external_id', ignoreDuplicates: false })
          if (!error) comprasGovSaved++
        }

        const totalSaved = pncpSaved + comprasGovSaved
        const totalFound = pncpFound + comprasGovFound

        // Notificacao
        if (totalSaved > 0 && config.notify_on_new_edital) {
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
              title: `${totalSaved} edital(is) novo(s) encontrado(s)`,
              body: `Sync automatico: ${pncpSaved} do PNCP + ${comprasGovSaved} do Compras.gov (${totalFound} verificados).`,
              data: { pncp: pncpSaved, comprasgov: comprasGovSaved, trigger: 'cron' },
            })
          }
        }

        // Atualizar log
        if (syncLog?.id) {
          await supabase
            .from('sync_logs')
            .update({
              status: 'success',
              editais_found: totalFound,
              editais_relevant: relevantes.length + pregoesRelevantes.length,
              editais_saved: totalSaved,
              duration_ms: Date.now() - startTime,
              finished_at: new Date().toISOString(),
            })
            .eq('id', syncLog.id)
        }

        results.push({
          tenant_id: tenantId,
          pncp: { found: pncpFound, saved: pncpSaved },
          comprasgov: { found: comprasGovFound, saved: comprasGovSaved },
        })
      } catch (tenantError) {
        const message = tenantError instanceof Error ? tenantError.message : 'Erro'
        results.push({
          tenant_id: tenantId,
          pncp: { found: pncpFound, saved: pncpSaved },
          comprasgov: { found: comprasGovFound, saved: comprasGovSaved },
        })

        await supabase.from('sync_logs').insert({
          tenant_id: tenantId,
          source: 'pncp+comprasgov',
          status: 'error',
          params: { error: message, trigger: 'cron' },
          finished_at: new Date().toISOString(),
        })
      }
    }

    // Atualizar last_scraped_at dos sources
    const now = new Date().toISOString()
    await Promise.all([
      supabase.from('edital_sources').update({ last_scraped_at: now }).eq('id', pncpSourceId),
      supabase.from('edital_sources').update({ last_scraped_at: now }).eq('id', comprasGovSourceId),
    ])

    return NextResponse.json({
      success: true,
      tenants_processed: results.length,
      sources: ['PNCP', 'Compras.gov.br'],
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
