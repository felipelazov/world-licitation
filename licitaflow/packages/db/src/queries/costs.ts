// Query helpers para cost_sheets e cost_items

import type { SupabaseClient } from '@supabase/supabase-js'
import type { CostSheetRow, CostSheetInsertInput, CostItemRow, CostItemInsertInput } from '../schema/costs'

// ─── Cost Sheets ────────────────────────────────────────────

export interface ListCostSheetsOptions {
  editalId?: string
  isTemplate?: boolean
  search?: string
  page?: number
  pageSize?: number
}

export async function listCostSheets(
  client: SupabaseClient,
  options: ListCostSheetsOptions = {}
) {
  const { editalId, isTemplate, search, page = 0, pageSize = 50 } = options

  let query = client
    .from('cost_sheets')
    .select('*, editals(title, estimated_value)', { count: 'exact' })

  if (editalId) query = query.eq('edital_id', editalId)
  if (isTemplate !== undefined) query = query.eq('is_template', isTemplate)
  if (search) query = query.ilike('name', `%${search}%`)

  query = query
    .order('updated_at', { ascending: false })
    .range(page * pageSize, (page + 1) * pageSize - 1)

  const { data, error, count } = await query
  return { data: (data ?? []) as unknown as CostSheetRow[], error, count: count ?? 0 }
}

export async function getCostSheetById(client: SupabaseClient, id: string) {
  const { data, error } = await client
    .from('cost_sheets')
    .select('*, editals(title, estimated_value, session_date)')
    .eq('id', id)
    .single()

  return { data: data as unknown as CostSheetRow | null, error }
}

export async function createCostSheet(client: SupabaseClient, input: CostSheetInsertInput) {
  const { data, error } = await client
    .from('cost_sheets')
    .insert({
      name: input.name,
      edital_id: input.edital_id ?? null,
      description: input.description ?? null,
      is_template: input.is_template ?? false,
      reference_price: input.reference_price ?? null,
      desired_margin_pct: input.desired_margin_pct ?? 15,
      floor_margin_pct: input.floor_margin_pct ?? 5,
      tax_rate_pct: input.tax_rate_pct ?? 6,
    })
    .select()
    .single()

  return { data: data as unknown as CostSheetRow | null, error }
}

export async function updateCostSheet(
  client: SupabaseClient,
  id: string,
  updates: Partial<CostSheetInsertInput>
) {
  const { data, error } = await client
    .from('cost_sheets')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  return { data: data as unknown as CostSheetRow | null, error }
}

export async function deleteCostSheet(client: SupabaseClient, id: string) {
  // Itens são deletados por cascade
  const { error } = await client.from('cost_sheets').delete().eq('id', id)
  return { error }
}

export async function duplicateCostSheet(client: SupabaseClient, id: string, newName: string) {
  // 1. Buscar planilha original
  const { data: original, error: fetchError } = await client
    .from('cost_sheets')
    .select('*')
    .eq('id', id)
    .single()

  if (fetchError || !original) return { data: null, error: fetchError }

  // 2. Criar cópia
  const { data: copy, error: copyError } = await client
    .from('cost_sheets')
    .insert({
      name: newName,
      edital_id: (original as any).edital_id,
      description: (original as any).description,
      is_template: false,
      reference_price: (original as any).reference_price,
      desired_margin_pct: (original as any).desired_margin_pct,
      floor_margin_pct: (original as any).floor_margin_pct,
      tax_rate_pct: (original as any).tax_rate_pct,
    })
    .select()
    .single()

  if (copyError || !copy) return { data: null, error: copyError }

  // 3. Copiar itens
  const { data: items } = await client
    .from('cost_items')
    .select('*')
    .eq('cost_sheet_id', id)
    .order('sort_order', { ascending: true })

  if (items && items.length > 0) {
    const newItems = items.map((item: any) => ({
      cost_sheet_id: (copy as any).id,
      category: item.category,
      description: item.description,
      quantity: item.quantity,
      unit: item.unit,
      unit_cost: item.unit_cost,
      sort_order: item.sort_order,
    }))

    await client.from('cost_items').insert(newItems)
  }

  return { data: copy as unknown as CostSheetRow, error: null }
}

// ─── Cost Items ─────────────────────────────────────────────

export async function getCostItems(client: SupabaseClient, costSheetId: string) {
  const { data, error } = await client
    .from('cost_items')
    .select('*')
    .eq('cost_sheet_id', costSheetId)
    .order('sort_order', { ascending: true })

  return { data: (data ?? []) as unknown as CostItemRow[], error }
}

export async function createCostItem(client: SupabaseClient, input: CostItemInsertInput) {
  const { data, error } = await client
    .from('cost_items')
    .insert(input)
    .select()
    .single()

  return { data: data as unknown as CostItemRow | null, error }
}

export async function updateCostItem(
  client: SupabaseClient,
  id: string,
  updates: Partial<Omit<CostItemInsertInput, 'cost_sheet_id'>>
) {
  const { data, error } = await client
    .from('cost_items')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  return { data: data as unknown as CostItemRow | null, error }
}

export async function deleteCostItem(client: SupabaseClient, id: string) {
  const { error } = await client.from('cost_items').delete().eq('id', id)
  return { error }
}

export async function bulkCreateCostItems(
  client: SupabaseClient,
  items: CostItemInsertInput[]
) {
  const { data, error } = await client
    .from('cost_items')
    .insert(items)
    .select()

  return { data: (data ?? []) as unknown as CostItemRow[], error }
}

// ─── Totais ─────────────────────────────────────────────────

export interface CostTotals {
  byCategory: Map<string, number>
  totalCost: number
  itemCount: number
}

export function calculateCostTotals(items: CostItemRow[]): CostTotals {
  const byCategory = new Map<string, number>()
  let totalCost = 0

  for (const item of items) {
    const itemTotal = item.quantity * item.unit_cost
    totalCost += itemTotal
    byCategory.set(item.category, (byCategory.get(item.category) ?? 0) + itemTotal)
  }

  return { byCategory, totalCost, itemCount: items.length }
}
