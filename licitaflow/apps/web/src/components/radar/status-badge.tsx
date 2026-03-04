'use client'

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  novo: { label: 'Novo', color: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  analisando: { label: 'Analisando', color: 'text-yellow-700 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
  go: { label: 'GO', color: 'text-green-700 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30' },
  no_go: { label: 'NO-GO', color: 'text-red-700 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30' },
  proposta_enviada: { label: 'Proposta', color: 'text-purple-700 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  em_pregao: { label: 'Em Pregão', color: 'text-orange-700 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-900/30' },
  adjudicado: { label: 'Adjudicado', color: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
  nao_adjudicado: { label: 'Não Adjudicado', color: 'text-gray-700 dark:text-gray-400', bg: 'bg-gray-100 dark:bg-gray-900/30' },
  contrato: { label: 'Contrato', color: 'text-teal-700 dark:text-teal-400', bg: 'bg-teal-100 dark:bg-teal-900/30' },
  descartado: { label: 'Descartado', color: 'text-gray-500 dark:text-gray-500', bg: 'bg-gray-100 dark:bg-gray-800/30' },
}

interface StatusBadgeProps {
  status: string
  size?: 'sm' | 'md'
}

export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? {
    label: status,
    color: 'text-gray-700 dark:text-gray-400',
    bg: 'bg-gray-100 dark:bg-gray-900/30',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${config.bg} ${config.color} ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm'
      }`}
    >
      {config.label}
    </span>
  )
}
