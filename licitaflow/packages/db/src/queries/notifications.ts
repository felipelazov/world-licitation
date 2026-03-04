// Query helpers para notifications e notification_preferences

import type { SupabaseClient } from '@supabase/supabase-js'
import type { NotificationRow, NotificationInsertInput, NotificationPreferenceRow } from '../schema/notifications'

// ─── Notifications ──────────────────────────────────────────

export async function listNotifications(
  client: SupabaseClient,
  options: { unreadOnly?: boolean; type?: string; page?: number; pageSize?: number } = {}
) {
  const { unreadOnly, type, page = 0, pageSize = 50 } = options

  let query = client
    .from('notifications')
    .select('*', { count: 'exact' })

  if (unreadOnly) query = query.eq('read', false)
  if (type) query = query.eq('type', type)

  query = query
    .order('created_at', { ascending: false })
    .range(page * pageSize, (page + 1) * pageSize - 1)

  const { data, error, count } = await query
  return { data: (data ?? []) as unknown as NotificationRow[], error, count: count ?? 0 }
}

export async function getUnreadCount(client: SupabaseClient) {
  const { count, error } = await client
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('read', false)

  return { count: count ?? 0, error }
}

export async function markAsRead(client: SupabaseClient, id: string) {
  const { error } = await client
    .from('notifications')
    .update({ read: true, read_at: new Date().toISOString() })
    .eq('id', id)

  return { error }
}

export async function markAllAsRead(client: SupabaseClient) {
  const { error } = await client
    .from('notifications')
    .update({ read: true, read_at: new Date().toISOString() })
    .eq('read', false)

  return { error }
}

export async function createNotification(client: SupabaseClient, input: NotificationInsertInput) {
  const { data, error } = await client
    .from('notifications')
    .insert({
      title: input.title,
      body: input.body,
      type: input.type,
      metadata: input.metadata ?? {},
      read: false,
      user_id: input.user_id ?? null,
    })
    .select()
    .single()

  return { data: data as unknown as NotificationRow | null, error }
}

// ─── Preferences ────────────────────────────────────────────

export async function getNotificationPreferences(client: SupabaseClient) {
  const { data, error } = await client
    .from('notification_preferences')
    .select('*')
    .order('notification_type', { ascending: true })

  return { data: (data ?? []) as unknown as NotificationPreferenceRow[], error }
}

export async function upsertNotificationPreference(
  client: SupabaseClient,
  input: {
    notification_type: string
    push_enabled: boolean
    email_enabled: boolean
    in_app_enabled: boolean
  }
) {
  const { data, error } = await client
    .from('notification_preferences')
    .upsert(
      {
        notification_type: input.notification_type,
        push_enabled: input.push_enabled,
        email_enabled: input.email_enabled,
        in_app_enabled: input.in_app_enabled,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'tenant_id,user_id,notification_type' }
    )
    .select()
    .single()

  return { data: data as unknown as NotificationPreferenceRow | null, error }
}
