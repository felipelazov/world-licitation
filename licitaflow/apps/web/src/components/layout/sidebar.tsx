'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Radar,
  ClipboardCheck,
  FolderOpen,
  Calculator,
  Zap,
  Bell,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/radar', label: 'Radar de Editais', icon: Radar },
  { href: '/analises', label: 'Analises', icon: ClipboardCheck },
  { href: '/documentos', label: 'Documentos', icon: FolderOpen },
  { href: '/calculadora', label: 'Calculadora', icon: Calculator },
  { href: '/pregao', label: 'Pregoes', icon: Zap },
  { href: '/notificacoes', label: 'Notificacoes', icon: Bell },
]

const bottomItems = [
  { href: '/configuracoes', label: 'Configuracoes', icon: Settings },
  { href: '/ajuda', label: 'Ajuda', icon: HelpCircle },
]

interface SidebarProps {
  mobileOpen: boolean
  onMobileClose: () => void
}

export function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed')
    if (saved) setCollapsed(JSON.parse(saved))
  }, [])

  const toggleCollapse = () => {
    const next = !collapsed
    setCollapsed(next)
    localStorage.setItem('sidebar-collapsed', JSON.stringify(next))
  }

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-14 items-center justify-between border-b border-sidebar-border px-4">
        {!collapsed && (
          <Link href="/dashboard" className="text-lg font-bold text-foreground">
            LicitaFlow
          </Link>
        )}
        {collapsed && (
          <Link href="/dashboard" className="mx-auto text-lg font-bold text-primary">
            LF
          </Link>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              } ${collapsed ? 'justify-center' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Bottom items */}
      <div className="space-y-1 border-t border-sidebar-border px-2 py-4">
        {bottomItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              } ${collapsed ? 'justify-center' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}

        {/* Collapse toggle — desktop only */}
        <button
          onClick={toggleCollapse}
          className="hidden w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground md:flex"
        >
          {collapsed ? (
            <ChevronRight className="mx-auto h-5 w-5" />
          ) : (
            <>
              <ChevronLeft className="h-5 w-5 shrink-0" />
              <span>Recolher</span>
            </>
          )}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden h-screen border-r border-sidebar-border bg-sidebar md:fixed md:left-0 md:top-0 md:block"
        style={{ width: collapsed ? 'var(--sidebar-width-collapsed)' : 'var(--sidebar-width)' }}
      >
        {sidebarContent}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={onMobileClose} />
          <aside className="fixed left-0 top-0 z-50 h-screen w-64 border-r border-sidebar-border bg-sidebar md:hidden">
            <button
              onClick={onMobileClose}
              className="absolute right-2 top-3 rounded-lg p-1 text-muted-foreground hover:bg-accent"
            >
              <X className="h-5 w-5" />
            </button>
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  )
}

export function useSidebarWidth() {
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed')
    if (saved) setCollapsed(JSON.parse(saved))

    const handleStorage = () => {
      const saved = localStorage.getItem('sidebar-collapsed')
      if (saved) setCollapsed(JSON.parse(saved))
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  return collapsed ? 'var(--sidebar-width-collapsed)' : 'var(--sidebar-width)'
}
