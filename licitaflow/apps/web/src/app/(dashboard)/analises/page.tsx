'use client'

import { useState, useEffect, useCallback } from 'react'
import { ClipboardCheck, Loader2, Download } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { AnalysisList } from '@/components/analise/analysis-list'
import { AnalysisStats } from '@/components/analise/analysis-stats'

const PAGE_SIZE = 20

export default function AnalysesPage() {
  const [analyses, setAnalyses] = useState<any[]>([])
  const [stats, setStats] = useState({ total: 0, go: 0, noGo: 0, pendente: 0 })
  const [loading, setLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(0)

  // Filters
  const [decision, setDecision] = useState('')
  const [search, setSearch] = useState('')

  const supabase = createClient()

  const loadData = useCallback(async () => {
    setLoading(true)

    // Load analyses
    let query = supabase
      .from('edital_analyses')
      .select('*, editals(title, agency, estimated_value, session_date, status)', { count: 'exact' })

    if (decision) {
      query = query.eq('decision', decision)
    }

    query = query
      .order('created_at', { ascending: false })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1)

    const { data, count } = await query
    setAnalyses(data ?? [])
    setTotalCount(count ?? 0)

    // Load stats
    const { data: allDecisions } = await supabase
      .from('edital_analyses')
      .select('decision')

    if (allDecisions) {
      setStats({
        total: allDecisions.length,
        go: allDecisions.filter((a: any) => a.decision === 'go').length,
        noGo: allDecisions.filter((a: any) => a.decision === 'no_go').length,
        pendente: allDecisions.filter((a: any) => a.decision === 'pendente').length,
      })
    }

    setLoading(false)
  }, [supabase, decision, page])

  useEffect(() => {
    loadData()
  }, [loadData])

  useEffect(() => {
    setPage(0)
  }, [decision, search])

  function exportCsv() {
    const headers = ['Edital', 'Órgão', 'Decisão', 'Score', 'Data Análise']
    const rows = analyses.map((a: any) => [
      a.editals?.title ?? '',
      a.editals?.agency ?? '',
      a.decision ?? 'pendente',
      a.score_total?.toFixed(1) ?? '—',
      a.analyzed_at ? new Date(a.analyzed_at).toLocaleDateString('pt-BR') : '—',
    ])

    const csv = [headers, ...rows].map((r) => r.map((c: string) => `"${c}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `analises-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Histórico de Análises</h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            {totalCount} análise{totalCount !== 1 ? 's' : ''} realizada{totalCount !== 1 ? 's' : ''}
          </p>
        </div>
        {analyses.length > 0 && (
          <button
            onClick={exportCsv}
            className="flex items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--muted)]"
          >
            <Download className="h-4 w-4" />
            Exportar CSV
          </button>
        )}
      </div>

      {/* Stats */}
      <AnalysisStats
        total={stats.total}
        go={stats.go}
        noGo={stats.noGo}
        pendente={stats.pendente}
      />

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { value: '', label: 'Todas' },
          { value: 'go', label: 'GO' },
          { value: 'no_go', label: 'NO-GO' },
          { value: 'pendente', label: 'Pendente' },
        ].map((opt) => (
          <button
            key={opt.value}
            onClick={() => setDecision(opt.value)}
            className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
              decision === opt.value
                ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                : 'bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--accent)]'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-[var(--muted-foreground)]" />
        </div>
      ) : analyses.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[var(--border)] py-12 text-center">
          <ClipboardCheck className="mb-3 h-10 w-10 text-[var(--muted-foreground)]" />
          <h3 className="font-medium text-[var(--foreground)]">Nenhuma análise encontrada</h3>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Análises aparecerão aqui quando você avaliar editais no Radar.
          </p>
        </div>
      ) : (
        <>
          <AnalysisList analyses={analyses} />

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
    </div>
  )
}
