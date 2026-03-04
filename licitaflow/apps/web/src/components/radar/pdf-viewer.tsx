'use client'

import { FileText, ExternalLink } from 'lucide-react'

interface PdfViewerProps {
  url: string | null
  title?: string
}

export function PdfViewer({ url, title = 'Edital PDF' }: PdfViewerProps) {
  if (!url) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[var(--border)] py-12 text-center">
        <FileText className="mb-3 h-10 w-10 text-[var(--muted-foreground)]" />
        <h3 className="font-medium text-[var(--foreground)]">PDF não disponível</h3>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          O documento do edital ainda não foi baixado.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[var(--foreground)]">{title}</h3>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-[var(--primary)] hover:underline"
        >
          Abrir em nova aba
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      <div className="overflow-hidden rounded-lg border border-[var(--border)]">
        <iframe
          src={url}
          title={title}
          className="h-[600px] w-full bg-white"
        />
      </div>
    </div>
  )
}
