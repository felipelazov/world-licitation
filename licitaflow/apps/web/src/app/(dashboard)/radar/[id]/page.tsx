'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { EditalDetail } from '@/components/radar/edital-detail'

interface EditalFull {
  id: string
  title: string
  object: string
  agency: string
  estimated_value: number | null
  session_date: string | null
  publication_date: string
  status: string
  portal_url: string
  modalidade: string
  pdf_url: string | null
  uasg: string | null
  delivery_location: string | null
  raw_data: Record<string, unknown> | null
  edital_sources: { name: string; slug: string } | null
}

export default function EditalDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [edital, setEdital] = useState<EditalFull | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  const loadEdital = useCallback(async () => {
    setLoading(true)
    setError(null)

    const { data, error: fetchError } = await supabase
      .from('editals')
      .select('*, edital_sources(name, slug)')
      .eq('id', id)
      .single()

    if (fetchError) {
      setError('Edital não encontrado.')
    } else {
      setEdital(data as unknown as EditalFull)
    }
    setLoading(false)
  }, [supabase, id])

  useEffect(() => {
    loadEdital()
  }, [loadEdital])

  async function handleStatusChange(newStatus: string) {
    if (!edital) return

    const { error: updateError } = await supabase
      .from('editals')
      .update({ status: newStatus })
      .eq('id', id)

    if (!updateError) {
      setEdital((prev) => (prev ? { ...prev, status: newStatus } : null))
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-[var(--muted-foreground)]" />
      </div>
    )
  }

  if (error || !edital) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">Edital não encontrado</h2>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">{error}</p>
        <Link
          href="/radar"
          className="mt-4 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] hover:opacity-90"
        >
          Voltar ao Radar
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </button>
        <span className="text-sm text-[var(--muted-foreground)]">/</span>
        <Link href="/radar" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
          Radar
        </Link>
        <span className="text-sm text-[var(--muted-foreground)]">/</span>
        <span className="text-sm text-[var(--foreground)]">{edital.title}</span>
      </div>

      {/* Detail */}
      <EditalDetail edital={edital} onStatusChange={handleStatusChange} />
    </div>
  )
}
