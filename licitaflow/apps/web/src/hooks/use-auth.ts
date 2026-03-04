'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  profile: Record<string, unknown> | null
  tenant: Record<string, unknown> | null
  loading: boolean
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    tenant: null,
    loading: true,
  })

  const supabase = createClient()

  const fetchUserData = useCallback(async (user: User) => {
    const [profileRes, tenantRes] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', user.id).single(),
      supabase.from('tenants').select('*').single(),
    ])

    setState({
      user,
      profile: profileRes.data as Record<string, unknown> | null,
      tenant: tenantRes.data as Record<string, unknown> | null,
      loading: false,
    })
  }, [supabase])

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        fetchUserData(user)
      } else {
        setState((s) => ({ ...s, loading: false }))
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUserData(session.user)
      } else {
        setState({ user: null, profile: null, tenant: null, loading: false })
      }
    })

    return () => subscription.unsubscribe()
  }, [fetchUserData, supabase.auth])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
    setState({ user: null, profile: null, tenant: null, loading: false })
  }, [supabase.auth])

  return { ...state, signOut }
}
