// Schema de Editais — tipos e validação
// Não usamos Drizzle (usamos Supabase client direto).
// Estes schemas servem como source of truth para validação e tipagem.

import type { Database } from '../types'

// ─── Table types ───────────────────────────────────────────
export type EditalsTable = Database['public']['Tables']['editals']
export type EditalRow = EditalsTable['Row']
export type EditalInsert = EditalsTable['Insert']
export type EditalUpdate = EditalsTable['Update']

export type EditalSourcesTable = Database['public']['Tables']['edital_sources']
export type EditalSourceRow = EditalSourcesTable['Row']
export type EditalSourceInsert = EditalSourcesTable['Insert']

// ─── Status enum ───────────────────────────────────────────
export const EDITAL_STATUS_VALUES = [
  'novo',
  'analisando',
  'go',
  'no_go',
  'proposta_enviada',
  'em_pregao',
  'adjudicado',
  'nao_adjudicado',
  'contrato',
  'descartado',
] as const

export type EditalStatusValue = (typeof EDITAL_STATUS_VALUES)[number]

// ─── Modalidade enum ───────────────────────────────────────
export const MODALIDADE_VALUES = [
  'pregao_eletronico',
  'pregao_presencial',
  'concorrencia',
  'tomada_precos',
  'convite',
  'dispensa',
  'inexigibilidade',
  'chamada_publica',
] as const

export type ModalidadeValue = (typeof MODALIDADE_VALUES)[number]

// ─── Validation helpers ────────────────────────────────────
export function isValidEditalStatus(status: string): status is EditalStatusValue {
  return EDITAL_STATUS_VALUES.includes(status as EditalStatusValue)
}

export function isValidModalidade(modalidade: string): modalidade is ModalidadeValue {
  return MODALIDADE_VALUES.includes(modalidade as ModalidadeValue)
}
