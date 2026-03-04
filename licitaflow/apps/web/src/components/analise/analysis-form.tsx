'use client'

import { useState, useMemo } from 'react'
import { calculateScore } from '@licitaflow/shared'
import type { AnalysisCriteria } from '@licitaflow/db'
import { CriteriaItem } from './criteria-item'
import { ScoreDisplay } from './score-display'

interface AnalysisFormProps {
  initialCriteria: AnalysisCriteria
  initialJustificativa?: string
  onSubmit: (data: { criteria: AnalysisCriteria; justificativa: string }) => void
  isLoading?: boolean
}

export function AnalysisForm({
  initialCriteria,
  initialJustificativa = '',
  onSubmit,
  isLoading = false,
}: AnalysisFormProps) {
  const [criteria, setCriteria] = useState<AnalysisCriteria>(initialCriteria)
  const [justificativa, setJustificativa] = useState(initialJustificativa)

  // Calculate score in real-time
  const scoringResult = useMemo(() => {
    return calculateScore({
      eliminatory: criteria.eliminatory.map((c) => ({ id: c.id, answer: c.answer })),
      scoring: criteria.scoring.map((c) => ({ id: c.id, score: c.score })),
    })
  }, [criteria])

  function updateEliminatory(index: number, field: 'answer' | 'observation', value: boolean | null | string) {
    setCriteria((prev) => ({
      ...prev,
      eliminatory: prev.eliminatory.map((c, i) =>
        i === index ? { ...c, [field]: value } : c
      ),
    }))
  }

  function updateScoring(index: number, field: 'score' | 'observation', value: number | null | string) {
    setCriteria((prev) => ({
      ...prev,
      scoring: prev.scoring.map((c, i) =>
        i === index ? { ...c, [field]: value } : c
      ),
    }))
  }

  function handleSubmit() {
    onSubmit({ criteria, justificativa })
  }

  const canSubmit = !isLoading && scoringResult.decision !== 'pendente'

  return (
    <div className="space-y-6">
      {/* Score Display — real-time */}
      <ScoreDisplay result={scoringResult} />

      {/* Eliminatory criteria */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-[var(--foreground)]">
          Critérios Eliminatórios
        </h3>
        <div className="space-y-3">
          {criteria.eliminatory.map((criterion, index) => (
            <CriteriaItem
              key={criterion.id}
              type="eliminatory"
              id={criterion.id}
              label={criterion.label}
              description={criterion.description}
              answer={criterion.answer}
              observation={criterion.observation}
              onAnswerChange={(answer) => updateEliminatory(index, 'answer', answer)}
              onObservationChange={(obs) => updateEliminatory(index, 'observation', obs)}
            />
          ))}
        </div>
      </div>

      {/* Scoring criteria */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-[var(--foreground)]">
          Critérios de Scoring (1-5)
        </h3>
        <div className="space-y-3">
          {criteria.scoring.map((criterion, index) => (
            <CriteriaItem
              key={criterion.id}
              type="scoring"
              id={criterion.id}
              label={criterion.label}
              description={criterion.description}
              score={criterion.score}
              observation={criterion.observation}
              onScoreChange={(score) => updateScoring(index, 'score', score)}
              onObservationChange={(obs) => updateScoring(index, 'observation', obs)}
            />
          ))}
        </div>
      </div>

      {/* Justificativa */}
      <div>
        <label className="mb-1 block text-sm font-semibold text-[var(--foreground)]">
          Justificativa Geral
        </label>
        <textarea
          value={justificativa}
          onChange={(e) => setJustificativa(e.target.value)}
          placeholder="Adicione sua justificativa ou observações gerais sobre a análise..."
          rows={3}
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
        />
      </div>

      {/* Submit */}
      <div className="flex items-center justify-between border-t border-[var(--border)] pt-4">
        <p className="text-xs text-[var(--muted-foreground)]">
          {scoringResult.decision === 'pendente'
            ? 'Preencha todos os critérios para salvar.'
            : `Decisão: ${scoringResult.decision === 'go' ? 'GO' : scoringResult.decision === 'no_go' ? 'NO-GO' : 'GO com Ressalvas'}`}
        </p>
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="rounded-lg bg-[var(--primary)] px-6 py-2 text-sm font-medium text-[var(--primary-foreground)] hover:opacity-90 disabled:opacity-50"
        >
          {isLoading ? 'Salvando...' : 'Salvar Análise'}
        </button>
      </div>
    </div>
  )
}
