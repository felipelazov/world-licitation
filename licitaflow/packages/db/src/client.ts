import { createClient as supabaseCreateClient } from '@supabase/supabase-js'
import type { Database } from './types'

// Client-side (browser) — usa anon key
export function createBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY'
    )
  }

  return supabaseCreateClient<Database>(supabaseUrl, supabaseKey)
}

// Server-side — usa service role key (bypassa RLS)
export function createServiceClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  if (!supabaseUrl || !serviceKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY'
    )
  }

  return supabaseCreateClient<Database>(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  })
}

// Alias default
export const createClient = createBrowserClient
