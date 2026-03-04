// Notification sender — salva notificações in-app no Supabase
// Futuramente: integrar com email (Resend), push (FCM), WhatsApp

import { createClient } from '@supabase/supabase-js'

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  return createClient(url, key)
}

export interface NotificationPayload {
  tenantId: string
  title: string
  body: string
  type: string
  metadata?: Record<string, unknown>
}

export async function sendNotification(payload: NotificationPayload): Promise<boolean> {
  const supabase = getSupabaseAdmin()

  // Salvar notificação in-app na tabela notifications
  const { error } = await supabase
    .from('notifications')
    .insert({
      tenant_id: payload.tenantId,
      title: payload.title,
      body: payload.body,
      type: payload.type,
      metadata: payload.metadata ?? {},
      read: false,
    })

  if (error) {
    console.error(JSON.stringify({
      timestamp: new Date().toISOString(),
      level: 'error',
      event: 'notification_send_failed',
      tenantId: payload.tenantId,
      type: payload.type,
      error: error.message,
    }))
    return false
  }

  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    level: 'info',
    event: 'notification_sent',
    tenantId: payload.tenantId,
    type: payload.type,
    title: payload.title,
  }))

  return true
}
