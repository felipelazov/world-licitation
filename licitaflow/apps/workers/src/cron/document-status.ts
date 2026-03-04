// Cron: Recalcula status de todos os documentos diariamente
// Roda via scheduler — atualiza valido/vencendo/vencido baseado na data de vencimento

import { createClient } from '@supabase/supabase-js'

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  return createClient(url, key)
}

function calculateStatus(expiresAt: string | null, alertDaysBefore: number): string {
  if (!expiresAt) return 'pendente'

  const now = new Date()
  const expires = new Date(expiresAt)
  const diffMs = expires.getTime() - now.getTime()
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays <= 0) return 'vencido'
  if (diffDays <= alertDaysBefore) return 'vencendo'
  return 'valido'
}

export async function runDocumentStatusCron(): Promise<{ updated: number; errors: number }> {
  const supabase = getSupabaseAdmin()
  let updated = 0
  let errors = 0

  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    level: 'info',
    event: 'document_status_cron_started',
  }))

  // Busca todos os documentos que têm data de vencimento e não estão pendentes (sem arquivo)
  const { data: documents, error } = await supabase
    .from('documents')
    .select('id, expires_at, alert_days_before, status')
    .not('expires_at', 'is', null)

  if (error) {
    console.error(JSON.stringify({
      timestamp: new Date().toISOString(),
      level: 'error',
      event: 'document_status_cron_fetch_failed',
      error: error.message,
    }))
    return { updated: 0, errors: 1 }
  }

  if (!documents || documents.length === 0) {
    console.log(JSON.stringify({
      timestamp: new Date().toISOString(),
      level: 'info',
      event: 'document_status_cron_no_docs',
    }))
    return { updated: 0, errors: 0 }
  }

  for (const doc of documents as { id: string; expires_at: string; alert_days_before: number; status: string }[]) {
    const newStatus = calculateStatus(doc.expires_at, doc.alert_days_before)

    if (newStatus !== doc.status) {
      const { error: updateError } = await supabase
        .from('documents')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', doc.id)

      if (updateError) {
        errors++
        console.error(JSON.stringify({
          timestamp: new Date().toISOString(),
          level: 'error',
          event: 'document_status_update_failed',
          docId: doc.id,
          error: updateError.message,
        }))
      } else {
        updated++
      }
    }
  }

  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    level: 'info',
    event: 'document_status_cron_completed',
    totalChecked: documents.length,
    updated,
    errors,
  }))

  return { updated, errors }
}
