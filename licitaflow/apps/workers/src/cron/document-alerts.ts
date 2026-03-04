// Cron: Gera e envia alertas de documentos vencendo/vencidos
// Roda após o document-status cron — cria alertas na tabela document_alerts e envia notificações

import { createClient } from '@supabase/supabase-js'
import { sendNotification } from '../notifications/send-notification'

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  return createClient(url, key)
}

interface AlertableDoc {
  id: string
  tenant_id: string
  name: string
  expires_at: string
  alert_days_before: number
  status: string
}

function getAlertType(daysUntilExpiry: number): string | null {
  if (daysUntilExpiry <= 0) return 'vencido'
  if (daysUntilExpiry <= 30) return 'vencendo'
  return null
}

export async function runDocumentAlertsCron(): Promise<{ created: number; sent: number; errors: number }> {
  const supabase = getSupabaseAdmin()
  let created = 0
  let sent = 0
  let errors = 0

  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    level: 'info',
    event: 'document_alerts_cron_started',
  }))

  // 1. Buscar documentos vencendo ou vencidos
  const { data: docs, error } = await supabase
    .from('documents')
    .select('id, tenant_id, name, expires_at, alert_days_before, status')
    .in('status', ['vencendo', 'vencido'])

  if (error) {
    console.error(JSON.stringify({
      timestamp: new Date().toISOString(),
      level: 'error',
      event: 'document_alerts_fetch_failed',
      error: error.message,
    }))
    return { created: 0, sent: 0, errors: 1 }
  }

  if (!docs || docs.length === 0) {
    return { created: 0, sent: 0, errors: 0 }
  }

  const today = new Date().toISOString().split('T')[0]

  for (const doc of docs as AlertableDoc[]) {
    const expires = new Date(doc.expires_at)
    const now = new Date()
    const diffDays = Math.ceil((expires.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    const alertType = getAlertType(diffDays)

    if (!alertType) continue

    // Verificar se já existe alerta para hoje deste documento
    const { data: existingAlert } = await supabase
      .from('document_alerts')
      .select('id')
      .eq('document_id', doc.id)
      .eq('alert_date', today)
      .eq('alert_type', alertType)
      .limit(1)

    if (existingAlert && existingAlert.length > 0) continue

    // Criar alerta
    const { data: alert, error: alertError } = await supabase
      .from('document_alerts')
      .insert({
        document_id: doc.id,
        alert_date: today,
        alert_type: alertType,
        sent: false,
      })
      .select()
      .single()

    if (alertError) {
      errors++
      continue
    }

    created++

    // Enviar notificação
    const notifSent = await sendNotification({
      tenantId: doc.tenant_id,
      title: alertType === 'vencido'
        ? `Documento vencido: ${doc.name}`
        : `Documento vencendo em ${diffDays} dia${diffDays !== 1 ? 's' : ''}: ${doc.name}`,
      body: alertType === 'vencido'
        ? `O documento "${doc.name}" está vencido. Renove o mais rápido possível.`
        : `O documento "${doc.name}" vence em ${diffDays} dia${diffDays !== 1 ? 's' : ''}. Providencie a renovação.`,
      type: 'document_alert',
      metadata: { documentId: doc.id, alertType, daysUntilExpiry: diffDays },
    })

    if (notifSent) {
      // Marcar alerta como enviado
      await supabase
        .from('document_alerts')
        .update({ sent: true, sent_at: new Date().toISOString(), channel: 'in_app' })
        .eq('id', (alert as any).id)
      sent++
    }
  }

  // 2. Enviar alertas pendentes não enviados de dias anteriores
  const { data: pendingAlerts } = await supabase
    .from('document_alerts')
    .select('*, documents(name, tenant_id, expires_at)')
    .eq('sent', false)
    .lte('alert_date', today)

  if (pendingAlerts) {
    for (const alert of pendingAlerts as any[]) {
      const notifSent = await sendNotification({
        tenantId: alert.documents?.tenant_id,
        title: `Alerta de documento: ${alert.documents?.name}`,
        body: `Alerta pendente para o documento "${alert.documents?.name}".`,
        type: 'document_alert',
        metadata: { documentId: alert.document_id, alertType: alert.alert_type },
      })

      if (notifSent) {
        await supabase
          .from('document_alerts')
          .update({ sent: true, sent_at: new Date().toISOString(), channel: 'in_app' })
          .eq('id', alert.id)
        sent++
      }
    }
  }

  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    level: 'info',
    event: 'document_alerts_cron_completed',
    created,
    sent,
    errors,
  }))

  return { created, sent, errors }
}
