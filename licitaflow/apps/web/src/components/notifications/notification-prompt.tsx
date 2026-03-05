'use client'

import { useState } from 'react'
import { Bell, X } from 'lucide-react'
import { useNotificationPermission } from '@/lib/hooks/use-notifications'

export function NotificationPrompt() {
  const { permission, requestPermission } = useNotificationPermission()
  const [dismissed, setDismissed] = useState(false)

  // Don't show if already granted, denied, or dismissed
  if (permission !== 'default' || dismissed) return null
  if (typeof window === 'undefined' || !('Notification' in window)) return null

  return (
    <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 dark:border-blue-800 dark:bg-blue-900/20">
      <Bell className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
      <span className="flex-1 text-sm text-blue-700 dark:text-blue-300">
        Quer receber notificacoes quando novos editais chegarem?
      </span>
      <button
        onClick={requestPermission}
        className="rounded-lg bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700"
      >
        Ativar
      </button>
      <button
        onClick={() => setDismissed(true)}
        className="rounded p-0.5 text-blue-400 hover:text-blue-600"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
