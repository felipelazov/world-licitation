import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * GET /api/editais
 * Lista editais monitorados do tenant com filtros e paginacao.
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = Math.min(parseInt(searchParams.get('pageSize') || '20'), 50)
    const status = searchParams.get('status')
    const uf = searchParams.get('uf')
    const minScore = parseInt(searchParams.get('minScore') || '0')
    const search = searchParams.get('search')
    const orderBy = searchParams.get('orderBy') || 'relevance_score'
    const order = searchParams.get('order') === 'asc' ? true : false

    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    let query = supabase
      .from('editals')
      .select('*', { count: 'exact' })

    if (status) query = query.eq('status', status)
    if (uf) query = query.eq('uf', uf)
    if (minScore > 0) query = query.gte('relevance_score', minScore)
    if (search) query = query.ilike('objeto', `%${search}%`)

    query = query
      .order(orderBy, { ascending: order })
      .range(from, to)

    const { data: editais, count, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      data: editais,
      pagination: {
        page,
        pageSize,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize),
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
