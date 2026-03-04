'use client'

import { useState, useEffect, useCallback } from 'react'
import { Bell, CheckCheck, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const TYPE_ICONS: Record<string, string> = {
  edital_novo: '📋',
  certidao_vencendo: '⚠️',
  pregao_amanha: '🔔',
  pregao_hoje: '🚨',
  document_alert: '📄',
  contrato_vencendo: '📝',
  system: '⚙️',
}

const PAGE_SIZE = 30

export default function NotificacoesPage() {
  const [notifications, setNotifications] = useState<any[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'todas' | 'nao_lidas'>('todas')
  const [page, setPage] = useState(0)
  const supabase = createClient()

  const loadData = useCallback(async () => {
    setLoading(true)

    let query = supabase
      .from('notifications')
      .select('*', { count: 'exact' })

    if (filter === 'nao_lidas') query = query.eq('read', false)

    query = query
      .order('created_at', { ascending: false })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1)

    const { data, count } = await query
    setNotifications(data ?? [])
    setTotalCount(count ?? 0)
    setLoading(false)
  }, [supabase, filter, page])

  useEffect(() => {
    loadData()
  }, [loadData])

  async function handleMarkAllRead() {
    await supabase
      .from('notifications')
      .update({ read: true, read_at: new Date().toISOString() })
      .eq('read', false)
    loadData()
  }

  async function handleMarkRead(id: string) {
    await supabase
      .from('notifications')
      .update({ read: true, read_at: new Date().toISOString() })
      .eq('id', id)
    loadData()
  }

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Notificações</h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">{totalCount} notificação(ões)</p>
        </div>
        <button
          onClick={handleMarkAllRead}
          className="flex items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--muted)]"
        >
          <CheckCheck className="h-4 w-4" />
          Marcar todas como lidas
        </button>
      </div>

      {/* Filtros */}
      <div className="flex gap-2">
        {(['todas', 'nao_lidas'] as const).map((f) => (
          <button
            key={f}
            onClick={() => { setFilter(f); setPage(0) }}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              filter === f
                ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                : 'bg-[var(--muted)] text-[var(--muted-foreground)]'
            }`}
          >
            {f === 'todas' ? 'Todas' : 'Não lidas'}
          </button>
        ))}
      </div>

      {/* Lista */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-[var(--muted-foreground)]" />
        </div>
      ) : notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[var(--border)] py-12 text-center">
          <Bell className="mb-3 h-10 w-10 text-[var(--muted-foreground)]" />
          <h3 className="font-medium text-[var(--foreground)]">Nenhuma notificação</h3>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Notificações de editais, documentos e pregões aparecerão aqui.
          </p>
        </div>
      ) : (
        <div className="space-y-1">
          {notifications.map((n: any) => (
            <div
              key={n.id}
              className={`flex items-start gap-3 rounded-lg border border-[var(--border)] p-3 ${
                !n.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : 'bg-[var(--card)]'
              }`}
            >
              <span className="text-xl shrink-0 mt-0.5">{TYPE_ICONS[n.type] ?? '📌'}</span>
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${!n.read ? 'font-semibold' : ''} text-[var(--foreground)]`}>{n.title}</p>
                <p className="text-xs text-[var(--muted-foreground)]">{n.body}</p>
                <p className="mt-1 text-[10px] text-[var(--muted-foreground)]">
                  {new Date(n.created_at).toLocaleString('pt-BR')}
                </p>
              </div>
              {!n.read && (
                <button
                  onClick={() => handleMarkRead(n.id)}
                  className="shrink-0 rounded p-1 text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
                  title="Marcar como lida"
                >
                  <CheckCheck className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-sm text-[var(--muted-foreground)]">{page + 1} / {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  )
}
