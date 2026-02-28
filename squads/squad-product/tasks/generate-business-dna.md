# generate-business-dna

> Task do Marty Cagan (PM) — Gerar Business DNA Blueprint

**Task ID:** generate-business-dna
**Owner:** marty-cagan
**Squad:** squad-product
**Pattern:** PD-DNA-001

---

## Task Anatomy

| Campo | Valor |
|-------|-------|
| **Input** | project-state.yaml com decisoes dos 3 advisors (Sinek, Hormozi, Jobs) |
| **Output** | Business DNA Blueprint + squad briefs + scorecard + PRD bridge (condicional) |
| **Pre-conditions** | Fases proposito, produto e visao-produto concluidas (ou ao menos com decisoes registradas) |
| **Trigger** | Fase business-dna iniciada pelo Maestro, ou comando `*dna` |

---

## Overview

O Business DNA Blueprint consolida TODAS as decisoes dos advisors em um unico documento estrategico. Elimina interpretacao e ambiguidade para squads downstream. O PM (Marty Cagan) atua como consolidador — NAO como inventor. Constitutional Gate: nada no DNA que nao rastreie a decisao de advisor.

---

## Action Items

### Step 1: Ler Estado Completo

- Ler `project-state.yaml` completo
- Extrair todas as `decisoes[]` das fases proposito, produto e visao-produto
- Extrair secao `negocio` (campos preenchidos pelos advisors)
- Identificar `projeto.tipo` (negocio | app | hibrido)
- Listar squads ativos no projeto (status != ignorado em todas fases)

### Step 2: Validar Pre-Requisitos

Verificar que existem dados minimos:

| Pre-requisito | Campo no state | Origem |
|---------------|---------------|--------|
| WHY definido | `negocio.why` | Sinek |
| Oferta definida | `negocio.oferta_principal` | Hormozi |
| Features definidas | `negocio.features_essenciais` | Jobs |

Se algum pre-requisito estiver vazio:
- Informar usuario quais fases precisam ser concluidas primeiro
- NAO gerar DNA parcial — recomendar voltar a fase pendente

### Step 3: Gerar DNA Usando Template

- Carregar template `squads/squad-product/templates/business-dna-blueprint-tmpl.md`
- Preencher cada secao com dados do state:
  1. **Narrativa Estrategica** — WHY/HOW/WHAT como storytelling (nao bullets)
  2. **Oferta Irrecusavel** — Grand Slam Offer formatada
  3. **Produto Essencial** — Features in/out com rationale
  4. **Anti-Briefing** — O que o negocio NAO e (>= 5 itens, derivados das decisoes)
  5. **Mapa de Decisoes** — Tabela advisor → decisao → impacto → squads
- Salvar em `deliverables/business-dna/business-dna-blueprint.md`

### Step 4: Gerar Squad Briefs

Para cada squad com fases ativas no projeto:
- Extrair decisoes que impactam aquele squad
- Gerar brief acionavel com:
  - Contexto (o que foi decidido que afeta este squad)
  - O que fazer (acoes concretas derivadas das decisoes)
  - O que NAO fazer (derivado do anti-briefing)
  - KPIs relevantes para este squad
- Salvar em `deliverables/business-dna/squad-briefs/{squad-id}-brief.md`

### Step 5: Gerar Scorecard

- Compilar KPIs de todas as decisoes
- Para cada KPI:
  - Definir baseline (estado atual, pode ser zero se projeto novo)
  - Definir target 90 dias (realista, baseado nas decisoes)
  - Atribuir squad responsavel
- Salvar em `deliverables/business-dna/scorecard.md`

### Step 6: PRD Bridge (Condicional)

**Executar APENAS se `projeto.tipo` = `app` ou `hibrido`.**

Mapear decisoes de negocio para requisitos tecnicos:
- Features essenciais → Functional Requirements (FR-001, FR-002, ...)
- Metricas do scorecard → Non-Functional Requirements (NFR-001, NFR-002, ...)
- Publico-alvo → User Stories ("Como {persona}, eu quero {acao} para {beneficio}")
- Pricing/modelo → Constraints (CON-001, CON-002, ...)

Cada requisito DEVE referenciar a decisao de advisor de origem.
Salvar em `deliverables/business-dna/prd-bridge.md`.

Se `projeto.tipo` = `negocio`, pular este step e registrar `prd_status: "n/a"` no state.

### Step 7: Validacao

Executar auto-avaliacao usando a secao 8 do template:
- Verificar cada secao: completa e rastreavel?
- Score minimo: 6/8 secoes OK
- Se < 6/8: identificar secoes fracas e iterar

Sugerir execucao do checklist formal: `*dna-validate`

### Step 8: Registrar no Estado

Atualizar `project-state.yaml`:

```yaml
negocio:
  business_dna_status: "concluido"
  business_dna_score: "{score da validacao}"
  business_dna_date: "{YYYY-MM-DD}"
  prd_status: "{gerado | n/a}"

progresso:
  fases:
    - id: "business-dna"
      status: "concluido"
```

Criar sinapses para cada squad que recebeu brief:

```yaml
sinapses:
  - id: "SIN-{sequencial}"
    de: "squad-product"
    para: "{squad-destino}"
    decisao: "Business DNA Blueprint concluido"
    contexto: "Brief de squad gerado com direcao estrategica consolidada"
    acao: "Ler brief em deliverables/business-dna/squad-briefs/{squad-id}-brief.md antes de iniciar trabalho"
    data: "{YYYY-MM-DD}"
    status: "pendente"
```

---

## Acceptance Criteria

1. Blueprint completo com 8 secoes (7 se tipo=negocio)
2. Cada afirmacao no DNA rastreia a decisao de advisor (Constitutional Gate)
3. Briefs gerados para todos os squads ativos
4. Scorecard com KPIs, baseline e target 90d
5. PRD bridge gerado se tipo=app/hibrido
6. State atualizado com status, score e data
7. Sinapses criadas para squads downstream

---

## Veto Conditions

- NAO inventar decisoes que nenhum advisor tomou
- NAO gerar DNA com pre-requisitos ausentes (melhor voltar a fase pendente)
- NAO criar briefs genericos — cada brief deve ser especifico para o squad
- NAO pular a secao de anti-briefing — e tao importante quanto o briefing

---

## Handoff

- DNA completo → squads downstream recebem sinapses com brief
- DNA com PRD bridge → squad-dev (se existir) recebe base para implementacao
- DNA validado → Maestro sugere `*dna-validate` e depois avanca para identidade
