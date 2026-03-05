import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * POST /api/editais/[id]/analyze
 * Registra decisao GO/NO-GO para um edital.
 * Body: { decision: 'go' | 'no_go', justificativa?: string, criteria?: object }
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('tenant_id')
      .eq('id', user.id)
      .single()

    if (!profile?.tenant_id) {
      return NextResponse.json({ error: 'Tenant nao encontrado' }, { status: 404 })
    }

    const body = await request.json()
    const { decision, justificativa, criteria } = body

    if (!decision || !['go', 'no_go'].includes(decision)) {
      return NextResponse.json({ error: 'Decision deve ser "go" ou "no_go"' }, { status: 400 })
    }

    // Criar analise
    const { data: analysis, error: analysisError } = await supabase
      .from('edital_analyses')
      .insert({
        tenant_id: profile.tenant_id,
        edital_id: id,
        analyzed_by: user.id,
        decision,
        justificativa: justificativa || null,
        criteria: criteria || {},
      })
      .select()
      .single()

    if (analysisError) {
      return NextResponse.json({ error: analysisError.message }, { status: 500 })
    }

    // Atualizar status do edital
    await supabase
      .from('editals')
      .update({ status: decision })
      .eq('id', id)

    return NextResponse.json({ data: analysis })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
