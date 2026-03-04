'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { AnalysisForm } from '@/components/analise/analysis-form'
import type { AnalysisCriteria, AnalysisRow } from '@licitaflow/db'
import { buildEmptyCriteria } from '@licitaflow/db'
import { calculateScore } from '@licitaflow/shared'

interface EditalSummary {
  id: string
  title: string
  agency: string
  status: string
  session_date: string | null
}

export default function AnalysisPage() {
  const params = useParams()
  const router = useRouter()
  const editalId = params.editalId as string

  const [edital, setEdital] = useState<EditalSummary | null>(null)
  const [existingAnalysis, setExistingAnalysis] = useState<AnalysisRow | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const supabase = createClient()

  const loadData = useCallback(async () => {
    setLoading(true)

    // Load edital info
    const { data: editalData } = await supabase
      .from('editals')
      .select('id, title, agency, status, session_date')
      .eq('id', editalId)
      .single()

    if (editalData) {
      setEdital(editalData as unknown as EditalSummary)
    }

    // Load existing analysis
    const { data: analysisData } = await supabase
      .from('edital_analyses')
      .select('*')
      .eq('edital_id', editalId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (analysisData) {
      setExistingAnalysis(analysisData as unknown as AnalysisRow)
    }

    setLoading(false)
  }, [supabase, editalId])

  useEffect(() => {
    loadData()
  }, [loadData])

  async function handleSubmit(data: { criteria: AnalysisCriteria; justificativa: string }) {
    setSaving(true)

    const result = calculateScore({
      eliminatory: data.criteria.eliminatory.map((c) => ({ id: c.id, answer: c.answer })),
      scoring: data.criteria.scoring.map((c) => ({ id: c.id, score: c.score })),
    })

    // Map go_ressalvas → go for DB (DB only has go/no_go/pendente)
    const dbDecision = result.decision === 'go_ressalvas' ? 'go' : result.decision

    if (existingAnalysis) {
      // Update existing
      const { error } = await supabase
        .from('edital_analyses')
        .update({
          criteria: data.criteria,
          decision: dbDecision,
          score_total: result.score,
          justificativa: data.justificativa || result.justificativa,
          analyzed_at: new Date().toISOString(),
        })
        .eq('id', existingAnalysis.id)

      if (!error) {
        // Update edital status
        const newStatus = dbDecision === 'go' ? 'go' : dbDecision === 'no_go' ? 'no_go' : undefined
        if (newStatus) {
          await supabase.from('editals').update({ status: newStatus }).eq('id', editalId)
        }
        router.push(`/radar/${editalId}`)
      }
    } else {
      // Create new
      const { error } = await supabase
        .from('edital_analyses')
        .insert({
          edital_id: editalId,
          criteria: data.criteria,
          decision: dbDecision,
          score_total: result.score,
          justificativa: data.justificativa || result.justificativa,
        })

      if (!error) {
        // Update edital status
        const newStatus = dbDecision === 'go' ? 'go' : dbDecision === 'no_go' ? 'no_go' : 'analisando'
        await supabase.from('editals').update({ status: newStatus }).eq('id', editalId)
        router.push(`/radar/${editalId}`)
      }
    }

    setSaving(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-[var(--muted-foreground)]" />
      </div>
    )
  }

  if (!edital) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">Edital não encontrado</h2>
        <Link
          href="/radar"
          className="mt-4 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] hover:opacity-90"
        >
          Voltar ao Radar
        </Link>
      </div>
    )
  }

  const initialCriteria = existingAnalysis?.criteria ?? buildEmptyCriteria()

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </button>
        <span className="text-sm text-[var(--muted-foreground)]">/</span>
        <Link href="/radar" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
          Radar
        </Link>
        <span className="text-sm text-[var(--muted-foreground)]">/</span>
        <Link href={`/radar/${editalId}`} className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
          {edital.title}
        </Link>
        <span className="text-sm text-[var(--muted-foreground)]">/</span>
        <span className="text-sm text-[var(--foreground)]">Análise GO/NO-GO</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-[var(--foreground)]">
          {existingAnalysis ? 'Editar Análise GO/NO-GO' : 'Nova Análise GO/NO-GO'}
        </h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          {edital.title} — {edital.agency}
        </p>
      </div>

      {/* Form */}
      <AnalysisForm
        initialCriteria={initialCriteria as AnalysisCriteria}
        initialJustificativa={existingAnalysis?.justificativa ?? ''}
        onSubmit={handleSubmit}
        isLoading={saving}
      />
    </div>
  )
}
