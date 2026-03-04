'use client'

import { useState, useEffect, useCallback } from 'react'
import { Bell, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const NOTIFICATION_TYPES = [
  { type: 'edital_novo', label: 'Edital novo identificado', description: 'Quando um novo edital compatível é encontrado' },
  { type: 'certidao_vencendo', label: 'Certidão vencendo', description: 'Alerta de documentos próximos do vencimento' },
  { type: 'pregao_amanha', label: 'Pregão amanhã', description: 'Lembrete no dia anterior ao pregão' },
  { type: 'pregao_hoje', label: 'Pregão hoje', description: 'Alerta no dia da sessão' },
  { type: 'contrato_vencendo', label: 'Contrato vencendo', description: 'Aviso de contratos próximos do fim' },
  { type: 'document_alert', label: 'Alerta de documento', description: 'Documentos vencidos ou vencendo' },
]

interface Pref {
  notification_type: string
  push_enabled: boolean
  email_enabled: boolean
  in_app_enabled: boolean
}

export default function NotificationPrefsPage() {
  const [prefs, setPrefs] = useState<Map<string, Pref>>(new Map())
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const supabase = createClient()

  const loadPrefs = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('notification_preferences')
      .select('*')

    const map = new Map<string, Pref>()

    // Defaults
    for (const t of NOTIFICATION_TYPES) {
      map.set(t.type, {
        notification_type: t.type,
        push_enabled: true,
        email_enabled: true,
        in_app_enabled: true,
      })
    }

    // Override with DB values
    if (data) {
      for (const p of data as any[]) {
        map.set(p.notification_type, {
          notification_type: p.notification_type,
          push_enabled: p.push_enabled,
          email_enabled: p.email_enabled,
          in_app_enabled: p.in_app_enabled,
        })
      }
    }

    setPrefs(map)
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    loadPrefs()
  }, [loadPrefs])

  async function togglePref(type: string, channel: 'push_enabled' | 'email_enabled' | 'in_app_enabled') {
    const current = prefs.get(type)
    if (!current) return

    const updated = { ...current, [channel]: !current[channel] }
    setPrefs((prev) => new Map(prev).set(type, updated))

    setSaving(type)
    await supabase
      .from('notification_preferences')
      .upsert({
        notification_type: type,
        push_enabled: updated.push_enabled,
        email_enabled: updated.email_enabled,
        in_app_enabled: updated.in_app_enabled,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'tenant_id,user_id,notification_type' })
    setSaving(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-[var(--muted-foreground)]" />
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Preferências de Notificação</h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Configure quais notificações você deseja receber por cada canal
        </p>
      </div>

      {/* Header */}
      <div className="grid grid-cols-[1fr_80px_80px_80px] gap-2 text-xs font-medium text-[var(--muted-foreground)] px-4">
        <span>Tipo</span>
        <span className="text-center">In-App</span>
        <span className="text-center">Push</span>
        <span className="text-center">Email</span>
      </div>

      {/* Rows */}
      <div className="space-y-1">
        {NOTIFICATION_TYPES.map((nt) => {
          const pref = prefs.get(nt.type)
          if (!pref) return null

          return (
            <div
              key={nt.type}
              className="grid grid-cols-[1fr_80px_80px_80px] items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-[var(--foreground)]">{nt.label}</p>
                <p className="text-xs text-[var(--muted-foreground)]">{nt.description}</p>
              </div>
              {(['in_app_enabled', 'push_enabled', 'email_enabled'] as const).map((channel) => (
                <div key={channel} className="flex justify-center">
                  <button
                    onClick={() => togglePref(nt.type, channel)}
                    className={`relative h-6 w-10 rounded-full transition-colors ${
                      pref[channel] ? 'bg-[var(--primary)]' : 'bg-[var(--muted)]'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                        pref[channel] ? 'left-[18px]' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
