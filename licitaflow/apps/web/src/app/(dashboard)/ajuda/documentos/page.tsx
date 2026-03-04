'use client'

import { useState } from 'react'
import { Search, ExternalLink, FileText } from 'lucide-react'

const DOCUMENT_GUIDES = [
  {
    id: 'alvara-sanitario',
    name: 'Alvará Sanitário (VISA)',
    description: 'Licença da Vigilância Sanitária para manipulação e comercialização de alimentos.',
    howToGet: 'Solicitar na Vigilância Sanitária do município. Requer vistoria do local.',
    cost: 'Varia por município (R$ 100-500)',
    timeline: '15-60 dias',
    validity: '1 ano',
    link: 'https://www.gov.br/anvisa',
  },
  {
    id: 'contrato-social',
    name: 'Contrato Social / Última Alteração',
    description: 'Documento constitutivo da empresa registrado na Junta Comercial.',
    howToGet: 'Obtido na Junta Comercial do estado. Alterações devem ser registradas.',
    cost: 'R$ 50-200 por alteração',
    timeline: '5-15 dias',
    validity: 'Indeterminada',
    link: 'https://www.gov.br/economia/pt-br/assuntos/drei',
  },
  {
    id: 'cnd-federal',
    name: 'CND Federal (Receita Federal)',
    description: 'Certidão negativa de débitos relativos a tributos federais e dívida ativa da União.',
    howToGet: 'Emitida online no site da Receita Federal. Gratuita.',
    cost: 'Gratuita',
    timeline: 'Imediata (se regular)',
    validity: '180 dias',
    link: 'https://solucoes.receita.fazenda.gov.br/Servicos/certidaointernet/PJ/Emitir',
  },
  {
    id: 'cnd-estadual',
    name: 'CND Estadual (Sefaz)',
    description: 'Certidão negativa de débitos estaduais (ICMS).',
    howToGet: 'Emitida no site da Secretaria da Fazenda do estado.',
    cost: 'Gratuita',
    timeline: 'Imediata a 5 dias',
    validity: '90-180 dias (varia por estado)',
    link: '',
  },
  {
    id: 'cnd-municipal',
    name: 'CND Municipal (ISS)',
    description: 'Certidão negativa de débitos municipais.',
    howToGet: 'Emitida no site da prefeitura ou presencialmente.',
    cost: 'Gratuita',
    timeline: 'Imediata a 10 dias',
    validity: '90-180 dias',
    link: '',
  },
  {
    id: 'cnd-trabalhista',
    name: 'CNDT (Certidão de Débitos Trabalhistas)',
    description: 'Certidão negativa de débitos trabalhistas emitida pelo TST.',
    howToGet: 'Emitida online no site do TST. Gratuita.',
    cost: 'Gratuita',
    timeline: 'Imediata',
    validity: '180 dias',
    link: 'https://www.tst.jus.br/certidao',
  },
  {
    id: 'crf-fgts',
    name: 'CRF/FGTS',
    description: 'Certificado de regularidade do FGTS junto à Caixa Econômica Federal.',
    howToGet: 'Emitido no site da Caixa. Requer regularidade nos depósitos.',
    cost: 'Gratuito',
    timeline: 'Imediato (se regular)',
    validity: '30 dias',
    link: 'https://consulta-crf.caixa.gov.br/consultacrf/pages/consultaEmpregador.jsf',
  },
  {
    id: 'balanco-patrimonial',
    name: 'Balanço Patrimonial',
    description: 'Demonstrativo financeiro do último exercício social.',
    howToGet: 'Elaborado pelo contador da empresa. Deve ser registrado na Junta Comercial.',
    cost: 'Depende do contador',
    timeline: 'Até 30 de abril do ano seguinte',
    validity: 'Exercício vigente',
    link: '',
  },
  {
    id: 'atestado-capacidade',
    name: 'Atestado de Capacidade Técnica',
    description: 'Comprova experiência prévia no fornecimento de produtos similares.',
    howToGet: 'Solicitar a clientes anteriores (empresas ou órgãos públicos).',
    cost: 'Gratuito',
    timeline: '5-15 dias',
    validity: 'Indeterminada',
    link: '',
  },
  {
    id: 'sicaf',
    name: 'Cadastro SICAF',
    description: 'Sistema de Cadastramento Unificado de Fornecedores do Governo Federal.',
    howToGet: 'Cadastro no Comprasnet com certificado digital. Requer documentos base.',
    cost: 'Gratuito',
    timeline: '1-5 dias úteis',
    validity: '1 ano (renovação)',
    link: 'https://www.gov.br/compras/pt-br/acesso-a-informacao/perguntas-frequentes/sicaf',
  },
  {
    id: 'certificado-digital',
    name: 'Certificado Digital (e-CNPJ)',
    description: 'Identidade digital da empresa para acesso aos portais de compras.',
    howToGet: 'Adquirir em autoridade certificadora credenciada (ICP-Brasil).',
    cost: 'R$ 150-500 (A1) / R$ 300-700 (A3)',
    timeline: '1-3 dias',
    validity: '1-3 anos',
    link: 'https://www.gov.br/iti/pt-br',
  },
]

export default function GuiaDocumentosPage() {
  const [search, setSearch] = useState('')

  const filtered = DOCUMENT_GUIDES.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase()) ||
    doc.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Guia de Documentos</h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Tudo que você precisa saber sobre os 11 documentos de habilitação
        </p>
      </div>

      {/* Busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar documento..."
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] py-2 pl-10 pr-3 text-sm outline-none focus:border-[var(--primary)]"
        />
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {filtered.map((doc) => (
          <div key={doc.id} className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--muted)]">
                <FileText className="h-5 w-5 text-[var(--muted-foreground)]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-[var(--foreground)]">{doc.name}</h3>
                  {doc.link && (
                    <a href={doc.link} target="_blank" rel="noopener noreferrer" className="text-[var(--primary)]">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
                <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{doc.description}</p>

                <div className="mt-2 grid gap-2 sm:grid-cols-2 text-xs">
                  <div>
                    <span className="font-medium text-[var(--foreground)]">Como conseguir:</span>
                    <p className="text-[var(--muted-foreground)]">{doc.howToGet}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <span className="font-medium text-[var(--foreground)]">Custo</span>
                      <p className="text-[var(--muted-foreground)]">{doc.cost}</p>
                    </div>
                    <div>
                      <span className="font-medium text-[var(--foreground)]">Prazo</span>
                      <p className="text-[var(--muted-foreground)]">{doc.timeline}</p>
                    </div>
                    <div>
                      <span className="font-medium text-[var(--foreground)]">Validade</span>
                      <p className="text-[var(--muted-foreground)]">{doc.validity}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
