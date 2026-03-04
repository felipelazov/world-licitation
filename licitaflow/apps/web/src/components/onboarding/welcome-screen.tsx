'use client'

import { useState } from 'react'
import { ArrowRight, Target, FileText, Calculator, Bell, HelpCircle } from 'lucide-react'

interface WelcomeScreenProps {
  userName?: string
  onStartOnboarding: () => void
  onSkip: () => void
}

const FEATURES = [
  {
    icon: Target,
    title: 'Monitorar Editais',
    description: 'Busca automatica de editais compativeis com seu perfil',
  },
  {
    icon: FileText,
    title: 'Documentos em Dia',
    description: 'Controle de validade e alertas de certidoes',
  },
  {
    icon: Calculator,
    title: 'Calcular Margem',
    description: 'Planilha de custo e simulacao de lance',
  },
  {
    icon: Bell,
    title: 'Alertas Inteligentes',
    description: 'Notificacoes de prazos, pregoes e vencimentos',
  },
]

const TOUR_STEPS = [
  {
    title: 'Dashboard',
    description: 'Visao geral de tudo: editais, documentos, pregoes e alertas em um so lugar.',
    icon: Target,
  },
  {
    title: 'Pipeline de Editais',
    description: 'Editais organizados por status: novo, em analise, GO, NO-GO. Arraste e organize.',
    icon: FileText,
  },
  {
    title: 'Repositorio de Documentos',
    description: 'Upload e controle de validade de todos os documentos de habilitacao.',
    icon: FileText,
  },
  {
    title: 'Calculadora de Margem',
    description: 'Monte sua planilha de custo e simule precos com margem segura.',
    icon: Calculator,
  },
  {
    title: 'Central de Ajuda',
    description: 'Guias de documentos, templates e dicas para cada etapa da licitacao.',
    icon: HelpCircle,
  },
]

export function WelcomeScreen({ userName, onStartOnboarding, onSkip }: WelcomeScreenProps) {
  const [showTour, setShowTour] = useState(false)
  const [tourStep, setTourStep] = useState(0)

  if (showTour) {
    const current = TOUR_STEPS[tourStep]
    const Icon = current.icon
    const isLast = tourStep === TOUR_STEPS.length - 1

    return (
      <div className="mx-auto max-w-lg space-y-6 text-center">
        <div className="flex justify-center gap-1">
          {TOUR_STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-8 rounded-full ${i <= tourStep ? 'bg-[var(--primary)]' : 'bg-[var(--muted)]'}`}
            />
          ))}
        </div>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-8 space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--primary)]/10">
            <Icon className="h-8 w-8 text-[var(--primary)]" />
          </div>
          <h2 className="text-xl font-bold text-[var(--foreground)]">{current.title}</h2>
          <p className="text-sm text-[var(--muted-foreground)]">{current.description}</p>
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={onSkip}
            className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
          >
            Pular tour
          </button>
          <button
            onClick={() => {
              if (isLast) {
                onStartOnboarding()
              } else {
                setTourStep((s) => s + 1)
              }
            }}
            className="flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] hover:opacity-90"
          >
            {isLast ? 'Configurar minha conta' : 'Proximo'}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg space-y-6 text-center">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">
          {userName ? `Bem-vindo, ${userName}!` : 'Bem-vindo ao LicitaFlow!'}
        </h1>
        <p className="text-sm text-[var(--muted-foreground)]">
          Sua plataforma completa para participar de licitacoes publicas de cesta basica.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {FEATURES.map((feature) => {
          const Icon = feature.icon
          return (
            <div
              key={feature.title}
              className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 text-left space-y-2"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--muted)]">
                <Icon className="h-5 w-5 text-[var(--primary)]" />
              </div>
              <h3 className="text-sm font-semibold text-[var(--foreground)]">{feature.title}</h3>
              <p className="text-xs text-[var(--muted-foreground)]">{feature.description}</p>
            </div>
          )
        })}
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={onStartOnboarding}
          className="flex items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-6 py-3 text-sm font-medium text-[var(--primary-foreground)] hover:opacity-90"
        >
          Configurar minha conta
          <ArrowRight className="h-4 w-4" />
        </button>
        <button
          onClick={() => setShowTour(true)}
          className="text-sm text-[var(--primary)] hover:underline"
        >
          Fazer um tour primeiro
        </button>
        <button
          onClick={onSkip}
          className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
        >
          Pular, configurar depois
        </button>
      </div>
    </div>
  )
}
