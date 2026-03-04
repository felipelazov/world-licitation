// Query helpers para documents, document_categories, document_alerts

import type { SupabaseClient } from '@supabase/supabase-js'
import type { DocumentRow, DocumentInsertInput, DocumentCategoryRow, DocumentAlertRow } from '../schema/documents'

// ─── Documents ───────────────────────────────────────────────

export interface ListDocumentsOptions {
  categoryId?: string
  status?: string
  search?: string
  page?: number
  pageSize?: number
}

export async function listDocuments(
  client: SupabaseClient,
  options: ListDocumentsOptions = {}
) {
  const { categoryId, status, search, page = 0, pageSize = 50 } = options

  let query = client
    .from('documents')
    .select('*, document_categories(id, name, slug)', { count: 'exact' })

  if (categoryId) {
    query = query.eq('category_id', categoryId)
  }

  if (status) {
    query = query.eq('status', status)
  }

  if (search) {
    query = query.ilike('name', `%${search}%`)
  }

  query = query
    .order('created_at', { ascending: false })
    .range(page * pageSize, (page + 1) * pageSize - 1)

  const { data, error, count } = await query

  return { data: (data ?? []) as unknown as DocumentRow[], error, count: count ?? 0 }
}

export async function getDocumentById(client: SupabaseClient, id: string) {
  const { data, error } = await client
    .from('documents')
    .select('*, document_categories(id, name, slug)')
    .eq('id', id)
    .single()

  return { data: data as unknown as DocumentRow | null, error }
}

export async function createDocument(client: SupabaseClient, input: DocumentInsertInput) {
  const { data, error } = await client
    .from('documents')
    .insert({
      name: input.name,
      category_id: input.category_id ?? null,
      description: input.description ?? null,
      file_path: input.file_path ?? null,
      file_type: input.file_type ?? null,
      file_size: input.file_size ?? null,
      issued_at: input.issued_at ?? null,
      expires_at: input.expires_at ?? null,
      alert_days_before: input.alert_days_before ?? 30,
      notes: input.notes ?? null,
      status: 'pendente',
    })
    .select()
    .single()

  return { data: data as unknown as DocumentRow | null, error }
}

export async function updateDocument(
  client: SupabaseClient,
  id: string,
  updates: Partial<DocumentInsertInput & { status: string }>
) {
  const { data, error } = await client
    .from('documents')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  return { data: data as unknown as DocumentRow | null, error }
}

export async function deleteDocument(client: SupabaseClient, id: string) {
  const { error } = await client.from('documents').delete().eq('id', id)
  return { error }
}

export async function getExpiringDocuments(
  client: SupabaseClient,
  daysAhead: number = 30
) {
  const futureDate = new Date()
  futureDate.setDate(futureDate.getDate() + daysAhead)

  const { data, error } = await client
    .from('documents')
    .select('*, document_categories(id, name, slug)')
    .not('expires_at', 'is', null)
    .lte('expires_at', futureDate.toISOString().split('T')[0])
    .neq('status', 'pendente')
    .order('expires_at', { ascending: true })

  return { data: (data ?? []) as unknown as DocumentRow[], error }
}

export async function getDocumentStats(client: SupabaseClient) {
  const { data, error } = await client
    .from('documents')
    .select('status')

  if (error || !data) {
    return { total: 0, valido: 0, vencendo: 0, vencido: 0, pendente: 0, error }
  }

  return {
    total: data.length,
    valido: data.filter((d: { status: string }) => d.status === 'valido').length,
    vencendo: data.filter((d: { status: string }) => d.status === 'vencendo').length,
    vencido: data.filter((d: { status: string }) => d.status === 'vencido').length,
    pendente: data.filter((d: { status: string }) => d.status === 'pendente').length,
    error: null,
  }
}

// ─── Categories ──────────────────────────────────────────────

export async function getDocumentCategories(client: SupabaseClient) {
  const { data, error } = await client
    .from('document_categories')
    .select('*')
    .order('sort_order', { ascending: true })

  return { data: (data ?? []) as unknown as DocumentCategoryRow[], error }
}

export async function getCategoryDocCount(client: SupabaseClient) {
  const { data, error } = await client
    .from('documents')
    .select('category_id, status')

  if (error || !data) return { data: [], error }

  const countMap = new Map<string, { total: number; valido: number; vencido: number }>()

  for (const doc of data as { category_id: string | null; status: string }[]) {
    const catId = doc.category_id ?? 'sem-categoria'
    const existing = countMap.get(catId) ?? { total: 0, valido: 0, vencido: 0 }
    existing.total++
    if (doc.status === 'valido') existing.valido++
    if (doc.status === 'vencido') existing.vencido++
    countMap.set(catId, existing)
  }

  return { data: Array.from(countMap.entries()).map(([id, counts]) => ({ categoryId: id, ...counts })), error: null }
}

// ─── Alerts ──────────────────────────────────────────────────

export async function getDocumentAlerts(
  client: SupabaseClient,
  documentId: string
) {
  const { data, error } = await client
    .from('document_alerts')
    .select('*')
    .eq('document_id', documentId)
    .order('alert_date', { ascending: true })

  return { data: (data ?? []) as unknown as DocumentAlertRow[], error }
}

export async function createDocumentAlert(
  client: SupabaseClient,
  input: { document_id: string; alert_date: string; alert_type: string }
) {
  const { data, error } = await client
    .from('document_alerts')
    .insert(input)
    .select()
    .single()

  return { data: data as unknown as DocumentAlertRow | null, error }
}

export async function markAlertSent(
  client: SupabaseClient,
  alertId: string,
  channel: string
) {
  const { error } = await client
    .from('document_alerts')
    .update({ sent: true, sent_at: new Date().toISOString(), channel })
    .eq('id', alertId)

  return { error }
}

export async function getPendingAlerts(client: SupabaseClient) {
  const today = new Date().toISOString().split('T')[0]

  const { data, error } = await client
    .from('document_alerts')
    .select('*, documents(name, expires_at, tenant_id)')
    .eq('sent', false)
    .lte('alert_date', today)
    .order('alert_date', { ascending: true })

  return { data: (data ?? []) as unknown as (DocumentAlertRow & { documents: { name: string; expires_at: string; tenant_id: string } })[], error }
}
