'use client'

import { Check, Circle } from 'lucide-react'

const TIMELINE_STEPS = [
  { status: 'novo', label: 'Novo' },
  { status: 'analisando', label: 'Analisando' },
  { status: 'go', label: 'GO' },
  { status: 'proposta_enviada', label: 'Proposta' },
  { status: 'em_pregao', label: 'Pregão' },
  { status: 'adjudicado', label: 'Adjudicado' },
  { status: 'contrato', label: 'Contrato' },
]

const TERMINAL_STATUSES = ['no_go', 'nao_adjudicado', 'descartado']

interface EditalTimelineProps {
  currentStatus: string
}

export function EditalTimeline({ currentStatus }: EditalTimelineProps) {
  const isTerminal = TERMINAL_STATUSES.includes(currentStatus)
  const currentIndex = TIMELINE_STEPS.findIndex((s) => s.status === currentStatus)

  function getStepState(index: number) {
    if (isTerminal) {
      // For terminal statuses, show steps up to where it was before terminal
      if (currentStatus === 'no_go') {
        return index <= 1 ? 'completed' : 'pending'
      }
      if (currentStatus === 'nao_adjudicado') {
        return index <= 4 ? 'completed' : 'pending'
      }
      if (currentStatus === 'descartado') {
        return index === 0 ? 'completed' : 'pending'
      }
    }
    if (index < currentIndex) return 'completed'
    if (index === currentIndex) return 'current'
    return 'pending'
  }

  const terminalLabel = isTerminal
    ? { no_go: 'NO-GO', nao_adjudicado: 'Não Adjudicado', descartado: 'Descartado' }[currentStatus]
    : null

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-[var(--foreground)]">Timeline</h3>

      <div className="relative">
        {TIMELINE_STEPS.map((step, index) => {
          const state = getStepState(index)
          return (
            <div key={step.status} className="flex items-start gap-3 pb-4 last:pb-0">
              {/* Connector line */}
              <div className="relative flex flex-col items-center">
                {state === 'completed' ? (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                  </div>
                ) : state === 'current' ? (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--primary)] ring-2 ring-[var(--primary)]/20">
                    <Circle className="h-3 w-3 fill-[var(--primary-foreground)] text-[var(--primary-foreground)]" />
                  </div>
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[var(--border)] bg-[var(--background)]">
                    <Circle className="h-2.5 w-2.5 text-[var(--muted-foreground)]" />
                  </div>
                )}
                {index < TIMELINE_STEPS.length - 1 && (
                  <div
                    className={`absolute top-6 h-full w-0.5 ${
                      state === 'completed'
                        ? 'bg-green-300 dark:bg-green-700'
                        : 'bg-[var(--border)]'
                    }`}
                  />
                )}
              </div>

              {/* Label */}
              <span
                className={`pt-0.5 text-sm ${
                  state === 'current'
                    ? 'font-semibold text-[var(--foreground)]'
                    : state === 'completed'
                      ? 'text-[var(--muted-foreground)]'
                      : 'text-[var(--muted-foreground)]/60'
                }`}
              >
                {step.label}
              </span>
            </div>
          )
        })}

        {/* Terminal status indicator */}
        {isTerminal && terminalLabel && (
          <div className="flex items-start gap-3 pt-2 border-t border-[var(--border)]">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <span className="text-xs font-bold text-red-600 dark:text-red-400">!</span>
            </div>
            <span className="pt-0.5 text-sm font-semibold text-red-600 dark:text-red-400">
              {terminalLabel}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
