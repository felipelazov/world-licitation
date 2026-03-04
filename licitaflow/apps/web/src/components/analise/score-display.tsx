'use client'

import type { GoNoGoDecision, ScoringResult } from '@licitaflow/shared'

const DECISION_CONFIG: Record<GoNoGoDecision, { label: string; color: string; bg: string }> = {
  go: {
    label: 'GO',
    color: 'text-green-700 dark:text-green-400',
    bg: 'bg-green-100 dark:bg-green-900/30',
  },
  go_ressalvas: {
    label: 'GO com Ressalvas',
    color: 'text-yellow-700 dark:text-yellow-400',
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
  },
  no_go: {
    label: 'NO-GO',
    color: 'text-red-700 dark:text-red-400',
    bg: 'bg-red-100 dark:bg-red-900/30',
  },
  pendente: {
    label: 'Pendente',
    color: 'text-gray-700 dark:text-gray-400',
    bg: 'bg-gray-100 dark:bg-gray-900/30',
  },
}

interface ScoreDisplayProps {
  result: ScoringResult
}

export function ScoreDisplay({ result }: ScoreDisplayProps) {
  const config = DECISION_CONFIG[result.decision]

  return (
    <div className={`rounded-lg p-4 ${config.bg}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-[var(--muted-foreground)]">Recomendação</p>
          <p className={`text-2xl font-bold ${config.color}`}>{config.label}</p>
        </div>
        {result.score !== null && (
          <div className="text-right">
            <p className="text-xs font-medium text-[var(--muted-foreground)]">Score</p>
            <p className={`text-2xl font-bold ${config.color}`}>{result.scoreFormatted}</p>
          </div>
        )}
      </div>
      <p className="mt-2 text-sm text-[var(--muted-foreground)]">{result.justificativa}</p>
    </div>
  )
}
