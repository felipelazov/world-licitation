'use client'

import { Building2, Calendar, DollarSign, ExternalLink, MapPin, Star } from 'lucide-react'
import { StatusBadge } from './status-badge'
import { Countdown } from '@licitaflow/ui'

interface EditalCardProps {
  edital: {
    id: string
    numero?: string | null
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
    edital_sources?: { name: string } | null
  }
  onStatusChange?: (id: string, status: string) => void
  onClick?: () => void
}

function formatCurrency(value: number | null): string {
  if (!value) return '—'
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—'
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(dateStr))
}

function formatDatetime(dateStr: string | null): string {
  if (!dateStr) return '—'
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  }).format(new Date(dateStr))
}

export function EditalCard({ edital, onStatusChange, onClick }: EditalCardProps) {
  return (
    <div
      className="group cursor-pointer rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 transition-colors hover:border-[var(--primary)]/30"
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <StatusBadge status={edital.status} />
            {edital.edital_sources && (
              <span className="text-xs text-[var(--muted-foreground)]">
                {edital.edital_sources.name}
              </span>
            )}
            {edital.relevance_score != null && edital.relevance_score > 0 && (
              <span className={`flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-medium ${
                edital.relevance_score >= 70
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : edital.relevance_score >= 40
                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
              }`}>
                <Star className="h-3 w-3" />
                {edital.relevance_score}
              </span>
            )}
          </div>

          <span className="mt-1.5 block text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)]">
            {edital.numero || edital.modalidade || 'Edital'}
          </span>

          <p className="mt-1 line-clamp-2 text-sm text-[var(--muted-foreground)]">
            {edital.objeto}
          </p>
        </div>

        <a
          href={edital.link_sistema_origem || edital.portal_url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="shrink-0 rounded p-1.5 text-[var(--muted-foreground)] opacity-0 transition-opacity hover:bg-[var(--muted)] hover:text-[var(--foreground)] group-hover:opacity-100"
          title="Abrir no portal"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--muted-foreground)]">
        <span className="flex items-center gap-1">
          <Building2 className="h-3.5 w-3.5" />
          {edital.orgao}
        </span>
        <span className="flex items-center gap-1">
          <DollarSign className="h-3.5 w-3.5" />
          {formatCurrency(edital.valor_estimado)}
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          Sessão: {formatDatetime(edital.data_sessao)}
        </span>
        {edital.uf && (
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {edital.uf}
          </span>
        )}
        <span>Publicado: {formatDate(edital.data_publicacao)}</span>
        <Countdown date={edital.data_sessao} size="sm" showExpired={false} />
      </div>

      {/* Quick actions */}
      {edital.status === 'novo' && onStatusChange && (
        <div className="mt-3 flex gap-2 border-t border-[var(--border)] pt-3" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onStatusChange(edital.id, 'analisando')}
            className="rounded-lg bg-[var(--primary)] px-3 py-1 text-xs font-medium text-[var(--primary-foreground)] hover:opacity-90"
          >
            Analisar
          </button>
          <button
            onClick={() => onStatusChange(edital.id, 'descartado')}
            className="rounded-lg border border-[var(--border)] px-3 py-1 text-xs text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
          >
            Descartar
          </button>
        </div>
      )}
    </div>
  )
}
