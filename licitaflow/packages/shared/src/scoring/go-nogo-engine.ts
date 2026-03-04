// Engine de Scoring GO/NO-GO
// Calcula decisão baseada em critérios eliminatórios e scoring

export interface EliminatoryCriterionInput {
  id: string
  answer: boolean | null
}

export interface ScoringCriterionInput {
  id: string
  score: number | null // 1-5
}

export interface ScoringInput {
  eliminatory: EliminatoryCriterionInput[]
  scoring: ScoringCriterionInput[]
}

export type GoNoGoDecision = 'go' | 'no_go' | 'go_ressalvas' | 'pendente'

export interface ScoringResult {
  decision: GoNoGoDecision
  score: number | null
  scoreFormatted: string
  justificativa: string
  hasUnansweredEliminatory: boolean
  hasUnansweredScoring: boolean
  failedEliminatory: string[]
}

export function calculateScore(input: ScoringInput): ScoringResult {
  const { eliminatory, scoring } = input

  // Check for unanswered eliminatory criteria
  const unansweredElim = eliminatory.filter((c) => c.answer === null)
  const hasUnansweredEliminatory = unansweredElim.length > 0

  // Check for failed eliminatory criteria
  const failedEliminatory = eliminatory
    .filter((c) => c.answer === false)
    .map((c) => c.id)

  // If any eliminatory fails → NO-GO
  if (failedEliminatory.length > 0) {
    return {
      decision: 'no_go',
      score: null,
      scoreFormatted: '—',
      justificativa: `NO-GO: ${failedEliminatory.length} critério${failedEliminatory.length > 1 ? 's' : ''} eliminatório${failedEliminatory.length > 1 ? 's' : ''} não atendido${failedEliminatory.length > 1 ? 's' : ''}.`,
      hasUnansweredEliminatory,
      hasUnansweredScoring: false,
      failedEliminatory,
    }
  }

  // If eliminatory criteria are unanswered → PENDENTE
  if (hasUnansweredEliminatory) {
    // Calculate partial score if any scoring is filled
    const answeredScoring = scoring.filter((c) => c.score !== null)
    const partialScore = answeredScoring.length > 0
      ? answeredScoring.reduce((sum, c) => sum + (c.score ?? 0), 0) / answeredScoring.length
      : null

    return {
      decision: 'pendente',
      score: partialScore,
      scoreFormatted: partialScore !== null ? `${partialScore.toFixed(1)}/5.0` : '—',
      justificativa: `Análise incompleta: ${unansweredElim.length} critério${unansweredElim.length > 1 ? 's' : ''} eliminatório${unansweredElim.length > 1 ? 's' : ''} pendente${unansweredElim.length > 1 ? 's' : ''}.`,
      hasUnansweredEliminatory: true,
      hasUnansweredScoring: scoring.some((c) => c.score === null),
      failedEliminatory: [],
    }
  }

  // All eliminatory passed — calculate scoring
  const answeredScoring = scoring.filter((c) => c.score !== null)
  const hasUnansweredScoring = answeredScoring.length < scoring.length

  if (answeredScoring.length === 0) {
    return {
      decision: 'pendente',
      score: null,
      scoreFormatted: '—',
      justificativa: 'Critérios eliminatórios aprovados. Preencha os critérios de scoring.',
      hasUnansweredEliminatory: false,
      hasUnansweredScoring: true,
      failedEliminatory: [],
    }
  }

  const avgScore = answeredScoring.reduce((sum, c) => sum + (c.score ?? 0), 0) / answeredScoring.length

  // Decision based on average score
  let decision: GoNoGoDecision
  let justificativa: string

  if (avgScore >= 3) {
    decision = 'go'
    justificativa = `GO: Todos os critérios eliminatórios atendidos. Score médio: ${avgScore.toFixed(1)}/5.0.`
  } else {
    decision = 'go_ressalvas'
    justificativa = `GO com ressalvas: Eliminatórios aprovados, mas score médio baixo (${avgScore.toFixed(1)}/5.0). Avaliar riscos antes de prosseguir.`
  }

  if (hasUnansweredScoring) {
    justificativa += ` (${scoring.length - answeredScoring.length} critério${scoring.length - answeredScoring.length > 1 ? 's' : ''} de scoring pendente${scoring.length - answeredScoring.length > 1 ? 's' : ''})`
  }

  return {
    decision,
    score: Math.round(avgScore * 100) / 100,
    scoreFormatted: `${avgScore.toFixed(1)}/5.0`,
    justificativa,
    hasUnansweredEliminatory: false,
    hasUnansweredScoring,
    failedEliminatory: [],
  }
}
