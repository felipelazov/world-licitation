'use client'

import Link from 'next/link'
import { Building2, Calendar, DollarSign, ExternalLink } from 'lucide-react'
import { StatusBadge } from './status-badge'
import { Countdown } from '@licitaflow/ui'

interface EditalCardProps {
  edital: {
    id: string
    title: string
    object: string
    agency: string
    estimated_value: number | null
    session_date: string | null
    publication_date: string
    status: string
    portal_url: string
    modalidade: string
    edital_sources?: { name: string; slug: string } | null
  }
  onStatusChange?: (id: string, status: string) => void
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

export function EditalCard({ edital, onStatusChange }: EditalCardProps) {
  return (
    <div className="group rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 transition-colors hover:border-[var(--primary)]/30">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <StatusBadge status={edital.status} />
            {edital.edital_sources && (
              <span className="text-xs text-[var(--muted-foreground)]">
                {edital.edital_sources.name}
              </span>
            )}
          </div>

          <Link
            href={`/radar/${edital.id}`}
            className="mt-1.5 block text-sm font-semibold text-[var(--foreground)] hover:text-[var(--primary)]"
          >
            {edital.title}
          </Link>

          <p className="mt-1 line-clamp-2 text-sm text-[var(--muted-foreground)]">
            {edital.object}
          </p>
        </div>

        <a
          href={edital.portal_url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded p-1.5 text-[var(--muted-foreground)] opacity-0 transition-opacity hover:bg-[var(--muted)] hover:text-[var(--foreground)] group-hover:opacity-100"
          title="Abrir no portal"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--muted-foreground)]">
        <span className="flex items-center gap-1">
          <Building2 className="h-3.5 w-3.5" />
          {edital.agency}
        </span>
        <span className="flex items-center gap-1">
          <DollarSign className="h-3.5 w-3.5" />
          {formatCurrency(edital.estimated_value)}
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          Sessão: {formatDatetime(edital.session_date)}
        </span>
        <span>Publicado: {formatDate(edital.publication_date)}</span>
        <Countdown date={edital.session_date} size="sm" showExpired={false} />
      </div>

      {/* Quick actions */}
      {edital.status === 'novo' && onStatusChange && (
        <div className="mt-3 flex gap-2 border-t border-[var(--border)] pt-3">
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
