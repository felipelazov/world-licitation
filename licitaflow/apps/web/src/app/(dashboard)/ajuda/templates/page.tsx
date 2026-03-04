'use client'

import { useState } from 'react'
import { FileDown, Copy, Check, Search } from 'lucide-react'

const TEMPLATES = [
  {
    id: 'proposta-comercial',
    name: 'Proposta Comercial',
    description: 'Modelo de proposta de precos para pregao eletronico, com campos para itens, quantidades e valores unitarios.',
    category: 'proposta',
    fields: ['Razao Social', 'CNPJ', 'Objeto', 'Itens (descricao, qtd, unidade, valor)', 'Validade da proposta', 'Condicoes de pagamento'],
  },
  {
    id: 'declaracao-me-epp',
    name: 'Declaracao ME/EPP',
    description: 'Declaracao de enquadramento como Microempresa ou Empresa de Pequeno Porte (Lei Complementar 123/2006).',
    category: 'declaracao',
    fields: ['Razao Social', 'CNPJ', 'Nome do representante', 'CPF do representante'],
  },
  {
    id: 'declaracao-inexistencia-fato-impeditivo',
    name: 'Declaracao de Inexistencia de Fato Impeditivo',
    description: 'Declaracao de que nao existem fatos impeditivos para habilitacao conforme legislacao vigente.',
    category: 'declaracao',
    fields: ['Razao Social', 'CNPJ', 'Nome do representante'],
  },
  {
    id: 'declaracao-menor',
    name: 'Declaracao de Nao Emprego de Menor',
    description: 'Declaracao de que nao emprega menor de 18 anos em trabalho noturno, perigoso ou insalubre (Art. 7, XXXIII, CF).',
    category: 'declaracao',
    fields: ['Razao Social', 'CNPJ', 'Nome do representante'],
  },
  {
    id: 'declaracao-elaboracao-independente',
    name: 'Declaracao de Elaboracao Independente',
    description: 'Declaracao de que a proposta foi elaborada de maneira independente, sem conluio com concorrentes.',
    category: 'declaracao',
    fields: ['Razao Social', 'CNPJ', 'Numero do pregao'],
  },
  {
    id: 'planilha-custo-cesta',
    name: 'Planilha de Custo — Cesta Basica',
    description: 'Modelo de planilha de formacao de preco para cesta basica com 17 itens padrao.',
    category: 'planilha',
    fields: ['17 itens (arroz, feijao, acucar, etc.)', 'Custo unitario', 'Embalagem', 'Mao de obra', 'Frete', 'Impostos'],
  },
  {
    id: 'carta-credenciamento',
    name: 'Carta de Credenciamento',
    description: 'Modelo de credenciamento de representante para participar de sessao publica de pregao.',
    category: 'credenciamento',
    fields: ['Razao Social', 'CNPJ', 'Nome do representante', 'CPF', 'RG', 'Poderes conferidos'],
  },
  {
    id: 'recurso-administrativo',
    name: 'Modelo de Recurso Administrativo',
    description: 'Modelo base para interposicao de recurso em licitacao, com estrutura argumentativa.',
    category: 'recurso',
    fields: ['Numero do pregao', 'Orgao', 'Fatos', 'Fundamentacao juridica', 'Pedido'],
  },
]

const CATEGORIES = [
  { id: 'todos', label: 'Todos' },
  { id: 'proposta', label: 'Propostas' },
  { id: 'declaracao', label: 'Declaracoes' },
  { id: 'planilha', label: 'Planilhas' },
  { id: 'credenciamento', label: 'Credenciamento' },
  { id: 'recurso', label: 'Recursos' },
]

export default function TemplatesPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('todos')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const filtered = TEMPLATES.filter((t) => {
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'todos' || t.category === category
    return matchSearch && matchCategory
  })

  function handleCopy(template: (typeof TEMPLATES)[0]) {
    const text = `${template.name}\n\nCampos:\n${template.fields.map((f) => `- ${f}`).join('\n')}`
    navigator.clipboard.writeText(text)
    setCopiedId(template.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Templates para Licitacao</h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Modelos prontos de documentos usados em pregoes eletronicos
        </p>
      </div>

      {/* Busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar template..."
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] py-2 pl-10 pr-3 text-sm outline-none focus:border-[var(--primary)]"
        />
      </div>

      {/* Categorias */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              category === c.id
                ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                : 'bg-[var(--muted)] text-[var(--muted-foreground)]'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((template) => (
          <div key={template.id} className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-[var(--foreground)]">{template.name}</h3>
              <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{template.description}</p>
            </div>

            <div>
              <p className="text-xs font-medium text-[var(--foreground)] mb-1">Campos:</p>
              <ul className="space-y-0.5">
                {template.fields.map((field) => (
                  <li key={field} className="text-xs text-[var(--muted-foreground)]">
                    • {field}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleCopy(template)}
                className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--foreground)] hover:bg-[var(--muted)]"
              >
                {copiedId === template.id ? (
                  <>
                    <Check className="h-3 w-3 text-green-500" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    Copiar campos
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[var(--border)] py-12 text-center">
          <FileDown className="mb-3 h-10 w-10 text-[var(--muted-foreground)]" />
          <h3 className="font-medium text-[var(--foreground)]">Nenhum template encontrado</h3>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Tente outra busca ou categoria.
          </p>
        </div>
      )}
    </div>
  )
}
