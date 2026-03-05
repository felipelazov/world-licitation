'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Radar, Settings2, Loader2, RefreshCw } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { EditalCard } from '@/components/radar/edital-card'
import { EditalModal } from '@/components/radar/edital-modal'
import { FeedFilters } from '@/components/radar/feed-filters'

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

  // Filters
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [orderBy, setOrderBy] = useState('relevance_score:desc')

  const supabase = createClient()

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
      query = query.or(`objeto.ilike.%${search}%,orgao.ilike.%${search}%`)
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
  }, [loadEditals])

  // Reset page when filters change
  useEffect(() => {
    setPage(0)
  }, [search, status, orderBy])

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('editals-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'editals' },
        () => {
          loadEditals()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, loadEditals])

  async function handleStatusChange(id: string, newStatus: string) {
    const { error } = await supabase
      .from('editals')
      .update({ status: newStatus })
      .eq('id', id)

    if (!error) {
      setEditals((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
      )
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
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onOrderChange={setOrderBy}
      />

      {/* Feed */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-[var(--muted-foreground)]" />
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
          <div className="space-y-3">
            {editals.map((edital) => (
              <EditalCard
                key={edital.id}
                edital={edital}
                onStatusChange={handleStatusChange}
                onClick={() => setSelectedEditalId(edital.id)}
              />
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
                Próxima
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
