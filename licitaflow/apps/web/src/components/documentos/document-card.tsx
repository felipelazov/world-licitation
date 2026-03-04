'use client'

import { FileText, Download, Trash2, Calendar } from 'lucide-react'
import { DocStatusBadge } from './status-badge'

interface DocumentCardProps {
  document: {
    id: string
    name: string
    file_type: string | null
    file_size: number | null
    status: string
    expires_at: string | null
    document_categories?: { name: string } | null
  }
  onView: (id: string) => void
  onDownload: (id: string) => void
  onDelete: (id: string) => void
}

function formatFileSize(bytes: number | null): string {
  if (!bytes) return '—'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—'
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(dateStr))
}

export function DocumentCard({ document: doc, onView, onDownload, onDelete }: DocumentCardProps) {
  return (
    <div
      className="group flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--card)] p-3 transition-colors hover:border-[var(--primary)]/30 cursor-pointer"
      onClick={() => onView(doc.id)}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--muted)]">
        <FileText className="h-5 w-5 text-[var(--muted-foreground)]" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-medium text-[var(--foreground)]">{doc.name}</p>
          <DocStatusBadge status={doc.status} />
        </div>
        <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
          {doc.document_categories && <span>{doc.document_categories.name}</span>}
          <span>{formatFileSize(doc.file_size)}</span>
          {doc.expires_at && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Vence: {formatDate(doc.expires_at)}
            </span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => { e.stopPropagation(); onDownload(doc.id) }}
          className="rounded p-1.5 text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
          title="Download"
        >
          <Download className="h-4 w-4" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(doc.id) }}
          className="rounded p-1.5 text-[var(--muted-foreground)] hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
          title="Excluir"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
