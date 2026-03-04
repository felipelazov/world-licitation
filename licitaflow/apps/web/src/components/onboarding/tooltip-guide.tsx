'use client'

import { useState, useRef, useEffect } from 'react'
import { HelpCircle, X } from 'lucide-react'

interface TooltipGuideProps {
  id: string
  title: string
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  children: React.ReactNode
}

const DISMISSED_KEY = 'licitaflow_dismissed_tooltips'

function getDismissed(): string[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(DISMISSED_KEY) ?? '[]')
  } catch {
    return []
  }
}

function setDismissed(ids: string[]) {
  localStorage.setItem(DISMISSED_KEY, JSON.stringify(ids))
}

export function TooltipGuide({ id, title, content, position = 'bottom', children }: TooltipGuideProps) {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissedState] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const list = getDismissed()
    if (list.includes(id)) setDismissedState(true)
  }, [id])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShow(false)
      }
    }
    if (show) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [show])

  function handleDismiss() {
    const list = getDismissed()
    list.push(id)
    setDismissed(list)
    setDismissedState(true)
    setShow(false)
  }

  if (dismissed) return <>{children}</>

  const positionClasses: Record<string, string> = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  return (
    <div className="relative inline-block" ref={ref}>
      {children}
      <button
        onClick={() => setShow(!show)}
        className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm"
      >
        <HelpCircle className="h-3 w-3" />
      </button>

      {show && (
        <div
          className={`absolute z-50 w-64 rounded-lg border border-[var(--border)] bg-[var(--card)] p-3 shadow-lg ${positionClasses[position]}`}
        >
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-xs font-semibold text-[var(--foreground)]">{title}</h4>
            <button onClick={handleDismiss} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
              <X className="h-3 w-3" />
            </button>
          </div>
          <p className="mt-1 text-xs text-[var(--muted-foreground)]">{content}</p>
          <button
            onClick={handleDismiss}
            className="mt-2 text-[10px] text-[var(--primary)] hover:underline"
          >
            Entendi, nao mostrar mais
          </button>
        </div>
      )}
    </div>
  )
}

export function resetTooltips() {
  localStorage.removeItem(DISMISSED_KEY)
}
