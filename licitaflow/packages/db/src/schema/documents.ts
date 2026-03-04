// Schema de Documentos — tipos e validação

export const DOCUMENT_STATUS_VALUES = ['valido', 'vencendo', 'vencido', 'pendente'] as const
export type DocumentStatusValue = (typeof DOCUMENT_STATUS_VALUES)[number]

export const ALERT_TYPE_VALUES = ['vencendo', 'vencido', 'renovar'] as const
export type AlertTypeValue = (typeof ALERT_TYPE_VALUES)[number]

export function isValidDocumentStatus(status: string): status is DocumentStatusValue {
  return DOCUMENT_STATUS_VALUES.includes(status as DocumentStatusValue)
}

export interface DocumentRow {
  id: string
  tenant_id: string
  category_id: string | null
  name: string
  description: string | null
  file_path: string | null
  file_type: string | null
  file_size: number | null
  issued_at: string | null
  expires_at: string | null
  status: DocumentStatusValue
  alert_days_before: number
  notes: string | null
  created_at: string
  updated_at: string
  document_categories?: { id: string; name: string; slug: string } | null
}

export interface DocumentInsertInput {
  name: string
  category_id?: string
  description?: string
  file_path?: string
  file_type?: string
  file_size?: number
  issued_at?: string
  expires_at?: string
  alert_days_before?: number
  notes?: string
}

export interface DocumentCategoryRow {
  id: string
  name: string
  slug: string
  sort_order: number
  is_system: boolean
}

export interface DocumentAlertRow {
  id: string
  tenant_id: string
  document_id: string
  alert_date: string
  alert_type: AlertTypeValue
  sent: boolean
  sent_at: string | null
  channel: string | null
  created_at: string
}

// Default alert thresholds in days
export const DEFAULT_ALERT_THRESHOLDS = [30, 15, 7, 1, 0] as const

// Standard categories for habilitação
export const HABILITACAO_CATEGORIES = [
  'certidoes-negativas',
  'documentos-societarios',
  'qualificacao-tecnica',
  'documentos-fiscais',
  'licencas-alvaras',
] as const
