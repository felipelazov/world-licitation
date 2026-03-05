'use client'

import { Search, SlidersHorizontal } from 'lucide-react'

const STATUS_OPTIONS = [
  { value: '', label: 'Todos' },
  { value: 'novo', label: 'Novos' },
  { value: 'analisando', label: 'Analisando' },
  { value: 'go', label: 'GO' },
  { value: 'no_go', label: 'NO-GO' },
  { value: 'proposta_enviada', label: 'Proposta' },
  { value: 'em_pregao', label: 'Em Pregao' },
  { value: 'adjudicado', label: 'Adjudicado' },
  { value: 'descartado', label: 'Descartado' },
]

const ORDER_OPTIONS = [
  { value: 'relevance_score:desc', label: 'Mais relevante' },
  { value: 'created_at:desc', label: 'Mais recente' },
  { value: 'data_sessao:asc', label: 'Sessao (proxima)' },
  { value: 'valor_estimado:desc', label: 'Maior valor' },
  { value: 'valor_estimado:asc', label: 'Menor valor' },
  { value: 'data_publicacao:desc', label: 'Publicacao (recente)' },
]

interface FeedFiltersProps {
  search: string
  status: string
  orderBy: string
  statusCounts?: Record<string, number>
  onSearchChange: (value: string) => void
  onStatusChange: (value: string) => void
  onOrderChange: (value: string) => void
}

export function FeedFilters({
  search,
  status,
  orderBy,
  statusCounts,
  onSearchChange,
  onStatusChange,
  onOrderChange,
}: FeedFiltersProps) {
  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar no objeto ou orgao..."
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] py-2 pl-10 pr-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
        />
      </div>

      {/* Status + Order */}
      <div className="flex flex-wrap items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-[var(--muted-foreground)]" />

        {/* Status pills */}
        <div className="flex flex-wrap gap-1">
          {STATUS_OPTIONS.map((opt) => {
            const count = statusCounts?.[opt.value || 'all']
            return (
              <button
                key={opt.value}
                onClick={() => onStatusChange(opt.value)}
                className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                  status === opt.value
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                    : 'bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--accent)]'
                }`}
              >
                {opt.label}
                {count != null && count > 0 && (
                  <span className={`ml-1 ${status === opt.value ? 'opacity-80' : 'opacity-60'}`}>
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Order select */}
        <select
          value={orderBy}
          onChange={(e) => onOrderChange(e.target.value)}
          className="ml-auto rounded-lg border border-[var(--border)] bg-[var(--background)] px-2 py-1 text-xs text-[var(--foreground)] outline-none"
        >
          {ORDER_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
