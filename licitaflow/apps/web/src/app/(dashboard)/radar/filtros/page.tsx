'use client'

import { useState, useEffect, useCallback } from 'react'
import { Filter, Plus } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { FilterCard } from '@/components/radar/filter-card'
import { FilterForm } from '@/components/radar/filter-form'

interface EditalFilter {
  id: string
  name: string
  keywords: string[]
  regioes: string[] | null
  modalidades: string[] | null
  valor_min: number | null
  valor_max: number | null
  is_active: boolean
  tenant_id: string
}

export default function FiltrosPage() {
  const [filters, setFilters] = useState<EditalFilter[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingFilter, setEditingFilter] = useState<EditalFilter | null>(null)
  const [saving, setSaving] = useState(false)
  const [tenantId, setTenantId] = useState<string | null>(null)

  const supabase = createClient()

  const loadFilters = useCallback(async () => {
    // Buscar tenant_id do usuario logado
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('tenant_id')
        .eq('id', user.id)
        .single()
      if (profile) setTenantId(profile.tenant_id)
    }

    const { data, error } = await supabase
      .from('edital_filters')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setFilters(data as unknown as EditalFilter[])
    }
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    loadFilters()
  }, [loadFilters])

  async function handleCreate(data: {
    name: string
    keywords: string[]
    regioes: string[]
    modalidades: string[]
    valor_min: number | null
    valor_max: number | null
  }) {
    setSaving(true)

    if (!tenantId) return

    const { error } = await supabase.from('edital_filters').insert({
      tenant_id: tenantId,
      name: data.name,
      keywords: data.keywords,
      regioes: data.regioes.length > 0 ? data.regioes : null,
      modalidades: data.modalidades.length > 0 ? data.modalidades : null,
      valor_min: data.valor_min,
      valor_max: data.valor_max,
      is_active: true,
    })

    if (!error) {
      setShowForm(false)
      loadFilters()
    }
    setSaving(false)
  }

  async function handleUpdate(data: {
    name: string
    keywords: string[]
    regioes: string[]
    modalidades: string[]
    valor_min: number | null
    valor_max: number | null
  }) {
    if (!editingFilter) return
    setSaving(true)

    const { error } = await supabase
      .from('edital_filters')
      .update({
        name: data.name,
        keywords: data.keywords,
        regioes: data.regioes.length > 0 ? data.regioes : null,
        modalidades: data.modalidades.length > 0 ? data.modalidades : null,
        valor_min: data.valor_min,
        valor_max: data.valor_max,
      })
      .eq('id', editingFilter.id)

    if (!error) {
      setEditingFilter(null)
      loadFilters()
    }
    setSaving(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Excluir este filtro?')) return

    const { error } = await supabase.from('edital_filters').delete().eq('id', id)

    if (!error) {
      loadFilters()
    }
  }

  async function handleToggle(id: string, is_active: boolean) {
    const { error } = await supabase
      .from('edital_filters')
      .update({ is_active })
      .eq('id', id)

    if (!error) {
      setFilters((prev) =>
        prev.map((f) => (f.id === id ? { ...f, is_active } : f))
      )
    }
  }

  const activeCount = filters.filter((f) => f.is_active).length

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Filtros de Monitoramento</h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Configure quais editais aparecem no seu Radar. {activeCount > 0 && `${activeCount} filtro${activeCount > 1 ? 's' : ''} ativo${activeCount > 1 ? 's' : ''}.`}
          </p>
        </div>
        {!showForm && !editingFilter && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Novo Filtro
          </button>
        )}
      </div>

      {/* Form */}
      {(showForm || editingFilter) && (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-5">
          <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">
            {editingFilter ? 'Editar Filtro' : 'Novo Filtro'}
          </h2>
          <FilterForm
            initialData={editingFilter ?? undefined}
            onSubmit={editingFilter ? handleUpdate : handleCreate}
            onCancel={() => {
              setShowForm(false)
              setEditingFilter(null)
            }}
            isLoading={saving}
          />
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-lg bg-[var(--muted)]" />
          ))}
        </div>
      ) : filters.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[var(--border)] py-12 text-center">
          <Filter className="mb-3 h-10 w-10 text-[var(--muted-foreground)]" />
          <h3 className="font-medium text-[var(--foreground)]">Nenhum filtro configurado</h3>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Crie filtros para monitorar editais automaticamente.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] hover:opacity-90"
          >
            Criar Primeiro Filtro
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filters.map((filter) => (
            <FilterCard
              key={filter.id}
              filter={filter}
              onEdit={(id) => {
                const f = filters.find((f) => f.id === id)
                if (f) setEditingFilter(f)
              }}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          ))}
        </div>
      )}
    </div>
  )
}
