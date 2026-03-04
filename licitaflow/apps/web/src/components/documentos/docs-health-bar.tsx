'use client'

interface DocsHealthBarProps {
  total: number
  valido: number
  vencendo: number
  vencido: number
  pendente: number
}

export function DocsHealthBar({ total, valido, vencendo, vencido, pendente }: DocsHealthBarProps) {
  if (total === 0) return null

  const pctValido = (valido / total) * 100
  const pctVencendo = (vencendo / total) * 100
  const pctVencido = (vencido / total) * 100
  const pctPendente = (pendente / total) * 100

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
        <span>Saúde dos Documentos</span>
        <span>{Math.round(pctValido)}% válidos</span>
      </div>
      <div className="flex h-2 overflow-hidden rounded-full bg-[var(--muted)]">
        {pctValido > 0 && (
          <div className="bg-green-500" style={{ width: `${pctValido}%` }} />
        )}
        {pctVencendo > 0 && (
          <div className="bg-yellow-500" style={{ width: `${pctVencendo}%` }} />
        )}
        {pctVencido > 0 && (
          <div className="bg-red-500" style={{ width: `${pctVencido}%` }} />
        )}
        {pctPendente > 0 && (
          <div className="bg-gray-400" style={{ width: `${pctPendente}%` }} />
        )}
      </div>
      <div className="flex flex-wrap gap-3 text-xs">
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-green-500" />{valido} válidos</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-yellow-500" />{vencendo} vencendo</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-500" />{vencido} vencidos</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-gray-400" />{pendente} pendentes</span>
      </div>
    </div>
  )
}
