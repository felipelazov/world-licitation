'use client'

import { useState, useEffect } from 'react'

interface CountdownProps {
  date: string | null
  size?: 'sm' | 'md' | 'lg'
  showExpired?: boolean
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number
}

function calcTimeLeft(targetDate: string): TimeLeft {
  const diff = new Date(targetDate).getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    total: diff,
  }
}

function getColorClass(days: number): string {
  if (days > 7) return 'text-green-600 dark:text-green-400'
  if (days >= 3) return 'text-yellow-600 dark:text-yellow-400'
  return 'text-red-600 dark:text-red-400'
}

function getBgClass(days: number): string {
  if (days > 7) return 'bg-green-50 dark:bg-green-900/20'
  if (days >= 3) return 'bg-yellow-50 dark:bg-yellow-900/20'
  return 'bg-red-50 dark:bg-red-900/20'
}

export function Countdown({ date, size = 'sm', showExpired = true }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    if (!date) return

    setTimeLeft(calcTimeLeft(date))
    const interval = setInterval(() => {
      setTimeLeft(calcTimeLeft(date))
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [date])

  if (!date || timeLeft === null) return null

  // Expired
  if (timeLeft.total <= 0) {
    if (!showExpired) return null
    return (
      <span className={`inline-flex items-center rounded-full px-2 py-0.5 font-medium bg-gray-100 text-gray-500 dark:bg-gray-800/30 dark:text-gray-500 ${
        size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'
      }`}>
        Sessão encerrada
      </span>
    )
  }

  const colorClass = getColorClass(timeLeft.days)
  const bgClass = getBgClass(timeLeft.days)

  // Small — badge inline
  if (size === 'sm') {
    const text = timeLeft.days > 0
      ? `${timeLeft.days}d ${timeLeft.hours}h`
      : `${timeLeft.hours}h ${timeLeft.minutes}m`

    return (
      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${bgClass} ${colorClass}`}>
        Sessão em {text}
      </span>
    )
  }

  // Medium — compact
  if (size === 'md') {
    return (
      <div className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 ${bgClass}`}>
        <span className={`text-sm font-semibold ${colorClass}`}>
          {timeLeft.days > 0 && <>{timeLeft.days}d </>}
          {timeLeft.hours}h {timeLeft.minutes}m
        </span>
      </div>
    )
  }

  // Large — full timer display
  return (
    <div className={`rounded-lg p-4 ${bgClass}`}>
      <p className="mb-2 text-xs font-medium text-[var(--muted-foreground)]">Sessão em</p>
      <div className="flex items-baseline gap-3">
        {timeLeft.days > 0 && (
          <div className="text-center">
            <span className={`text-3xl font-bold ${colorClass}`}>{timeLeft.days}</span>
            <p className="text-xs text-[var(--muted-foreground)]">dias</p>
          </div>
        )}
        <div className="text-center">
          <span className={`text-3xl font-bold ${colorClass}`}>{String(timeLeft.hours).padStart(2, '0')}</span>
          <p className="text-xs text-[var(--muted-foreground)]">horas</p>
        </div>
        <span className={`text-2xl font-bold ${colorClass}`}>:</span>
        <div className="text-center">
          <span className={`text-3xl font-bold ${colorClass}`}>{String(timeLeft.minutes).padStart(2, '0')}</span>
          <p className="text-xs text-[var(--muted-foreground)]">min</p>
        </div>
      </div>
    </div>
  )
}
