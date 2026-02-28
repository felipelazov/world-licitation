# squad-product

> Squad de Produto de elite com 4 especialistas de classe mundial para levar produtos da visao ate retencao.

## Visao Geral

O squad-product e o centro de gravidade de produto no World OS. Cobre todo o ciclo de vida do produto — da visao estrategica ate retencao por design — com frameworks comprovados dos maiores nomes mundiais em product management, positioning e behavioral design.

**Pipeline:** Visao define → Discovery valida → Positioning comunica → Retention mantem

## Agentes

| Agente | Role | Tier | Frameworks Core |
|--------|------|------|-----------------|
| **Marty Cagan** | AI Head de Produto (Chief) | Orchestrator | Empowered Teams, Product Vision & Strategy, Product Discovery, Product Operating Model |
| **Melissa Perri** | Product Manager | 1 | Product Kata, Build Trap, Opportunity Solution Tree, Outcome-Based Roadmaps |
| **April Dunford** | Positioning & Content Creator | 1 | 5-Component Positioning Canvas, Category Design, Sales Pitch, Messaging Toolkit |
| **Nir Eyal** | CS / Retencao (Product-side) | 1 | Hook Model, Manipulation Matrix, Habit Zone, Engagement Zones, Indistractable |

### Ativacao

```
/squad-product:agents:marty-cagan      # Chief — ponto de entrada principal
/squad-product:agents:melissa-perri    # PM — discovery, roadmap, priorizacao
/squad-product:agents:april-dunford    # Positioning — canvas, pitch, narrativa
/squad-product:agents:nir-eyal         # Retencao — hooks, habitos, engagement
```

## Tasks (14)

### Marty Cagan (Chief) — Estrategia

| Task | Descricao | Output |
|------|-----------|--------|
| `product-review` | Product review session (5 dimensoes) | Review completo + decisoes + proximos passos |
| `vision-alignment` | Alinhamento de product vision | Vision atualizada + alinhamento com estrategia |

### Melissa Perri (PM) — Discovery & Roadmap

| Task | Descricao | Output |
|------|-----------|--------|
| `discovery` | Sessao de discovery (Product Kata) | Evidencias + hipoteses validadas |
| `opportunity-mapping` | Opportunity Solution Tree | OST + recomendacoes priorizadas |
| `roadmap` | Outcome-based roadmap (Now/Next/Later) | Roadmap trimestral |
| `prioritization` | Stack ranking por impacto | Backlog priorizado + justificativa |

### April Dunford (Positioning) — Narrativa

| Task | Descricao | Output |
|------|-----------|--------|
| `positioning` | Positioning canvas (5 componentes) | Canvas completo validado |
| `category-design` | Definicao de market category | Categoria + narrativa |
| `sales-pitch` | Sales pitch estruturado | Pitch: Setup→Insight→Alternatives→Value→Proof |
| `launch-narrative` | Narrativa de lancamento | Key messages por audiencia |

### Nir Eyal (Retencao) — Engagement

| Task | Descricao | Output |
|------|-----------|--------|
| `hook-analysis` | Mapeamento do Hook Model | 4 fases mapeadas + elo fraco |
| `habit-design` | Engenharia de habit loop | Loop projetado + metricas |
| `engagement-metrics` | Framework de metricas | DAU/MAU, retention curves, zones |
| `churn-diagnosis` | Diagnostico de churn product-side | Root cause + redesign de hooks |

## Templates

| Template | Descricao |
|----------|-----------|
| `product-vision-doc.md` | Documento de visao de produto |
| `positioning-canvas.md` | Canvas de positioning (5 componentes) |
| `hook-model-canvas.md` | Canvas do Hook Model (4 fases + ethics) |
| `product-review-report.md` | Report de product review (5 dimensoes) |

## Checklists

| Checklist | Items | Descricao |
|-----------|-------|-----------|
| `product-launch-checklist.md` | ~25 items | Pre/pos lancamento com quality gate |
| `positioning-validation-checklist.md` | 29 items | Validacao de positioning (7 secoes) |
| `retention-health-checklist.md` | 38 items | Saude de retencao (7 secoes) |

## Pipeline Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  VISION &       │    │  DISCOVERY &    │    │  POSITIONING &  │    │  RETENTION &    │
│  STRATEGY       │───→│  ROADMAP        │───→│  NARRATIVE      │───→│  ENGAGEMENT     │
│                 │    │                 │    │                 │    │                 │
│  Marty Cagan    │    │  Melissa Perri  │    │  April Dunford  │    │  Nir Eyal       │
│  (Chief)        │    │  (PM)           │    │  (Positioning)  │    │  (Retention)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘
        │                      │                      │                      │
   Vision doc            Outcome roadmap         Sales pitch           Hook model
   OKRs                  OST                     Key messages          Engagement zones
   Strategy              Priorizacao             Category              Metricas
```

## Cross-Squad Handoffs

| De | Para | Trigger |
|----|------|---------|
| squad-advisor | Marty Cagan | Decisao estrategica que impacta produto |
| squad-sales | Melissa Perri | Feedback de objecoes recorrentes |
| April Dunford | squad-marketing | Posicionamento definido para campanhas |
| April Dunford | squad-content-distillery | Narrativa core para atomizar |
| April Dunford | squad-sales | Sales pitch estruturado |
| Nir Eyal | squad-customer-success | Metricas de retencao product-side |
| squad-customer-success | Nir Eyal | Churn data para analise product-side |
| Melissa Perri | squad-ops | Processos para operacionalizar |

## Pattern Library

- **Prefix:** PD
- **Formato:** `PD-{CATEGORY}-{NUMBER}`
- **Categorias:** VS (Vision & Strategy), DI (Discovery & Roadmap), PO (Positioning), RT (Retention), QG (Quality Gate)

## Estrutura de Arquivos

```
squads/squad-product/
├── config.yaml
├── README.md
├── agents/
│   ├── marty-cagan.md      (1.202 linhas — Chief)
│   ├── melissa-perri.md    (1.407 linhas — PM)
│   ├── april-dunford.md    (1.494 linhas — Positioning)
│   └── nir-eyal.md         (1.378 linhas — Retention)
├── tasks/
│   ├── product-review.md
│   ├── vision-alignment.md
│   ├── discovery.md
│   ├── opportunity-mapping.md
│   ├── roadmap.md
│   ├── prioritization.md
│   ├── positioning.md
│   ├── category-design.md
│   ├── sales-pitch.md
│   ├── launch-narrative.md
│   ├── hook-analysis.md
│   ├── habit-design.md
│   ├── engagement-metrics.md
│   └── churn-diagnosis.md
├── templates/
│   ├── product-vision-doc.md
│   ├── positioning-canvas.md
│   ├── hook-model-canvas.md
│   └── product-review-report.md
├── checklists/
│   ├── product-launch-checklist.md
│   ├── positioning-validation-checklist.md
│   └── retention-health-checklist.md
└── data/
```

## Uso Rapido

1. **Ativar o Chief:** `/squad-product:agents:marty-cagan`
2. **Ele roteia** para o especialista correto baseado na necessidade
3. **Ou ative diretamente** o especialista se souber quem precisa

**Comandos do Chief:**
- `*review` — Product review completo
- `*vision` — Alinhar visao de produto
- `*route` — Rotear para especialista
- `*status` — Dashboard do squad
- `*board` — Reuniao com todos
