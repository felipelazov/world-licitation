'use client'

interface EliminatoryItemProps {
  type: 'eliminatory'
  id: string
  label: string
  description: string
  answer: boolean | null
  observation: string
  onAnswerChange: (answer: boolean | null) => void
  onObservationChange: (observation: string) => void
}

interface ScoringItemProps {
  type: 'scoring'
  id: string
  label: string
  description: string
  score: number | null
  observation: string
  onScoreChange: (score: number | null) => void
  onObservationChange: (observation: string) => void
}

type CriteriaItemProps = EliminatoryItemProps | ScoringItemProps

export function CriteriaItem(props: CriteriaItemProps) {
  const { type, label, description, observation, onObservationChange } = props

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 space-y-3">
      <div>
        <div className="flex items-center gap-2">
          <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
            type === 'eliminatory'
              ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
          }`}>
            {type === 'eliminatory' ? 'Eliminatório' : 'Scoring'}
          </span>
          <h4 className="text-sm font-semibold text-[var(--foreground)]">{label}</h4>
        </div>
        <p className="mt-1 text-xs text-[var(--muted-foreground)]">{description}</p>
      </div>

      {/* Input area */}
      {type === 'eliminatory' ? (
        <EliminatoryInput
          answer={(props as EliminatoryItemProps).answer}
          onAnswerChange={(props as EliminatoryItemProps).onAnswerChange}
        />
      ) : (
        <ScoringInput
          score={(props as ScoringItemProps).score}
          onScoreChange={(props as ScoringItemProps).onScoreChange}
        />
      )}

      {/* Observation */}
      <input
        type="text"
        value={observation}
        onChange={(e) => onObservationChange(e.target.value)}
        placeholder="Observação (opcional)"
        className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 text-xs text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
      />
    </div>
  )
}

function EliminatoryInput({
  answer,
  onAnswerChange,
}: {
  answer: boolean | null
  onAnswerChange: (answer: boolean | null) => void
}) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onAnswerChange(answer === true ? null : true)}
        className={`rounded-lg px-4 py-1.5 text-xs font-medium transition-colors ${
          answer === true
            ? 'bg-green-100 text-green-700 ring-2 ring-green-500 dark:bg-green-900/30 dark:text-green-400'
            : 'border border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--muted)]'
        }`}
      >
        Atende
      </button>
      <button
        onClick={() => onAnswerChange(answer === false ? null : false)}
        className={`rounded-lg px-4 py-1.5 text-xs font-medium transition-colors ${
          answer === false
            ? 'bg-red-100 text-red-700 ring-2 ring-red-500 dark:bg-red-900/30 dark:text-red-400'
            : 'border border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--muted)]'
        }`}
      >
        Não Atende
      </button>
    </div>
  )
}

function ScoringInput({
  score,
  onScoreChange,
}: {
  score: number | null
  onScoreChange: (score: number | null) => void
}) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          onClick={() => onScoreChange(score === value ? null : value)}
          className={`h-8 w-8 rounded-lg text-xs font-bold transition-colors ${
            score === value
              ? value >= 4
                ? 'bg-green-100 text-green-700 ring-2 ring-green-500 dark:bg-green-900/30 dark:text-green-400'
                : value === 3
                  ? 'bg-yellow-100 text-yellow-700 ring-2 ring-yellow-500 dark:bg-yellow-900/30 dark:text-yellow-400'
                  : 'bg-red-100 text-red-700 ring-2 ring-red-500 dark:bg-red-900/30 dark:text-red-400'
              : 'border border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--muted)]'
          }`}
        >
          {value}
        </button>
      ))}
      <span className="ml-2 text-xs text-[var(--muted-foreground)]">
        {score !== null ? `${score}/5` : '—'}
      </span>
    </div>
  )
}
