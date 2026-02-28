# Squad Franchise — Consultoria Completa em Franquias

Squad especializado no ciclo completo de franquias: avaliacao de franqueabilidade, compra de franquia, sistematizacao de operacoes, gestao de rede, vendas, marketing e performance de franqueados. 8 mentes elite + 1 orquestrador, contexto brasileiro (Lei 13.966/2019, ABF).

## Estrutura

```
squad-franchise/
├── agents/
│   ├── franchise-chief.md        ← Orquestrador (routing + quality gates)
│   ├── mark-siebert.md           ← Franchise Feasibility Architect (Tier 0)
│   ├── rick-bisio.md             ← Franchise Buying Coach (Tier 0)
│   ├── michael-gerber.md         ← Operations Systemization (Tier 1)
│   ├── greg-nathan.md            ← Franchise Relationship Psychologist (Tier 1)
│   ├── marcelo-cherto.md         ← Ciclo de Vida de Franquias Brasil (Tier 1)
│   ├── joe-mathews.md            ← Franchise Sales Strategist (Tier 2)
│   ├── denis-santini.md          ← Marketing de Redes de Franquias (Tier 2)
│   └── scott-greenberg.md        ← Franchisee Performance Coach (Tier 2)
├── tasks/
│   ├── evaluate-franchisability.md    ← 12 Criterios (45-60 min)
│   ├── franchise-buyer-assessment.md  ← 6 fases de avaliacao (60-90 min)
│   ├── systemize-operations.md        ← E-Myth Prototype (90-120 min)
│   ├── diagnose-relationship.md       ← E-Factor 6 Estagios (45-60 min)
│   ├── format-franchise-brazil.md     ← COF + Lei 13.966 (2-3h)
│   ├── franchise-sales-strategy.md    ← KASH Model (60-90 min)
│   ├── franchise-marketing-plan.md    ← 5 Pilares + 7 Franquehabitos (60-90 min)
│   └── franchisee-performance-audit.md ← Wealthy Franchisee (45-60 min)
├── checklists/
│   ├── franchisability-checklist.md       ← 9 categorias, 200 pontos
│   ├── franchise-compliance-checklist.md  ← 41 itens, Lei 13.966/2019
│   ├── franchisee-onboarding-checklist.md ← 43 itens, 7 estagios
│   └── operations-manual-checklist.md     ← 45 itens, 8 secoes
├── templates/
│   ├── franchisability-report-tmpl.md     ← Relatorio de viabilidade
│   ├── expansion-plan-tmpl.md             ← Plano de expansao 3 anos
│   ├── operations-manual-tmpl.md          ← Manual de operacoes (3 partes)
│   └── franchisee-scorecard-tmpl.md       ← Scorecard de performance
├── workflows/
│   ├── franchise-development-pipeline.yaml   ← Franquear negocio (6 fases)
│   ├── franchise-evaluation-pipeline.yaml    ← Comprar franquia (5 fases)
│   └── franchise-operations-setup.yaml       ← Melhorar rede existente (6 fases)
└── config.yaml
```

## Hierarquia de Agentes

```
TIER 0 — Diagnostico (avaliar ANTES de agir)
├── Mark Siebert     → Franqueabilidade (Multiplier Model, 12 Criterios)
└── Rick Bisio       → Compra de Franquia (Educated Franchisee Method)

TIER 1 — Execucao Master
├── Michael Gerber   → Sistematizacao (E-Myth Franchise Prototype)
├── Greg Nathan      → Relacionamento (E-Factor 6-Stage Model)
└── Marcelo Cherto   → Brasil (Lei 13.966/2019, COF, ABF)

TIER 2 — Especialistas de Suporte
├── Joe Mathews      → Vendas de Franquias (KASH Model)
├── Denis Santini    → Marketing de Rede (5 Pilares + 7 Franquehabitos)
└── Scott Greenberg  → Performance do Franqueado (Wealthy Franchisee)
```

## Principio Fundamental

**Diagnostico ANTES de execucao.** Tier 0 avalia viabilidade antes que qualquer Tier 1 ou 2 entre em acao. Ninguem sistematiza, formata ou vende sem que o negocio tenha passado pelo crivo dos 12 criterios de Siebert ou pela avaliacao de Bisio.

## Pipelines

### 1. Franquear um Negocio (Development Pipeline)
```
Siebert (avalia) → Gerber (sistematiza) → Cherto (formata BR) → Mathews (vende) → Santini (marketing) → Chief (entrega)
```

### 2. Comprar uma Franquia (Evaluation Pipeline)
```
Bisio (autoavaliacao) → Bisio (FDD + research) → Nathan (saude da rede) → Bisio (validacao) → Chief (decisao)
```

### 3. Melhorar Rede Existente (Operations Setup)
```
Gerber (diagnostico) → Gerber (prototype) → Nathan (relacionamento) → Greenberg (performance) → Santini (marketing) → Chief (entrega)
```

## Quality Gates

| Gate | Descricao | Tipo | Agente |
|------|-----------|------|--------|
| QG-FR-001 | Franchisability Assessment — 12 criterios >= 36/60 | Bloqueante | Mark Siebert |
| QG-FR-002 | Operations Systemized — Prototype + IQO + 7 Centers | Bloqueante | Michael Gerber |
| QG-FR-003 | Legal/COF Compliance — Lei 13.966/2019 completa | Bloqueante | Marcelo Cherto |
| QG-FR-004 | Network Management Ready — Framework relacional | Consultivo | Greg Nathan |

## Roteamento do Chief

| Demanda | Agente | Framework |
|---------|--------|-----------|
| "Quero franquear meu negocio" | @mark-siebert | Multiplier Model |
| "Quero comprar uma franquia" | @rick-bisio | Educated Franchisee |
| "Sistematizar operacoes" | @michael-gerber | E-Myth Prototype |
| "Problemas com franqueados" | @greg-nathan | E-Factor 6-Stage |
| "Franquia no Brasil / COF / ABF" | @marcelo-cherto | Lei 13.966/2019 |
| "Vender mais franquias" | @joe-mathews | KASH Model |
| "Marketing da rede" | @denis-santini | 5 Pilares |
| "Franqueado nao performa" | @scott-greenberg | Wealthy Franchisee |

## Checklists (Scoring)

| Checklist | Itens | Pontuacao Total | Aprovado |
|-----------|-------|-----------------|----------|
| Franchisability | 9 categorias | 200 pts | >= 170 |
| Compliance (Lei 13.966) | 41 itens | 41 pts | >= 37 |
| Onboarding Franqueado | 43 itens | 43 pts | >= 39 |
| Manual de Operacoes | 45 itens | 45 pts | >= 40 |

## Contexto Brasileiro

- **Lei 13.966/2019** — Compliance obrigatoria em todo pipeline
- **COF (Circular de Oferta de Franquia)** — 12 elementos obrigatorios
- **ABF (Associacao Brasileira de Franchising)** — Padroes de mercado
- **Diversidade regional** — Premissa de pais continental
- **7 Pecados Capitais do Franchising** — Framework de prevencao (Marcelo Cherto)

## Frameworks por Agente

| Agente | Frameworks | Referencia |
|--------|-----------|------------|
| Mark Siebert | Multiplier Model, 12 Criteria, Four Pillars, Six Costly Mistakes | "Franchise Your Business" |
| Rick Bisio | Educated Franchisee, 7 Entrepreneurial Traits, 6 Validation Types | "The Educated Franchisee" |
| Michael Gerber | E-Myth, Franchise Prototype, IQO Cycle, 3 Personalities, 7 Centers | "The E-Myth Revisited" |
| Greg Nathan | E-Factor 6-Stage, ACE Survey, Mood Monitor, 130+ Strategies | "The Franchise E-Factor" |
| Marcelo Cherto | 3 Pilares (Formatacao/Expansao/Gestao), 7 Pecados, COF | 40+ anos, 5000+ projetos |
| Joe Mathews | KASH Model, Tipping Point, Franchisee Lifecycle | "Street Smart Franchising" |
| Denis Santini | 5 Pilares, 7 Franquehabitos, MEC Model, Opening Marketing | 1a agencia de mktg para franquias BR |
| Scott Greenberg | Wealthy Franchisee, 30-Second Leadership, HEMS Model | "The Wealthy Franchisee" |

## Sinapses

| Decisao | Impacta |
|---------|---------|
| Modelo de franquia definido | squad-advisor (posicionamento, monetizacao) |
| Perfil de franqueado ideal | squad-zona-genialidade (alinhamento genius zone) |
| Operacoes sistematizadas | squad-ops (automacao, processos) |
| Identidade visual da rede | squad-design (brand consistency) |

## Ativacao

```
/squad-franchise:agents:franchise-chief    ← Orquestrador (routing)
/squad-franchise:agents:mark-siebert       ← Avaliacao de franqueabilidade
/squad-franchise:agents:rick-bisio         ← Compra de franquia
/squad-franchise:agents:michael-gerber     ← Sistematizacao
/squad-franchise:agents:greg-nathan        ← Relacionamento franqueador-franqueado
/squad-franchise:agents:marcelo-cherto     ← Contexto brasileiro
/squad-franchise:agents:joe-mathews        ← Vendas de franquias
/squad-franchise:agents:denis-santini      ← Marketing de rede
/squad-franchise:agents:scott-greenberg    ← Performance do franqueado
```
