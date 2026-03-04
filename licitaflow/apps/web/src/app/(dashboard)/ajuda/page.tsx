'use client'

import Link from 'next/link'
import { FileText, FileDown, ExternalLink, BookOpen } from 'lucide-react'

const HELP_SECTIONS = [
  {
    title: 'Guia de Documentos',
    description: 'Tudo sobre os 11 documentos de habilitacao: como conseguir, custo, prazo e validade.',
    href: '/ajuda/documentos',
    icon: FileText,
  },
  {
    title: 'Templates para Licitacao',
    description: 'Modelos prontos de proposta comercial, declaracoes, planilhas e credenciamento.',
    href: '/ajuda/templates',
    icon: FileDown,
  },
]

const QUICK_LINKS = [
  { label: 'Compras.gov.br', url: 'https://www.gov.br/compras' },
  { label: 'SICAF', url: 'https://www.gov.br/compras/pt-br/acesso-a-informacao/perguntas-frequentes/sicaf' },
  { label: 'CND Federal', url: 'https://solucoes.receita.fazenda.gov.br/Servicos/certidaointernet/PJ/Emitir' },
  { label: 'CNDT (TST)', url: 'https://www.tst.jus.br/certidao' },
  { label: 'CRF/FGTS', url: 'https://consulta-crf.caixa.gov.br/consultacrf/pages/consultaEmpregador.jsf' },
  { label: 'Lei 14.133/2021', url: 'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm' },
]

export default function AjudaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Central de Ajuda</h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Guias, templates e links uteis para participar de licitacoes
        </p>
      </div>

      {/* Secoes principais */}
      <div className="grid gap-4 sm:grid-cols-2">
        {HELP_SECTIONS.map((section) => {
          const Icon = section.icon
          return (
            <Link
              key={section.href}
              href={section.href}
              className="group rounded-lg border border-[var(--border)] bg-[var(--card)] p-5 transition-colors hover:border-[var(--primary)]"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--muted)] group-hover:bg-[var(--primary)]/10">
                  <Icon className="h-5 w-5 text-[var(--primary)]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--foreground)]">{section.title}</h3>
                  <p className="mt-0.5 text-xs text-[var(--muted-foreground)]">{section.description}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Links rapidos */}
      <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-5 space-y-3">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-[var(--primary)]" />
          <h2 className="text-sm font-semibold text-[var(--foreground)]">Links Uteis</h2>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {QUICK_LINKS.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--muted)]"
            >
              <ExternalLink className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
