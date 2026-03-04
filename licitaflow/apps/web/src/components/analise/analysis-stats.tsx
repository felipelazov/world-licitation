'use client'

interface AnalysisStatsProps {
  total: number
  go: number
  noGo: number
  pendente: number
}

export function AnalysisStats({ total, go, noGo, pendente }: AnalysisStatsProps) {
  const goPercent = total > 0 ? Math.round((go / total) * 100) : 0
  const noGoPercent = total > 0 ? Math.round((noGo / total) * 100) : 0

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <StatCard label="Total Analisados" value={total} />
      <StatCard
        label="GO"
        value={go}
        suffix={total > 0 ? `${goPercent}%` : undefined}
        color="text-green-600 dark:text-green-400"
      />
      <StatCard
        label="NO-GO"
        value={noGo}
        suffix={total > 0 ? `${noGoPercent}%` : undefined}
        color="text-red-600 dark:text-red-400"
      />
      <StatCard
        label="Pendentes"
        value={pendente}
        color="text-yellow-600 dark:text-yellow-400"
      />
    </div>
  )
}

function StatCard({
  label,
  value,
  suffix,
  color,
}: {
  label: string
  value: number
  suffix?: string
  color?: string
}) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-3">
      <p className="text-xs text-[var(--muted-foreground)]">{label}</p>
      <div className="flex items-baseline gap-1">
        <p className={`text-2xl font-bold ${color ?? 'text-[var(--foreground)]'}`}>{value}</p>
        {suffix && <span className="text-xs text-[var(--muted-foreground)]">{suffix}</span>}
      </div>
    </div>
  )
}
