// Query helpers para bidding_sessions e bids

import type { SupabaseClient } from '@supabase/supabase-js'
import type { BiddingSessionRow, BiddingSessionInsertInput, BidRow, BidInsertInput } from '../schema/bidding'

// ─── Bidding Sessions ───────────────────────────────────────

export async function listBiddingSessions(client: SupabaseClient) {
  const { data, error } = await client
    .from('bidding_sessions')
    .select('*, editals(title, agency, session_date, estimated_value)')
    .order('created_at', { ascending: false })

  return { data: (data ?? []) as unknown as BiddingSessionRow[], error }
}

export async function getBiddingSessionById(client: SupabaseClient, id: string) {
  const { data, error } = await client
    .from('bidding_sessions')
    .select('*, editals(title, agency, session_date, estimated_value, status, object)')
    .eq('id', id)
    .single()

  return { data: data as unknown as BiddingSessionRow | null, error }
}

export async function getBiddingSessionByEdital(client: SupabaseClient, editalId: string) {
  const { data, error } = await client
    .from('bidding_sessions')
    .select('*, editals(title, agency, session_date, estimated_value)')
    .eq('edital_id', editalId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  return { data: data as unknown as BiddingSessionRow | null, error }
}

export async function createBiddingSession(client: SupabaseClient, input: BiddingSessionInsertInput) {
  const { data, error } = await client
    .from('bidding_sessions')
    .insert({
      edital_id: input.edital_id,
      cost_sheet_id: input.cost_sheet_id ?? null,
      floor_price: input.floor_price ?? null,
      status: input.status ?? 'agendado',
      result: 'pendente',
    })
    .select()
    .single()

  return { data: data as unknown as BiddingSessionRow | null, error }
}

export async function updateBiddingSession(
  client: SupabaseClient,
  id: string,
  updates: Partial<{
    status: string
    result: string
    final_price: number
    final_margin_pct: number
    classification_position: number
    observations: string
    started_at: string
    ended_at: string
    floor_price: number
    cost_sheet_id: string
  }>
) {
  const { data, error } = await client
    .from('bidding_sessions')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  return { data: data as unknown as BiddingSessionRow | null, error }
}

// ─── Bids ───────────────────────────────────────────────────

export async function getBids(client: SupabaseClient, sessionId: string) {
  const { data, error } = await client
    .from('bids')
    .select('*')
    .eq('session_id', sessionId)
    .order('bid_time', { ascending: false })

  return { data: (data ?? []) as unknown as BidRow[], error }
}

export async function createBid(client: SupabaseClient, input: BidInsertInput) {
  const { data, error } = await client
    .from('bids')
    .insert({
      session_id: input.session_id,
      value: input.value,
      is_mine: input.is_mine,
      competitor_label: input.competitor_label ?? null,
      bid_time: input.bid_time ?? new Date().toISOString(),
      notes: input.notes ?? null,
    })
    .select()
    .single()

  return { data: data as unknown as BidRow | null, error }
}

export async function getLowestBid(client: SupabaseClient, sessionId: string) {
  const { data, error } = await client
    .from('bids')
    .select('*')
    .eq('session_id', sessionId)
    .order('value', { ascending: true })
    .limit(1)
    .maybeSingle()

  return { data: data as unknown as BidRow | null, error }
}

export async function getMyLastBid(client: SupabaseClient, sessionId: string) {
  const { data, error } = await client
    .from('bids')
    .select('*')
    .eq('session_id', sessionId)
    .eq('is_mine', true)
    .order('bid_time', { ascending: false })
    .limit(1)
    .maybeSingle()

  return { data: data as unknown as BidRow | null, error }
}
