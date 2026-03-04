'use client'

import { Menu, LogOut, User, ChevronDown } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'
import { NotificationBell } from '@/components/notifications/notification-bell'
import { useAuth } from '@/hooks/use-auth'
import { useState, useRef, useEffect } from 'react'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, profile, tenant, signOut } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const displayName = (profile?.full_name as string) || user?.email || ''
  const tenantName = (tenant?.nome_fantasia as string) || (tenant?.razao_social as string) || ''
  const initials = displayName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4">
      {/* Left: mobile menu + tenant name */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        {tenantName && (
          <span className="text-sm font-medium text-muted-foreground">{tenantName}</span>
        )}
      </div>

      {/* Right: notifications + theme toggle + user menu */}
      <div className="flex items-center gap-2">
        <NotificationBell />
        <ThemeToggle />

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-accent"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
              {initials || '?'}
            </div>
            <span className="hidden text-sm font-medium md:block">{displayName}</span>
            <ChevronDown className="hidden h-4 w-4 text-muted-foreground md:block" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-lg border border-border bg-card py-1 shadow-lg">
              <a
                href="/configuracoes"
                className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent"
                onClick={() => setDropdownOpen(false)}
              >
                <User className="h-4 w-4" />
                Perfil
              </a>
              <button
                onClick={() => {
                  setDropdownOpen(false)
                  signOut()
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-accent"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
