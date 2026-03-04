'use client'

interface MarginBarProps {
  marginPct: number
  floorPct: number
}

export function MarginBar({ marginPct, floorPct }: MarginBarProps) {
  const clampedMargin = Math.min(Math.max(marginPct, -5), 35)
  const barWidth = ((clampedMargin + 5) / 40) * 100

  let color: string
  let label: string

  if (marginPct < 0) {
    color = 'bg-black dark:bg-white'
    label = 'PREJUÍZO'
  } else if (marginPct < floorPct) {
    color = 'bg-red-500'
    label = 'Abaixo do piso'
  } else if (marginPct < 10) {
    color = 'bg-red-500'
    label = 'Margem baixa'
  } else if (marginPct < 20) {
    color = 'bg-yellow-500'
    label = 'Margem aceitável'
  } else {
    color = 'bg-green-500'
    label = 'Margem saudável'
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-[var(--muted-foreground)]">{label}</span>
        <span className="font-bold text-[var(--foreground)]">{marginPct.toFixed(1)}%</span>
      </div>
      <div className="relative h-3 rounded-full bg-[var(--muted)] overflow-hidden">
        {/* Zonas de cor */}
        <div className="absolute left-0 top-0 h-full bg-red-200 dark:bg-red-900/30" style={{ width: '37.5%' }} />
        <div className="absolute top-0 h-full bg-yellow-200 dark:bg-yellow-900/30" style={{ left: '37.5%', width: '25%' }} />
        <div className="absolute top-0 h-full bg-green-200 dark:bg-green-900/30" style={{ left: '62.5%', width: '37.5%' }} />
        {/* Indicador de piso */}
        <div
          className="absolute top-0 h-full w-0.5 bg-red-600 z-10"
          style={{ left: `${((floorPct + 5) / 40) * 100}%` }}
          title={`Piso: ${floorPct}%`}
        />
        {/* Barra de margem */}
        <div
          className={`absolute left-0 top-0 h-full ${color} rounded-full transition-all duration-300`}
          style={{ width: `${Math.max(barWidth, 0)}%` }}
        />
      </div>
    </div>
  )
}
