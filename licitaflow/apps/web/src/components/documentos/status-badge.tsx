'use client'

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  valido: { label: 'Válido', color: 'text-green-700 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30' },
  vencendo: { label: 'Vencendo', color: 'text-yellow-700 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
  vencido: { label: 'Vencido', color: 'text-red-700 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30' },
  pendente: { label: 'Pendente', color: 'text-gray-700 dark:text-gray-400', bg: 'bg-gray-100 dark:bg-gray-900/30' },
}

export function DocStatusBadge({ status }: { status: string }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.pendente
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${config.bg} ${config.color}`}>
      {config.label}
    </span>
  )
}
