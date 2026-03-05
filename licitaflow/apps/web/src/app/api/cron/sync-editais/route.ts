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

const BATCH_SIZE = 50

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EditalInsert = Record<string, any>

async function batchUpsertEditais(
  supabase: ReturnType<typeof createAdminClient>,
  allData: EditalInsert[],
  sourceName: string,
  errors: Array<{ source: string; code: string; message: string }>,
): Promise<number> {
  if (allData.length === 0) return 0

  let saved = 0

  // Pre-fetch existing external_ids to separate new vs update
  const externalIds = allData
    .map((e) => e.external_id)
    .filter((id): id is string => id != null)

  const existingSet = new Set<string>()
  if (externalIds.length > 0) {
    // Query in chunks to avoid URL length limits
    for (let i = 0; i < externalIds.length; i += 100) {
      const chunk = externalIds.slice(i, i + 100)
      const { data: existing } = await supabase
        .from('editals')
        .select('external_id')
        .eq('tenant_id', allData[0].tenant_id)
        .in('external_id', chunk)
      if (existing) {
        existing.forEach((e: { external_id: string }) => existingSet.add(e.external_id))
      }
    }
  }

  const toInsert = allData.filter((e) => !e.external_id || !existingSet.has(e.external_id))
  const toUpdate = allData.filter((e) => e.external_id && existingSet.has(e.external_id))

  // Batch insert new records in chunks
  for (let i = 0; i < toInsert.length; i += BATCH_SIZE) {
    const chunk = toInsert.slice(i, i + BATCH_SIZE)
    const { error: batchError } = await supabase.from('editals').insert(chunk)
    if (!batchError) {
      saved += chunk.length
    } else if (batchError.code === '23505') {
      // Batch had a duplicate (pncp_id conflict) — fallback to individual inserts
      for (const item of chunk) {
        const { error: insertError } = await supabase.from('editals').insert(item)
        if (!insertError) {
          saved++
        } else if (insertError.code !== '23505' && errors.length < 5) {
          errors.push({ source: sourceName, code: insertError.code || 'unknown', message: insertError.message })
        }
      }
    } else if (errors.length < 5) {
      errors.push({ source: sourceName, code: batchError.code || 'unknown', message: batchError.message })
    }
  }

  // Batch update existing records
  if (toUpdate.length > 0) {
    const updatePromises = toUpdate.map((editalData) =>
      supabase
        .from('editals')
        .update({
          objeto: editalData.objeto,
          valor_estimado: editalData.valor_estimado,
          relevance_score: editalData.relevance_score,
          raw_data: editalData.raw_data,
          synced_at: editalData.synced_at,
        })
        .eq('tenant_id', editalData.tenant_id)
        .eq('external_id', editalData.external_id)
    )

    // Run updates in parallel batches of 20
    for (let i = 0; i < updatePromises.length; i += 20) {
      const batch = updatePromises.slice(i, i + 20)
      const results = await Promise.all(batch)
      saved += results.filter((r) => !r.error).length
    }
  }

  return saved
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Nao autorizado' }, { status: 401 })
  }

  const startTime = Date.now()
  const supabase = createAdminClient()
  const results: Array<{
    tenant_id: string
    pncp: { found: number; saved: number; relevant?: number }
    comprasgov: { found: number; saved: number; relevant?: number }
    errors?: Array<{ source: string; code: string; message: string }>
  }> = []

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
      const errors: Array<{ source: string; code: string; message: string }> = []

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

        // Fetch das duas fontes em paralelo
        const [contratacoes, { resultado: pregoes }] = await Promise.all([
          fetchEditaisMultiplos({ dataInicial, dataFinal, modalidades, ufs }),
          fetchPregoes({ dataInicial, dataFinal }),
        ])

        pncpFound = contratacoes.length
        comprasGovFound = pregoes.length

        // Filtrar e mapear para formato de insert
        const relevantes = filterEditais(contratacoes, filterConfig)
        const pncpData = relevantes.map((r) => toEditalInsert(r, tenantId, pncpSourceId))

        const pregoesRelevantes = filterPregoes(pregoes, filterConfig)
        const comprasData = pregoesRelevantes.map((r) => pregaoToEditalInsert(r, tenantId, comprasGovSourceId))

        // Batch upsert em paralelo
        const [pncpResult, comprasResult] = await Promise.all([
          batchUpsertEditais(supabase, pncpData, 'pncp', errors),
          batchUpsertEditais(supabase, comprasData, 'comprasgov', errors),
        ])

        pncpSaved = pncpResult
        comprasGovSaved = comprasResult

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
          pncp: { found: pncpFound, saved: pncpSaved, relevant: relevantes.length },
          comprasgov: { found: comprasGovFound, saved: comprasGovSaved, relevant: pregoesRelevantes.length },
          errors: errors.length > 0 ? errors : undefined,
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
