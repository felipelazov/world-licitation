'use client'

import Link from 'next/link'
import { Building2, Calendar, DollarSign } from 'lucide-react'

interface AnalysisListItem {
  id: string
  edital_id: string
  decision: string | null
  score_total: number | null
  analyzed_at: string
  editals: {
    title: string
    agency: string
    estimated_value: number | null
    session_date: string | null
    status: string
  }
}

interface AnalysisListProps {
  analyses: AnalysisListItem[]
}

const DECISION_BADGE: Record<string, { label: string; color: string; bg: string }> = {
  go: { label: 'GO', color: 'text-green-700 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30' },
  no_go: { label: 'NO-GO', color: 'text-red-700 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30' },
  pendente: { label: 'Pendente', color: 'text-yellow-700 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
}

function formatCurrency(value: number | null): string {
  if (!value) return '—'
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—'
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(dateStr))
}

export function AnalysisList({ analyses }: AnalysisListProps) {
  return (
    <div className="space-y-3">
      {analyses.map((analysis) => {
        const badge = DECISION_BADGE[analysis.decision ?? 'pendente'] ?? DECISION_BADGE.pendente

        return (
          <Link
            key={analysis.id}
            href={`/analises/${analysis.edital_id}`}
            className="block rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 transition-colors hover:border-[var(--primary)]/30"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${badge.bg} ${badge.color}`}>
                    {badge.label}
                  </span>
                  {analysis.score_total !== null && (
                    <span className="text-xs text-[var(--muted-foreground)]">
                      Score: {analysis.score_total.toFixed(1)}/5.0
                    </span>
                  )}
                </div>
                <h3 className="mt-1.5 text-sm font-semibold text-[var(--foreground)]">
                  {analysis.editals.title}
                </h3>
              </div>
              <span className="text-xs text-[var(--muted-foreground)]">
                {formatDate(analysis.analyzed_at)}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--muted-foreground)]">
              <span className="flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5" />
                {analysis.editals.agency}
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="h-3.5 w-3.5" />
                {formatCurrency(analysis.editals.estimated_value)}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                Sessão: {formatDate(analysis.editals.session_date)}
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
