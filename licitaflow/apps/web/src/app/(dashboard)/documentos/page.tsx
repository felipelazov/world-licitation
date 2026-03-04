'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, FolderOpen, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { DocumentCard } from '@/components/documentos/document-card'
import { DocumentUpload } from '@/components/documentos/document-upload'
import { DocumentViewer } from '@/components/documentos/document-viewer'
import { DocumentListFilters } from '@/components/documentos/document-list'
import { CategoryTabs } from '@/components/documentos/category-tabs'
import { DocsHealthBar } from '@/components/documentos/docs-health-bar'

const PAGE_SIZE = 20

export default function DocumentosPage() {
  const [documents, setDocuments] = useState<any[]>([])
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([])
  const [stats, setStats] = useState({ total: 0, valido: 0, vencendo: 0, vencido: 0, pendente: 0 })
  const [categoryCounts, setCategoryCounts] = useState<Map<string, { total: number; valido: number; vencido: number }>>(new Map())
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)

  // UI state
  const [showUpload, setShowUpload] = useState(false)
  const [viewingDoc, setViewingDoc] = useState<any | null>(null)
  const [viewingUrl, setViewingUrl] = useState<string | null>(null)

  // Filters
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [page, setPage] = useState(0)

  const supabase = createClient()

  const loadData = useCallback(async () => {
    setLoading(true)

    // Load documents
    let query = supabase
      .from('documents')
      .select('*, document_categories(id, name, slug)', { count: 'exact' })

    if (categoryFilter) {
      query = query.eq('category_id', categoryFilter)
    }
    if (statusFilter) {
      query = query.eq('status', statusFilter)
    }
    if (search) {
      query = query.ilike('name', `%${search}%`)
    }

    query = query
      .order('created_at', { ascending: false })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1)

    const { data, count } = await query
    setDocuments(data ?? [])
    setTotalCount(count ?? 0)

    // Load stats
    const { data: allDocs } = await supabase.from('documents').select('status, category_id')
    if (allDocs) {
      const s = { total: allDocs.length, valido: 0, vencendo: 0, vencido: 0, pendente: 0 }
      const catMap = new Map<string, { total: number; valido: number; vencido: number }>()

      for (const d of allDocs as { status: string; category_id: string | null }[]) {
        if (d.status === 'valido') s.valido++
        else if (d.status === 'vencendo') s.vencendo++
        else if (d.status === 'vencido') s.vencido++
        else s.pendente++

        if (d.category_id) {
          const existing = catMap.get(d.category_id) ?? { total: 0, valido: 0, vencido: 0 }
          existing.total++
          if (d.status === 'valido') existing.valido++
          if (d.status === 'vencido') existing.vencido++
          catMap.set(d.category_id, existing)
        }
      }
      setStats(s)
      setCategoryCounts(catMap)
    }

    // Load categories
    const { data: cats } = await supabase
      .from('document_categories')
      .select('id, name')
      .order('sort_order', { ascending: true })
    setCategories(cats ?? [])

    setLoading(false)
  }, [supabase, categoryFilter, statusFilter, search, page])

  useEffect(() => {
    loadData()
  }, [loadData])

  useEffect(() => {
    setPage(0)
  }, [search, statusFilter, categoryFilter])

  async function handleUpload(data: {
    file: File
    name: string
    categoryId: string
    expiresAt: string
    alertDaysBefore: number
    notes: string
  }) {
    setUploading(true)

    // 1. Upload file to storage
    const ext = data.file.name.split('.').pop() ?? 'pdf'
    const storagePath = `documents/${Date.now()}-${data.name.replace(/\s+/g, '-')}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(storagePath, data.file, { contentType: data.file.type, upsert: false })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      setUploading(false)
      return
    }

    // 2. Create document record
    const { error: insertError } = await supabase
      .from('documents')
      .insert({
        name: data.name,
        category_id: data.categoryId,
        file_path: storagePath,
        file_type: data.file.type,
        file_size: data.file.size,
        expires_at: data.expiresAt,
        alert_days_before: data.alertDaysBefore,
        notes: data.notes || null,
        status: 'pendente',
      })

    if (insertError) {
      console.error('Insert error:', insertError)
    }

    setUploading(false)
    setShowUpload(false)
    loadData()
  }

  async function handleView(id: string) {
    const doc = documents.find((d: any) => d.id === id)
    if (!doc?.file_path) return

    const { data } = supabase.storage.from('documents').getPublicUrl(doc.file_path)
    setViewingDoc(doc)
    setViewingUrl(data?.publicUrl ?? null)
  }

  async function handleDownload(id: string) {
    const doc = documents.find((d: any) => d.id === id)
    if (!doc?.file_path) return

    const { data } = await supabase.storage.from('documents').download(doc.file_path)
    if (!data) return

    const url = URL.createObjectURL(data)
    const link = document.createElement('a')
    link.href = url
    link.download = doc.name + (doc.file_type === 'application/pdf' ? '.pdf' : '')
    link.click()
    URL.revokeObjectURL(url)
  }

  async function handleDelete(id: string) {
    if (!confirm('Tem certeza que deseja excluir este documento?')) return

    const doc = documents.find((d: any) => d.id === id)

    // Delete from storage
    if (doc?.file_path) {
      await supabase.storage.from('documents').remove([doc.file_path])
    }

    // Delete from DB
    await supabase.from('documents').delete().eq('id', id)
    loadData()
  }

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Documentos</h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Gerencie seus documentos de habilitação e certidões
          </p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Novo Documento
        </button>
      </div>

      {/* Health bar */}
      {stats.total > 0 && (
        <DocsHealthBar
          total={stats.total}
          valido={stats.valido}
          vencendo={stats.vencendo}
          vencido={stats.vencido}
          pendente={stats.pendente}
        />
      )}

      {/* Upload form */}
      {showUpload && (
        <DocumentUpload
          categories={categories}
          onUpload={handleUpload}
          onCancel={() => setShowUpload(false)}
          isLoading={uploading}
        />
      )}

      {/* Filters */}
      <DocumentListFilters
        search={search}
        status={statusFilter}
        onSearchChange={setSearch}
        onStatusChange={setStatusFilter}
      />

      {/* Category tabs */}
      {categories.length > 0 && (
        <CategoryTabs
          categories={categories}
          selected={categoryFilter}
          onSelect={setCategoryFilter}
          counts={categoryCounts}
        />
      )}

      {/* Document list */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-[var(--muted-foreground)]" />
        </div>
      ) : documents.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[var(--border)] py-12 text-center">
          <FolderOpen className="mb-3 h-10 w-10 text-[var(--muted-foreground)]" />
          <h3 className="font-medium text-[var(--foreground)]">Nenhum documento encontrado</h3>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Comece fazendo upload dos seus documentos de habilitação.
          </p>
          <button
            onClick={() => setShowUpload(true)}
            className="mt-3 flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Fazer Upload
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            {documents.map((doc: any) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                onView={handleView}
                onDownload={handleDownload}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm disabled:opacity-50"
              >
                Anterior
              </button>
              <span className="text-sm text-[var(--muted-foreground)]">
                {page + 1} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm disabled:opacity-50"
              >
                Próxima
              </button>
            </div>
          )}
        </>
      )}

      {/* Document viewer modal */}
      {viewingDoc && (
        <DocumentViewer
          document={viewingDoc}
          storageUrl={viewingUrl}
          onClose={() => { setViewingDoc(null); setViewingUrl(null) }}
          onDownload={() => handleDownload(viewingDoc.id)}
        />
      )}
    </div>
  )
}
