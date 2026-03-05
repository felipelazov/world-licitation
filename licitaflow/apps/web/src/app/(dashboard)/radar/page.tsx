'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Radar, Settings2, RefreshCw, CheckSquare, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { EditalCard } from '@/components/radar/edital-card'
import { EditalCardSkeleton } from '@/components/radar/edital-card-skeleton'
import { EditalModal } from '@/components/radar/edital-modal'
import { FeedFilters } from '@/components/radar/feed-filters'
import { NotificationPrompt } from '@/components/notifications/notification-prompt'
import { showEditalNotification } from '@/lib/hooks/use-notifications'

interface EditalRow {
  id: string
  numero: string | null
  objeto: string
  orgao: string
  valor_estimado: number | null
  data_sessao: string | null
  data_publicacao: string | null
  status: string
  portal_url: string | null
  link_sistema_origem: string | null
  modalidade: string | null
  uf?: string | null
  relevance_score?: number | null
  edital_sources: { name: string } | null
}

const PAGE_SIZE = 20

export default function RadarPage() {
  const [editals, setEditals] = useState<EditalRow[]>([])
  const [loading, setLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(0)
  const [syncing, setSyncing] = useState(false)
  const [syncResult, setSyncResult] = useState<{ saved: number; found: number } | null>(null)
  const [selectedEditalId, setSelectedEditalId] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [statusCounts, setStatusCounts] = useState<Record<string, number>>({})

  // Filters
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [orderBy, setOrderBy] = useState('relevance_score:desc')

  const supabase = createClient()

  // Load status counts once
  const loadStatusCounts = useCallback(async () => {
    const { data } = await supabase
      .from('editals')
      .select('status')

    if (data) {
      const counts: Record<string, number> = { all: data.length }
      for (const row of data) {
        counts[row.status] = (counts[row.status] || 0) + 1
      }
      setStatusCounts(counts)
    }
  }, [supabase])

  const loadEditals = useCallback(async () => {
    setLoading(true)

    const [orderField, orderDir] = orderBy.split(':')

    let query = supabase
      .from('editals')
      .select('*, edital_sources(name)', { count: 'exact' })

    if (status) {
      query = query.eq('status', status)
    }

    if (search) {
      query = query.or(`objeto.fts(portuguese).${search},orgao.ilike.%${search}%`)
    }

    query = query
      .order(orderField, { ascending: orderDir === 'asc' })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1)

    const { data, error, count } = await query

    if (!error) {
      setEditals(data as unknown as EditalRow[])
      setTotalCount(count ?? 0)
    }
    setLoading(false)
  }, [supabase, status, search, orderBy, page])

  useEffect(() => {
    loadEditals()
    loadStatusCounts()
  }, [loadEditals, loadStatusCounts])

  // Reset page when filters change
  useEffect(() => {
    setPage(0)
    setSelectedIds(new Set())
  }, [search, status, orderBy])

  // Realtime subscription with browser notifications
  useEffect(() => {
    const channel = supabase
      .channel('editals-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'editals' },
        (payload) => {
          loadEditals()
          loadStatusCounts()
          // Browser notification
          const obj = (payload.new as { objeto?: string; orgao?: string })
          showEditalNotification(
            'Novo edital encontrado!',
            obj?.objeto?.slice(0, 100) || 'Novo edital disponivel no radar.',
          )
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, loadEditals, loadStatusCounts])

  async function handleStatusChange(id: string, newStatus: string) {
    const { error } = await supabase
      .from('editals')
      .update({ status: newStatus })
      .eq('id', id)

    if (!error) {
      setEditals((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
      )
      loadStatusCounts()
    }
  }

  async function handleBulkAction(newStatus: string) {
    if (selectedIds.size === 0) return
    const ids = Array.from(selectedIds)

    const { error } = await supabase
      .from('editals')
      .update({ status: newStatus })
      .in('id', ids)

    if (!error) {
      setEditals((prev) =>
        prev.map((e) => (selectedIds.has(e.id) ? { ...e, status: newStatus } : e))
      )
      setSelectedIds(new Set())
      loadStatusCounts()
    }
  }

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleSelectAll() {
    if (selectedIds.size === editals.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(editals.map((e) => e.id)))
    }
  }

  async function handleSync() {
    setSyncing(true)
    setSyncResult(null)
    try {
      const res = await fetch('/api/editais/sync')
      const data = await res.json()
      if (data.success) {
        setSyncResult({ saved: data.saved, found: data.found })
        loadEditals()
        loadStatusCounts()
      }
    } catch {
      // silently fail
    } finally {
      setSyncing(false)
    }
  }

  const newTodayCount = editals.filter((e) => {
    const today = new Date().toISOString().split('T')[0]
    return e.status === 'novo' && e.data_publicacao?.startsWith(today)
  }).length

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Radar de Editais</h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            {totalCount} edital{totalCount !== 1 ? 'is' : ''} encontrado{totalCount !== 1 ? 's' : ''}
            {newTodayCount > 0 && (
              <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                {newTodayCount} novo{newTodayCount > 1 ? 's' : ''} hoje
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-2 rounded-lg bg-[var(--primary)] px-3 py-2 text-sm font-medium text-[var(--primary-foreground)] hover:opacity-90 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Sincronizando...' : 'Sincronizar'}
          </button>
          <Link
            href="/radar/filtros"
            className="flex items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--muted)]"
          >
            <Settings2 className="h-4 w-4" />
            Filtros
          </Link>
        </div>
      </div>

      {/* Notification permission prompt */}
      <NotificationPrompt />

      {/* Sync result */}
      {syncResult && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400">
          Sync concluido: {syncResult.saved} edital(is) salvo(s) de {syncResult.found} encontrado(s).
        </div>
      )}

      {/* Filters */}
      <FeedFilters
        search={search}
        status={status}
        orderBy={orderBy}
        statusCounts={statusCounts}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onOrderChange={setOrderBy}
      />

      {/* Bulk actions bar */}
      {selectedIds.size > 0 && (
        <div className="flex items-center gap-3 rounded-lg border border-[var(--primary)]/30 bg-[var(--primary)]/5 px-4 py-2">
          <span className="text-sm font-medium text-[var(--foreground)]">
            {selectedIds.size} selecionado{selectedIds.size > 1 ? 's' : ''}
          </span>
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => handleBulkAction('analisando')}
              className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700"
            >
              <CheckSquare className="h-3 w-3" />
              Analisar
            </button>
            <button
              onClick={() => handleBulkAction('go')}
              className="rounded-lg bg-green-600 px-3 py-1 text-xs font-medium text-white hover:bg-green-700"
            >
              GO
            </button>
            <button
              onClick={() => handleBulkAction('descartado')}
              className="flex items-center gap-1 rounded-lg border border-red-300 px-3 py-1 text-xs text-red-500 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20"
            >
              <Trash2 className="h-3 w-3" />
              Descartar
            </button>
            <button
              onClick={() => setSelectedIds(new Set())}
              className="rounded-lg border border-[var(--border)] px-3 py-1 text-xs text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
            >
              Limpar
            </button>
          </div>
        </div>
      )}

      {/* Feed */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <EditalCardSkeleton key={i} />
          ))}
        </div>
      ) : editals.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[var(--border)] py-12 text-center">
          <Radar className="mb-3 h-10 w-10 text-[var(--muted-foreground)]" />
          <h3 className="font-medium text-[var(--foreground)]">Nenhum edital encontrado</h3>
          <p className="mt-1 max-w-sm text-sm text-[var(--muted-foreground)]">
            {search || status
              ? 'Tente ajustar seus filtros de busca.'
              : 'Configure seus filtros de monitoramento para receber editais automaticamente.'}
          </p>
          {!search && !status && (
            <Link
              href="/radar/filtros"
              className="mt-4 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] hover:opacity-90"
            >
              Configurar Filtros
            </Link>
          )}
        </div>
      ) : (
        <>
          {/* Select all */}
          <div className="flex items-center gap-2 px-1">
            <input
              type="checkbox"
              checked={selectedIds.size === editals.length && editals.length > 0}
              onChange={toggleSelectAll}
              className="h-4 w-4 rounded border-[var(--border)] accent-[var(--primary)]"
            />
            <span className="text-xs text-[var(--muted-foreground)]">Selecionar todos</span>
          </div>

          <div className="space-y-3">
            {editals.map((edital) => (
              <div key={edital.id} className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={selectedIds.has(edital.id)}
                  onChange={() => toggleSelect(edital.id)}
                  className="mt-4 h-4 w-4 shrink-0 rounded border-[var(--border)] accent-[var(--primary)]"
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="flex-1 min-w-0">
                  <EditalCard
                    edital={edital}
                    onStatusChange={handleStatusChange}
                    onClick={() => setSelectedEditalId(edital.id)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm disabled:opacity-50"
              >
                Anterior
              </button>
              <span className="text-sm text-[var(--muted-foreground)]">
                {page + 1} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm disabled:opacity-50"
              >
                Proxima
              </button>
            </div>
          )}
        </>
      )}

      {/* Modal de analise */}
      {selectedEditalId && (
        <EditalModal
          editalId={selectedEditalId}
          onClose={() => setSelectedEditalId(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  )
}
