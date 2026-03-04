'use client'

import { X, Download, ExternalLink } from 'lucide-react'

interface DocumentViewerProps {
  document: {
    name: string
    file_path: string | null
    file_type: string | null
  }
  storageUrl: string | null
  onClose: () => void
  onDownload: () => void
}

export function DocumentViewer({ document: doc, storageUrl, onClose, onDownload }: DocumentViewerProps) {
  const isPdf = doc.file_type === 'application/pdf'
  const isImage = doc.file_type?.startsWith('image/')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-4xl rounded-lg bg-[var(--card)] shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
          <h3 className="text-sm font-semibold text-[var(--foreground)]">{doc.name}</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={onDownload}
              className="flex items-center gap-1 rounded px-2 py-1 text-xs text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
            >
              <Download className="h-3.5 w-3.5" />
              Download
            </button>
            {storageUrl && (
              <a
                href={storageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 rounded px-2 py-1 text-xs text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Nova aba
              </a>
            )}
            <button onClick={onClose} className="rounded p-1 text-[var(--muted-foreground)] hover:bg-[var(--muted)]">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[70vh] overflow-auto p-4">
          {!storageUrl ? (
            <p className="py-12 text-center text-sm text-[var(--muted-foreground)]">
              Arquivo não disponível para visualização.
            </p>
          ) : isPdf ? (
            <iframe src={storageUrl} className="h-[60vh] w-full rounded bg-white" title={doc.name} />
          ) : isImage ? (
            <img src={storageUrl} alt={doc.name} className="mx-auto max-h-[60vh] rounded object-contain" />
          ) : (
            <p className="py-12 text-center text-sm text-[var(--muted-foreground)]">
              Tipo de arquivo não suportado para visualização. Use o botão de download.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
