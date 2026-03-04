'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Bell, Check, ExternalLink } from 'lucide-react'
import { useRouter } from 'next/navigation'
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

export function NotificationBell() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState<any[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  const loadNotifications = useCallback(async () => {
    const { count } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('read', false)

    setUnreadCount(count ?? 0)

    if (open) {
      const { data } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)
      setNotifications(data ?? [])
    }
  }, [supabase, open])

  useEffect(() => {
    loadNotifications()
    const interval = setInterval(loadNotifications, 30000) // Poll a cada 30s
    return () => clearInterval(interval)
  }, [loadNotifications])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  async function markAsRead(id: string) {
    await supabase.from('notifications').update({ read: true, read_at: new Date().toISOString() }).eq('id', id)
    loadNotifications()
  }

  async function markAllAsRead() {
    await supabase.from('notifications').update({ read: true, read_at: new Date().toISOString() }).eq('read', false)
    loadNotifications()
  }

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative rounded-lg p-2 text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 rounded-lg border border-[var(--border)] bg-[var(--card)] shadow-xl z-50">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-3 py-2">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">Notificações</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button onClick={markAllAsRead} className="text-xs text-[var(--primary)] hover:underline">
                  Marcar todas como lidas
                </button>
              )}
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="py-8 text-center text-sm text-[var(--muted-foreground)]">
                Nenhuma notificação
              </p>
            ) : (
              notifications.map((n: any) => (
                <button
                  key={n.id}
                  onClick={() => {
                    if (!n.read) markAsRead(n.id)
                    setOpen(false)
                  }}
                  className={`w-full px-3 py-2.5 text-left hover:bg-[var(--muted)] transition-colors ${
                    !n.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                  }`}
                >
                  <div className="flex gap-2">
                    <span className="text-base shrink-0">{TYPE_ICONS[n.type] ?? '📌'}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${!n.read ? 'font-semibold text-[var(--foreground)]' : 'text-[var(--foreground)]'}`}>
                        {n.title}
                      </p>
                      <p className="text-xs text-[var(--muted-foreground)] line-clamp-2">{n.body}</p>
                      <p className="mt-0.5 text-[10px] text-[var(--muted-foreground)]">
                        {new Date(n.created_at).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {!n.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />}
                  </div>
                </button>
              ))
            )}
          </div>

          <div className="border-t border-[var(--border)] px-3 py-2">
            <button
              onClick={() => { setOpen(false); router.push('/notificacoes') }}
              className="flex w-full items-center justify-center gap-1 text-xs text-[var(--primary)] hover:underline"
            >
              Ver todas <ExternalLink className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
