# Squad Customer Success

> Da boas-vindas ao cliente ate prevencao de churn, com framework estrategico dos 7 Pilares.

## Visao Geral

Squad completo de Customer Success com 5 agentes especializados cobrindo todo o ciclo de vida do cliente pos-venda: onboarding, suporte, retencao e estrategia CS.

**Pipeline:**
```
Vendas fecha → Onboarding ativa → Suporte atende → CS/Retencao mantem
```

## Agentes

| Agente | Role | Tier | Dominio |
|--------|------|------|---------|
| **Lincoln Murphy** | AI Head de CS (Chief) | Orchestrator | CS strategy, health monitoring, churn tracking, NPS, routing |
| **Donna Weber** | Onboarding Specialist | Tier 1 | Welcome, setup, first value, handoff to CS |
| **Shep Hyken** | Suporte | Tier 1 | Ticket triage, resolution, escalation, reporting |
| **Joey Coleman** | CS / Retencao | Tier 1 | Health check, engagement, upsell detection, churn prevention |
| **Wayne McCulloch** | CS Strategist | Tier 2 | CS strategy frameworks, journey mapping, segmentation, playbooks |

## Ativacao

```
/squad-customer-success:agents:lincoln-murphy    # Chief — roteia para o agente certo
/squad-customer-success:agents:donna-weber       # Onboarding
/squad-customer-success:agents:shep-hyken        # Suporte
/squad-customer-success:agents:joey-coleman      # Retencao
/squad-customer-success:agents:wayne-mcculloch   # Estrategia CS
```

## Tasks (12)

### Onboarding (Donna Weber)

| Task | Input | Output |
|------|-------|--------|
| `welcome-client` | Cliente fechado (de Vendas) | Boas-vindas + proximos passos enviados |
| `setup-account` | Cliente recebeu welcome | Configuracao feita + materiais enviados |
| `first-value` | Cliente configurado | Primeira vitoria documentada + feedback |
| `handoff` | Cliente ativado | Contexto documentado + CS apresentado |

### Suporte (Shep Hyken)

| Task | Input | Output |
|------|-------|--------|
| `ticket-triage` | Ticket aberto | Classificacao (N1/N2/N3) + prioridade |
| `resolve` | Ticket N1 | Solucao aplicada + documentada |
| `escalate` | Ticket N2/N3 | Encaminhamento + contexto + acompanhamento |
| `report` | Metricas da semana | Relatorios (SLA, satisfacao) + problemas recorrentes |

### CS / Retencao (Joey Coleman)

| Task | Input | Output |
|------|-------|--------|
| `health-check` | Base de clientes | Health score atualizado + riscos identificados |
| `engagement` | Clientes ativos | Contatos proativos + novidades compartilhadas |
| `upsell-detection` | Clientes saudaveis | Oportunidade encaminhada para Vendas (SDR) |
| `churn-prevention` | Cliente em risco | Acao de recuperacao + motivo documentado |

## Quality Gates

| Stage | Gate | Metricas |
|-------|------|----------|
| Onboarding | Cliente ativado + primeira vitoria | time-to-first-value, activation-rate, onboarding-completion |
| Suporte | SLA cumprido + satisfacao >= 4/5 | first-response-time, resolution-time, csat, tickets-per-client |
| CS / Retencao | Health score >= 70 + churn < 5% | health-score, nps, churn-rate, expansion-revenue, ltv |

## Cross-Squad Handoffs

| De | Para | Trigger |
|----|------|---------|
| `squad-sales` | Donna Weber | Cliente fechado |
| Shep Hyken | `squad-ops` | Precisa criar processo |
| Joey Coleman | `squad-sales` | Upsell detectado |

## Estrutura

```
squads/squad-customer-success/
├── config.yaml              # Manifesto do squad
├── README.md                # Este arquivo
├── agents/                  # 5 agentes
│   ├── lincoln-murphy.md    # Chief/Router
│   ├── donna-weber.md       # Onboarding
│   ├── shep-hyken.md        # Suporte
│   ├── joey-coleman.md      # Retencao
│   └── wayne-mcculloch.md   # Estrategia
├── tasks/                   # 12 tasks operacionais
├── templates/               # 4 templates
│   ├── welcome-package.md
│   ├── health-score-report.md
│   ├── weekly-support-report.md
│   └── churn-prevention-playbook.md
└── checklists/              # 3 checklists
    ├── onboarding-checklist.md
    ├── support-quality-checklist.md
    └── retention-health-checklist.md
```

## Pattern Library

Prefixo: `CS`

| Categoria | ID | Descricao |
|-----------|----|-----------|
| Onboarding Patterns | ON | Patterns para onboarding de clientes |
| Support Patterns | SP | Patterns para tickets e resolucao |
| Retention Patterns | RT | Patterns para health monitoring e churn prevention |
| Quality Gate Patterns | QG | Patterns para validacao de qualidade CS |

Formato: `CS-{CATEGORY}-{NUMBER}` (ex: `CS-ON-001`)
