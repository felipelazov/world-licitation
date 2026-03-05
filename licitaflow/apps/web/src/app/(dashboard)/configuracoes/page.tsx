'use client'

import { useState, useEffect, useCallback } from 'react'
import { User, Bell, Loader2, Save, Radar } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function ConfiguracoesPage() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [fullName, setFullName] = useState('')
  const [saved, setSaved] = useState(false)
  const supabase = createClient()

  const loadProfile = useCallback(async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      if (data) {
        setProfile(data)
        setFullName((data as any).full_name ?? '')
      }
    }
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    loadProfile()
  }, [loadProfile])

  async function handleSave() {
    if (!profile) return
    setSaving(true)
    await supabase
      .from('profiles')
      .update({ full_name: fullName })
      .eq('id', (profile as any).id)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-[var(--muted-foreground)]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Configuracoes</h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Gerencie seu perfil e preferencias
        </p>
      </div>

      {/* Perfil */}
      <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-5 space-y-4">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-[var(--primary)]" />
          <h2 className="text-sm font-semibold text-[var(--foreground)]">Perfil</h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-[var(--muted-foreground)]">Nome</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[var(--muted-foreground)]">Email</label>
            <input
              type="text"
              value={(profile as any)?.email ?? ''}
              disabled
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--muted)] px-3 py-2 text-sm text-[var(--muted-foreground)]"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] hover:opacity-90 disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : saved ? (
            <>
              <Save className="h-4 w-4" />
              Salvo!
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Salvar
            </>
          )}
        </button>
      </div>

      {/* Links para outras configuracoes */}
      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href="/configuracoes/notificacoes"
          className="group flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 transition-colors hover:border-[var(--primary)]"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--muted)] group-hover:bg-[var(--primary)]/10">
            <Bell className="h-5 w-5 text-[var(--primary)]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)]">Notificacoes</h3>
            <p className="text-xs text-[var(--muted-foreground)]">Configure quais alertas receber</p>
          </div>
        </Link>
        <Link
          href="/configuracoes/monitoramento"
          className="group flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 transition-colors hover:border-[var(--primary)]"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--muted)] group-hover:bg-[var(--primary)]/10">
            <Radar className="h-5 w-5 text-[var(--primary)]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)]">Monitoramento</h3>
            <p className="text-xs text-[var(--muted-foreground)]">UFs, palavras-chave e filtros de editais</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
