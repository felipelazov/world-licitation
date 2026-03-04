'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, Gavel, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  agendado: { label: 'Agendado', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  em_andamento: { label: 'Em Andamento', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  encerrado: { label: 'Encerrado', color: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400' },
  cancelado: { label: 'Cancelado', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
}

const RESULT_LABELS: Record<string, { label: string; color: string }> = {
  adjudicado: { label: 'Adjudicado', color: 'text-green-700 dark:text-green-400' },
  classificado: { label: 'Classificado', color: 'text-blue-700 dark:text-blue-400' },
  nao_classificado: { label: 'Não Class.', color: 'text-yellow-700 dark:text-yellow-400' },
  desclassificado: { label: 'Desclassificado', color: 'text-red-700 dark:text-red-400' },
  pendente: { label: 'Pendente', color: 'text-gray-500' },
}

export default function PregaoPage() {
  const [sessions, setSessions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editals, setEditals] = useState<any[]>([])
  const [showNew, setShowNew] = useState(false)
  const [selectedEdital, setSelectedEdital] = useState('')
  const supabase = createClient()

  const loadData = useCallback(async () => {
    setLoading(true)
    const [sessRes, editalsRes] = await Promise.all([
      supabase
        .from('bidding_sessions')
        .select('*, editals(title, agency, session_date, estimated_value)')
        .order('created_at', { ascending: false }),
      supabase
        .from('editals')
        .select('id, title, session_date')
        .in('status', ['go', 'proposta_enviada', 'em_pregao'])
        .order('session_date', { ascending: true }),
    ])
    setSessions(sessRes.data ?? [])
    setEditals(editalsRes.data ?? [])
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    loadData()
  }, [loadData])

  async function handleCreateSession() {
    if (!selectedEdital) return
    await supabase.from('bidding_sessions').insert({
      edital_id: selectedEdital,
      status: 'agendado',
      result: 'pendente',
    })
    setShowNew(false)
    setSelectedEdital('')
    loadData()
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Pregões</h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Gerencie suas sessões de pregão eletrônico
          </p>
        </div>
        <button
          onClick={() => setShowNew(!showNew)}
          className="flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Nova Sessão
        </button>
      </div>

      {/* Formulário de nova sessão */}
      {showNew && (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 flex items-end gap-3">
          <div className="flex-1">
            <label className="mb-1 block text-xs font-medium text-[var(--muted-foreground)]">Edital</label>
            <select
              value={selectedEdital}
              onChange={(e) => setSelectedEdital(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
            >
              <option value="">Selecionar edital...</option>
              {editals.map((e: any) => (
                <option key={e.id} value={e.id}>{e.title}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleCreateSession}
            disabled={!selectedEdital}
            className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] hover:opacity-90 disabled:opacity-50"
          >
            Criar
          </button>
        </div>
      )}

      {/* Lista */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-[var(--muted-foreground)]" />
        </div>
      ) : sessions.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[var(--border)] py-12 text-center">
          <Gavel className="mb-3 h-10 w-10 text-[var(--muted-foreground)]" />
          <h3 className="font-medium text-[var(--foreground)]">Nenhuma sessão registrada</h3>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Crie uma sessão quando tiver um pregão agendado.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {sessions.map((s: any) => {
            const statusCfg = STATUS_LABELS[s.status] ?? STATUS_LABELS.agendado
            const resultCfg = RESULT_LABELS[s.result] ?? RESULT_LABELS.pendente

            return (
              <Link
                key={s.id}
                href={`/pregao/${s.id}`}
                className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--card)] p-3 transition-colors hover:border-[var(--primary)]/30"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--muted)]">
                  <Gavel className="h-5 w-5 text-[var(--muted-foreground)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium text-[var(--foreground)]">
                      {s.editals?.title ?? 'Pregão'}
                    </p>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusCfg.color}`}>
                      {statusCfg.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
                    <span>{s.editals?.agency}</span>
                    {s.editals?.session_date && (
                      <span>{new Date(s.editals.session_date).toLocaleDateString('pt-BR')}</span>
                    )}
                    {s.result !== 'pendente' && (
                      <span className={`font-medium ${resultCfg.color}`}>{resultCfg.label}</span>
                    )}
                    {s.final_price && (
                      <span>Final: R$ {s.final_price.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
