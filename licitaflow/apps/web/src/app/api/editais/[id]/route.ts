import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * GET /api/editais/[id]
 * Detalhe de um edital especifico.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 })
    }

    const { data: edital, error } = await supabase
      .from('editals')
      .select('*, edital_analyses(*)')
      .eq('id', id)
      .single()

    if (error || !edital) {
      return NextResponse.json({ error: 'Edital nao encontrado' }, { status: 404 })
    }

    return NextResponse.json({ data: edital })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
