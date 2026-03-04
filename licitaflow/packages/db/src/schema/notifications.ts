// Schema de Notificações e Preferências

export const NOTIFICATION_TYPE_VALUES = [
  'edital_novo',
  'certidao_vencendo',
  'pregao_amanha',
  'pregao_hoje',
  'pagamento_atrasado',
  'entrega_programada',
  'contrato_vencendo',
  'document_alert',
  'system',
] as const
export type NotificationTypeValue = (typeof NOTIFICATION_TYPE_VALUES)[number]

export const NOTIFICATION_CHANNEL_VALUES = ['in_app', 'push', 'email'] as const
export type NotificationChannelValue = (typeof NOTIFICATION_CHANNEL_VALUES)[number]

export interface NotificationRow {
  id: string
  tenant_id: string
  user_id: string | null
  title: string
  body: string
  type: NotificationTypeValue
  metadata: Record<string, unknown>
  read: boolean
  read_at: string | null
  created_at: string
}

export interface NotificationInsertInput {
  title: string
  body: string
  type: NotificationTypeValue | string
  metadata?: Record<string, unknown>
  user_id?: string
}

export interface NotificationPreferenceRow {
  id: string
  tenant_id: string
  user_id: string
  notification_type: NotificationTypeValue
  push_enabled: boolean
  email_enabled: boolean
  in_app_enabled: boolean
  created_at: string
  updated_at: string
}

export const DEFAULT_NOTIFICATION_PREFERENCES: {
  type: NotificationTypeValue
  push: boolean
  email: boolean
  in_app: boolean
  label: string
}[] = [
  { type: 'edital_novo', push: true, email: true, in_app: true, label: 'Edital novo identificado' },
  { type: 'certidao_vencendo', push: true, email: true, in_app: true, label: 'Certidão vencendo' },
  { type: 'pregao_amanha', push: true, email: true, in_app: true, label: 'Pregão amanhã' },
  { type: 'pregao_hoje', push: true, email: false, in_app: true, label: 'Pregão hoje' },
  { type: 'contrato_vencendo', push: true, email: true, in_app: true, label: 'Contrato vencendo' },
  { type: 'document_alert', push: false, email: true, in_app: true, label: 'Alerta de documento' },
]
