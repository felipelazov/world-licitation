# Squad OPS

Squad de operacoes completo com AI Head de OPS (Pedro Valerio) liderando 4 especialistas — todos Pedro Valerio em roles distintos: Process Mapper, Architect, Automation Architect e QA. O arquiteto da casa: desenha a planta que todos os outros squads seguem. Sem OPS, cada squad inventa suas regras.

## One Mind, Multiple Hats Pattern

Diferente dos outros squads, TODOS os agentes sao Pedro Valerio operando em roles distintos. Compartilham o mesmo Voice DNA ("Show, cara, beleza, ta?") e Thinking DNA ("Impossibilitar Caminhos" + 3 heuristicas), mas cada um tem SCOPE, comandos, ferramentas e quality gates unicos.

## Roster

| Agente | Role | Tier | Pipeline Position | Score |
|--------|------|------|-------------------|-------|
| Pedro Valerio | AI Head de OPS (Chief/Router) | Orchestrator | Router | — |
| Pedro Valerio | Process Mapper | Tier 1 | 1st | >70% |
| Pedro Valerio | Architect | Tier 1 | 2nd | >70% |
| Pedro Valerio | Automation Architect | Tier 1 | 3rd | >70% |
| Pedro Valerio | QA Architect | Tier 2 | 4th (Final) | >70% |

## Pipeline Architecture

```
Demanda entra → OPS Chief roteia
  │
  ├→ Process Mapper DESCOBRE & DESENHA processos
  │   └→ QG >70% ────┐
  │                    │
  ├→ Architect ESTRUTURA sistema & executores  ←──┘
  │   └→ QG >70% ────┐
  │                    │
  ├→ Automation Architect DEFINE tasks & automacoes  ←──┘
  │   └→ QG >70% ────┐
  │                    │
  └→ QA Architect VALIDA qualidade & entrega  ←──┘
      └→ QG FINAL >70% → ENTREGA
```

## Ativacao

```
/squad-ops:agents:ops-chief             → Chief (roteia para especialistas)
/squad-ops:agents:process-mapper        → Process Mapper
/squad-ops:agents:architect             → Architect
/squad-ops:agents:automation-architect  → Automation Architect
/squad-ops:agents:qa-architect          → QA Architect
```

## Comandos por Agente

### OPS Chief (Router)
| Comando | Descricao |
|---------|-----------|
| `*route` | Analisar demanda e rotear para especialista |
| `*status` | Dashboard de progresso do pipeline |
| `*board` | Reunir especialistas para decisao |
| `*mapper` | Conectar com Process Mapper |
| `*architect` | Conectar com Architect |
| `*automation` | Conectar com Automation Architect |
| `*qa` | Conectar com QA Architect |
| `*pipeline` | Criar pipeline completo |
| `*deliver` | Gerar pacote de entrega |
| `*diagnose` | Diagnosticar bottleneck no pipeline |

### Process Mapper (1st)
| Comando | Descricao |
|---------|-----------|
| `*discover` | Iniciar discovery de processo |
| `*map` | Mapear processo existente |
| `*gaps` | Identificar gaps no processo |
| `*owners` | Definir donos de cada etapa |
| `*paths` | Bloquear caminhos incorretos |
| `*interview` | Roteiro de entrevista com stakeholder |
| `*create` | Criar novo processo do zero |
| `*handoffs` | Definir handoffs entre etapas |
| `*veto-conditions` | Criar condicoes de veto |
| `*validate` | Validar processo contra quality gate |

### Architect (2nd)
| Comando | Descricao |
|---------|-----------|
| `*structure` | Desenhar estrutura de pastas/espacos |
| `*statuses` | Desenhar fluxo de status |
| `*fields` | Definir campos customizados |
| `*templates` | Criar templates de tarefas |
| `*views` | Desenhar views por role |
| `*executors` | Definir matriz de executores |
| `*slas` | Definir SLAs por tipo de tarefa |
| `*escalation` | Criar regras de escalacao |
| `*handoffs` | Definir handoffs entre etapas |
| `*validate` | Validar arquitetura contra quality gate |

### Automation Architect (3rd)
| Comando | Descricao |
|---------|-----------|
| `*define-tasks` | Criar definicoes de tarefas |
| `*task-io` | Definir inputs/outputs de tarefas |
| `*criteria` | Definir criterios de aceitacao |
| `*dependencies` | Mapear dependencias entre tarefas |
| `*blockers` | Definir blockers e veto conditions |
| `*done-examples` | Criar exemplos de "done" |
| `*automate` | Criar especificacao de automacao |
| `*triggers` | Definir triggers e condicoes |
| `*notifications` | Definir notificacoes |
| `*integrate` | Especificar integracao entre ferramentas |
| `*test` | Testar automacao com cenarios |
| `*fallback` | Definir fallbacks |
| `*guardrails` | Aplicar 5 guardrails obrigatorios |

### QA Architect (4th — Final)
| Comando | Descricao |
|---------|-----------|
| `*design-gates` | Desenhar quality gates por fase |
| `*criteria` | Definir criterios de validacao |
| `*checklist` | Gerar checklist de validacao |
| `*verify` | Executar verificacao ponto a ponto |
| `*daughter-test` | Aplicar Teste da Filha |
| `*score` | Calcular score dimensional (D01-D10) |
| `*approve` | Aprovar deliverable |
| `*reject` | Rejeitar com motivos |
| `*issues` | Listar issues encontradas |
| `*audit` | Auditoria completa de deliverable |

## Frameworks & Heuristicas Compartilhados

### Pedro Valerio — Core
- **Impossibilitar Caminhos** (framework principal)
- PV_BS_001 — Future Back-Casting (mapear do FIM para o INICIO)
- PV_PA_001 — Systemic Coherence Scan (verdade tem poder de VETO)
- PV_PM_001 — Automation Tipping Point (repetiu 2x = automatiza)

### Por Role
| Role | Heuristicas Especificas | Framework Destacado |
|------|------------------------|---------------------|
| Process Mapper | PM-DH-001 a PM-DH-006 + PM-VH-001 a PM-VH-004 | Future Back-Casting (mapa do FIM) |
| Architect | ARC001-ARC010 | Systemic Coherence Scan |
| Automation Architect | AA_001-AA_010 | 5 GUARDRAILS (loop, idempotency, audit, escape, retry) |
| QA Architect | QA_001-QA_010 | META_AXIOMAS D01-D10 + Teste da Filha |

## Quality Gates

| Gate | Threshold | De → Para |
|------|-----------|-----------|
| QG-OPS-001 | >70% | Process Mapper → Architect |
| QG-OPS-002 | >70% | Architect → Automation Architect |
| QG-OPS-003 | >70% | Automation Architect → QA Architect |
| QG-OPS-FINAL | >70% | QA Architect → ENTREGA |

## Estrutura de Arquivos

```
squads/squad-ops/
├── config.yaml
├── README.md
├── agents/
│   ├── ops-chief.md             (1,099 lines — Chief/Router)
│   ├── process-mapper.md        (511 lines — Process Mapper)
│   ├── architect.md             (725 lines — Architect)
│   ├── automation-architect.md  (587 lines — Automation Architect)
│   └── qa-architect.md          (1,155 lines — QA Architect)
├── tasks/
├── templates/
├── checklists/
└── data/
```

## Integracao World OS

- Segue Protocolo Sinapse (le/escreve em project-state.yaml)
- Compativel com todos os squads do ecossistema
- OPS Chief roteia automaticamente baseado em keywords de operacoes

## Quality Metrics

- **Total agent code**: 4,077 linhas
- **Frameworks INLINE**: 10+ frameworks completos
- **Heuristicas compartilhadas**: 3 core + 40 especificas
- **Smoke tests**: 15 (3 por agente)
- **Anti-patterns**: 40+ com fix
- **Signature phrases**: todas com [SOURCE: Pedro Valerio]
- **Pattern**: One Mind, Multiple Hats (unico no ecossistema)
