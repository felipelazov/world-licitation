// Schema de Sessões de Pregão e Lances

export const BIDDING_STATUS_VALUES = ['agendado', 'em_andamento', 'encerrado', 'cancelado'] as const
export type BiddingStatusValue = (typeof BIDDING_STATUS_VALUES)[number]

export const BIDDING_RESULT_VALUES = [
  'adjudicado',
  'classificado',
  'nao_classificado',
  'desclassificado',
  'deserto',
  'fracassado',
  'pendente',
] as const
export type BiddingResultValue = (typeof BIDDING_RESULT_VALUES)[number]

export function isValidBiddingResult(value: string): value is BiddingResultValue {
  return BIDDING_RESULT_VALUES.includes(value as BiddingResultValue)
}

export interface BiddingSessionRow {
  id: string
  tenant_id: string
  edital_id: string
  cost_sheet_id: string | null
  status: BiddingStatusValue
  result: BiddingResultValue
  floor_price: number | null
  final_price: number | null
  final_margin_pct: number | null
  classification_position: number | null
  observations: string | null
  started_at: string | null
  ended_at: string | null
  created_at: string
  updated_at: string
}

export interface BiddingSessionInsertInput {
  edital_id: string
  cost_sheet_id?: string
  floor_price?: number
  status?: BiddingStatusValue
}

export interface BidRow {
  id: string
  session_id: string
  value: number
  is_mine: boolean
  competitor_label: string | null
  bid_time: string
  notes: string | null
  created_at: string
}

export interface BidInsertInput {
  session_id: string
  value: number
  is_mine: boolean
  competitor_label?: string
  bid_time?: string
  notes?: string
}
