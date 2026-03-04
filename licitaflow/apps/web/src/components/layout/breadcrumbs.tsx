'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

const labels: Record<string, string> = {
  dashboard: 'Dashboard',
  radar: 'Radar de Editais',
  analises: 'Analises',
  documentos: 'Documentos',
  calculadora: 'Calculadora',
  pregoes: 'Pregoes',
  notificacoes: 'Notificacoes',
  configuracoes: 'Configuracoes',
  ajuda: 'Ajuda',
}

export function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length <= 1) return null

  return (
    <nav className="flex items-center gap-1 text-sm text-muted-foreground">
      {segments.map((segment, i) => {
        const href = '/' + segments.slice(0, i + 1).join('/')
        const label = labels[segment] || segment
        const isLast = i === segments.length - 1

        return (
          <span key={href} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3 w-3" />}
            {isLast ? (
              <span className="font-medium text-foreground">{label}</span>
            ) : (
              <Link href={href} className="hover:text-foreground">
                {label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
