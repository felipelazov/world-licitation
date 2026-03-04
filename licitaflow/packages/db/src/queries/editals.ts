// Query helpers — Editais
// Todas as queries respeitam RLS via get_user_tenant_id()

import type { SupabaseClient } from '@supabase/supabase-js'
import type { EditalStatusValue } from '../schema/editals'

// ─── Types ─────────────────────────────────────────────────

export interface GetEditalsOptions {
  status?: EditalStatusValue | EditalStatusValue[]
  sourceId?: string
  search?: string
  limit?: number
  offset?: number
  orderBy?: 'created_at' | 'session_date' | 'estimated_value' | 'publication_date'
  orderDir?: 'asc' | 'desc'
}

export interface CreateEditalInput {
  tenant_id: string
  source_id: string
  external_id: string
  title: string
  object: string
  agency: string
  modalidade: string
  estimated_value?: number | null
  publication_date: string
  session_date?: string | null
  portal_url: string
  pdf_url?: string | null
  uasg?: string | null
  raw_data?: Record<string, unknown> | null
}

// ─── Queries ───────────────────────────────────────────────

export async function getEditals(
  client: SupabaseClient,
  options: GetEditalsOptions = {}
) {
  const {
    status,
    sourceId,
    search,
    limit = 50,
    offset = 0,
    orderBy = 'created_at',
    orderDir = 'desc',
  } = options

  let query = client
    .from('editals')
    .select('*, edital_sources(name, slug)', { count: 'exact' })

  // Filter by status
  if (status) {
    if (Array.isArray(status)) {
      query = query.in('status', status)
    } else {
      query = query.eq('status', status)
    }
  }

  // Filter by source
  if (sourceId) {
    query = query.eq('source_id', sourceId)
  }

  // Full-text search on title + object
  if (search) {
    query = query.or(`title.ilike.%${search}%,object.ilike.%${search}%`)
  }

  // Ordering
  query = query.order(orderBy, { ascending: orderDir === 'asc' })

  // Pagination
  query = query.range(offset, offset + limit - 1)

  const { data, error, count } = await query

  if (error) throw error

  return { data: data ?? [], count: count ?? 0 }
}

export async function getEditalById(
  client: SupabaseClient,
  editalId: string
) {
  const { data, error } = await client
    .from('editals')
    .select('*, edital_sources(name, slug, base_url)')
    .eq('id', editalId)
    .single()

  if (error) throw error

  return data
}

export async function createEdital(
  client: SupabaseClient,
  input: CreateEditalInput
) {
  const { data, error } = await client
    .from('editals')
    .insert({
      ...input,
      status: 'novo',
    })
    .select()
    .single()

  if (error) throw error

  return data
}

export async function upsertEdital(
  client: SupabaseClient,
  input: CreateEditalInput
) {
  const { data, error } = await client
    .from('editals')
    .upsert(
      {
        ...input,
        status: 'novo',
      },
      { onConflict: 'source_id,external_id' }
    )
    .select()
    .single()

  if (error) throw error

  return data
}

export async function updateEditalStatus(
  client: SupabaseClient,
  editalId: string,
  status: EditalStatusValue
) {
  const { data, error } = await client
    .from('editals')
    .update({ status })
    .eq('id', editalId)
    .select()
    .single()

  if (error) throw error

  return data
}

// ─── Source queries ────────────────────────────────────────

export async function getEditalSources(client: SupabaseClient) {
  const { data, error } = await client
    .from('edital_sources')
    .select('*')
    .eq('active', true)
    .order('name')

  if (error) throw error

  return data ?? []
}

export async function getEditalSourceBySlug(
  client: SupabaseClient,
  slug: string
) {
  const { data, error } = await client
    .from('edital_sources')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error

  return data
}

// ─── Filter queries ────────────────────────────────────────

export async function getEditalFilters(
  client: SupabaseClient,
  tenantId?: string
) {
  let query = client
    .from('edital_filters')
    .select('*')
    .eq('active', true)

  if (tenantId) {
    query = query.eq('tenant_id', tenantId)
  }

  const { data, error } = await query

  if (error) throw error

  return data ?? []
}

export async function createEditalFilter(
  client: SupabaseClient,
  input: {
    tenant_id: string
    name: string
    keywords: string[]
    config?: Record<string, unknown>
  }
) {
  const { data, error } = await client
    .from('edital_filters')
    .insert({
      tenant_id: input.tenant_id,
      name: input.name,
      keywords: input.keywords,
      config: input.config ?? {},
      active: true,
    })
    .select()
    .single()

  if (error) throw error

  return data
}
