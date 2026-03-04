'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2, Play, Square } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { SessionPanel } from '@/components/pregao/session-panel'
import { PreSessionChecklist } from '@/components/pregao/pre-session-checklist'
import { ResultForm } from '@/components/pregao/result-form'

const DEFAULT_CHECKLIST = [
  { id: 'cert-digital', label: 'Certificado digital conectado e funcionando', autoChecked: false, isCritical: true },
  { id: 'sicaf', label: 'SICAF ativo e atualizado', autoChecked: false, isCritical: true },
  { id: 'certidoes', label: 'Certidões negativas válidas', autoChecked: false, isCritical: true },
  { id: 'proposta', label: 'Proposta enviada no portal', autoChecked: false, isCritical: true },
  { id: 'planilha', label: 'Planilha de custo conferida', autoChecked: false, isCritical: false },
  { id: 'piso', label: 'Piso de margem definido', autoChecked: false, isCritical: false },
  { id: 'internet', label: 'Internet estável testada', autoChecked: false, isCritical: false },
  { id: 'portal', label: 'Portal de compras acessível', autoChecked: false, isCritical: false },
]

export default function PregaoSessionPage() {
  const params = useParams()
  const router = useRouter()
  const supabase = createClient()
  const sessionId = params.id as string

  const [session, setSession] = useState<any>(null)
  const [bids, setBids] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showChecklist, setShowChecklist] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const loadData = useCallback(async () => {
    setLoading(true)

    const [sessionRes, bidsRes] = await Promise.all([
      supabase.from('bidding_sessions').select('*, editals(title, agency, session_date, estimated_value, status, object)').eq('id', sessionId).single(),
      supabase.from('bids').select('*').eq('session_id', sessionId).order('bid_time', { ascending: false }),
    ])

    setSession(sessionRes.data)
    setBids(bidsRes.data ?? [])
    setLoading(false)
  }, [supabase, sessionId])

  useEffect(() => {
    loadData()
  }, [loadData])

  async function handleRegisterBid(value: number, isMine: boolean, label?: string) {
    await supabase.from('bids').insert({
      session_id: sessionId,
      value,
      is_mine: isMine,
      competitor_label: label ?? null,
      bid_time: new Date().toISOString(),
    })
    loadData()
  }

  async function handleStartSession() {
    await supabase
      .from('bidding_sessions')
      .update({ status: 'em_andamento', started_at: new Date().toISOString() })
      .eq('id', sessionId)

    // Atualizar edital pra em_pregao
    if (session?.edital_id) {
      await supabase.from('editals').update({ status: 'em_pregao' }).eq('id', session.edital_id)
    }

    setShowChecklist(false)
    loadData()
  }

  async function handleEndSession() {
    await supabase
      .from('bidding_sessions')
      .update({ status: 'encerrado', ended_at: new Date().toISOString() })
      .eq('id', sessionId)
    setShowResult(true)
    loadData()
  }

  async function handleResult(data: {
    result: string
    finalPrice: number | null
    finalMarginPct: number | null
    classificationPosition: number | null
    observations: string
  }) {
    await supabase
      .from('bidding_sessions')
      .update({
        result: data.result,
        final_price: data.finalPrice,
        final_margin_pct: data.finalMarginPct,
        classification_position: data.classificationPosition,
        observations: data.observations,
        updated_at: new Date().toISOString(),
      })
      .eq('id', sessionId)

    // Atualizar status do edital
    if (session?.edital_id) {
      const editalStatus = data.result === 'adjudicado' ? 'adjudicado' : 'nao_adjudicado'
      await supabase.from('editals').update({ status: editalStatus }).eq('id', session.edital_id)
    }

    router.push('/pregao')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-[var(--muted-foreground)]" />
      </div>
    )
  }

  if (!session) {
    return (
      <div className="space-y-4">
        <Link href="/pregao" className="flex items-center gap-2 text-sm text-[var(--primary)]">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Link>
        <p className="text-sm text-[var(--muted-foreground)]">Sessão não encontrada.</p>
      </div>
    )
  }

  // Custo com imposto (estimativa se não tiver planilha vinculada)
  const costWithTax = session.floor_price ? session.floor_price * 0.85 : (session.editals?.estimated_value ?? 100) * 0.7
  const floorMarginPct = 5

  return (
    <div className="space-y-4">
      {/* Breadcrumb + ações */}
      <div className="flex items-center justify-between">
        <Link href="/pregao" className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>
        <div className="flex gap-2">
          {session.status === 'agendado' && (
            <button
              onClick={() => setShowChecklist(true)}
              className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              <Play className="h-4 w-4" />
              Iniciar Sessão
            </button>
          )}
          {session.status === 'em_andamento' && (
            <button
              onClick={handleEndSession}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              <Square className="h-4 w-4" />
              Encerrar Sessão
            </button>
          )}
        </div>
      </div>

      {/* Painel principal */}
      <SessionPanel
        session={session}
        edital={session.editals ?? {}}
        costWithTax={costWithTax}
        floorMarginPct={floorMarginPct}
        bids={bids}
        onRegisterBid={handleRegisterBid}
      />

      {/* Resultado */}
      {(session.status === 'encerrado' || showResult) && session.result === 'pendente' && (
        <ResultForm onSubmit={handleResult} />
      )}

      {/* Checklist modal */}
      {showChecklist && (
        <PreSessionChecklist
          items={DEFAULT_CHECKLIST}
          onClose={() => setShowChecklist(false)}
          onStart={handleStartSession}
        />
      )}
    </div>
  )
}
