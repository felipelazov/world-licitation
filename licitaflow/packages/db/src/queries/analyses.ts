// Query helpers para edital_analyses

import type { SupabaseClient } from '@supabase/supabase-js'
import type { AnalysisRow, AnalysisInsert, AnalysisDecision } from '../schema/analyses'

export async function createAnalysis(
  client: SupabaseClient,
  input: AnalysisInsert
) {
  const { data, error } = await client
    .from('edital_analyses')
    .insert({
      edital_id: input.edital_id,
      analyzed_by: input.analyzed_by ?? null,
      decision: input.decision ?? 'pendente',
      score_total: input.score_total ?? null,
      justificativa: input.justificativa ?? null,
      criteria: input.criteria,
    })
    .select()
    .single()

  return { data: data as unknown as AnalysisRow | null, error }
}

export async function getAnalysisByEdital(
  client: SupabaseClient,
  editalId: string
) {
  const { data, error } = await client
    .from('edital_analyses')
    .select('*')
    .eq('edital_id', editalId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  return { data: data as unknown as AnalysisRow | null, error }
}

export async function getAnalysesByEdital(
  client: SupabaseClient,
  editalId: string
) {
  const { data, error } = await client
    .from('edital_analyses')
    .select('*')
    .eq('edital_id', editalId)
    .order('created_at', { ascending: false })

  return { data: (data ?? []) as unknown as AnalysisRow[], error }
}

export async function updateAnalysisDecision(
  client: SupabaseClient,
  analysisId: string,
  decision: AnalysisDecision,
  scoreTotal: number | null,
  justificativa: string | null
) {
  const { data, error } = await client
    .from('edital_analyses')
    .update({
      decision,
      score_total: scoreTotal,
      justificativa,
      analyzed_at: new Date().toISOString(),
    })
    .eq('id', analysisId)
    .select()
    .single()

  return { data: data as unknown as AnalysisRow | null, error }
}

export async function updateAnalysisCriteria(
  client: SupabaseClient,
  analysisId: string,
  criteria: AnalysisInsert['criteria']
) {
  const { data, error } = await client
    .from('edital_analyses')
    .update({ criteria })
    .eq('id', analysisId)
    .select()
    .single()

  return { data: data as unknown as AnalysisRow | null, error }
}

export interface ListAnalysesOptions {
  decision?: AnalysisDecision
  dateFrom?: string
  dateTo?: string
  search?: string
  page?: number
  pageSize?: number
}

export async function listAnalyses(
  client: SupabaseClient,
  options: ListAnalysesOptions = {}
) {
  const { decision, dateFrom, dateTo, search, page = 0, pageSize = 20 } = options

  let query = client
    .from('edital_analyses')
    .select('*, editals(title, agency, estimated_value, session_date, status)', { count: 'exact' })

  if (decision) {
    query = query.eq('decision', decision)
  }

  if (dateFrom) {
    query = query.gte('analyzed_at', dateFrom)
  }

  if (dateTo) {
    query = query.lte('analyzed_at', dateTo)
  }

  if (search) {
    // Search in joined editals
    query = query.or(`editals.title.ilike.%${search}%,editals.agency.ilike.%${search}%`)
  }

  query = query
    .order('created_at', { ascending: false })
    .range(page * pageSize, (page + 1) * pageSize - 1)

  const { data, error, count } = await query

  return { data: (data ?? []) as unknown as (AnalysisRow & { editals: { title: string; agency: string; estimated_value: number | null; session_date: string | null; status: string } })[], error, count: count ?? 0 }
}

export async function getAnalysisStats(client: SupabaseClient) {
  const { data, error } = await client
    .from('edital_analyses')
    .select('decision')

  if (error || !data) {
    return { total: 0, go: 0, noGo: 0, pendente: 0, error }
  }

  const stats = {
    total: data.length,
    go: data.filter((a: { decision: string }) => a.decision === 'go').length,
    noGo: data.filter((a: { decision: string }) => a.decision === 'no_go').length,
    pendente: data.filter((a: { decision: string }) => a.decision === 'pendente').length,
    error: null,
  }

  return stats
}
