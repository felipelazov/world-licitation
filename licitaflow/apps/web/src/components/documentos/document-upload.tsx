'use client'

import { useState, useRef } from 'react'
import { Upload, X, Loader2 } from 'lucide-react'

const ACCEPTED_TYPES = ['application/pdf', 'image/jpeg', 'image/png']
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

interface DocumentUploadProps {
  categories: { id: string; name: string }[]
  onUpload: (data: {
    file: File
    name: string
    categoryId: string
    expiresAt: string
    alertDaysBefore: number
    notes: string
  }) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export function DocumentUpload({ categories, onUpload, onCancel, isLoading = false }: DocumentUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [name, setName] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [expiresAt, setExpiresAt] = useState('')
  const [alertDays, setAlertDays] = useState(30)
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFileSelect(selected: File) {
    if (!ACCEPTED_TYPES.includes(selected.type)) {
      setError('Tipo de arquivo não suportado. Use PDF, JPG ou PNG.')
      return
    }
    if (selected.size > MAX_FILE_SIZE) {
      setError('Arquivo muito grande. Máximo: 10MB.')
      return
    }
    setError('')
    setFile(selected)
    if (!name) setName(selected.name.replace(/\.[^.]+$/, ''))
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) handleFileSelect(dropped)
  }

  async function handleSubmit() {
    if (!file || !name || !categoryId || !expiresAt) return
    await onUpload({ file, name, categoryId, expiresAt, alertDaysBefore: alertDays, notes })
  }

  const canSubmit = file && name && categoryId && expiresAt && !isLoading

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">Upload de Documento</h2>
        <button onClick={onCancel} className="rounded p-1 text-[var(--muted-foreground)] hover:bg-[var(--muted)]">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed py-8 transition-colors ${
          dragOver
            ? 'border-[var(--primary)] bg-[var(--primary)]/5'
            : file
              ? 'border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-900/10'
              : 'border-[var(--border)] hover:border-[var(--primary)]/50'
        }`}
      >
        <Upload className="mb-2 h-8 w-8 text-[var(--muted-foreground)]" />
        {file ? (
          <p className="text-sm text-[var(--foreground)]">{file.name} ({(file.size / 1024).toFixed(0)} KB)</p>
        ) : (
          <>
            <p className="text-sm text-[var(--foreground)]">Arraste ou clique para selecionar</p>
            <p className="text-xs text-[var(--muted-foreground)]">PDF, JPG, PNG — até 10MB</p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
          className="hidden"
        />
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}

      {/* Form fields */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-[var(--muted-foreground)]">Nome *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-[var(--muted-foreground)]">Categoria *</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
          >
            <option value="">Selecionar...</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-[var(--muted-foreground)]">Data de Vencimento *</label>
          <input
            type="date"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-[var(--muted-foreground)]">Alertar X dias antes</label>
          <input
            type="number"
            value={alertDays}
            onChange={(e) => setAlertDays(parseInt(e.target.value) || 30)}
            min={1}
            max={180}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-[var(--muted-foreground)]">Notas</label>
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Observações sobre o documento..."
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
        />
      </div>

      <div className="flex justify-end gap-2 border-t border-[var(--border)] pt-4">
        <button onClick={onCancel} className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm hover:bg-[var(--muted)]">
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] hover:opacity-90 disabled:opacity-50"
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          {isLoading ? 'Enviando...' : 'Enviar'}
        </button>
      </div>
    </div>
  )
}
