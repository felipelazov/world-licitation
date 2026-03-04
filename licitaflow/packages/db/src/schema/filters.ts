// Schema de Edital Filters — tipos e validação

import type { Database } from '../types'

// ─── Table types ───────────────────────────────────────────
export type EditalFiltersTable = Database['public']['Tables']['edital_filters']
export type EditalFilterRow = EditalFiltersTable['Row']
export type EditalFilterInsert = EditalFiltersTable['Insert']
export type EditalFilterUpdate = EditalFiltersTable['Update']

// ─── Filter config shape ───────────────────────────────────
export interface FilterConfig {
  keywords: string[]
  excluded_keywords?: string[]
  min_value?: number
  max_value?: number
  regions?: string[]
  modalidades?: string[]
  orgaos_excluidos?: string[]
}
