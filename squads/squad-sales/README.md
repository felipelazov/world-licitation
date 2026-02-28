# Squad Sales

Squad de vendas completo com AI Head of Sales (Alex Hormozi) liderando 3 especialistas de elite: SDR/Prospecting (Jeb Blount), Closer (Jeremy Miner) e Sales Analyst/RevOps (Jacco van der Kooij).

## Roster

| Agente | Mind Real | Tier | Funcao | Score |
|--------|-----------|------|--------|-------|
| Alex Hormozi | Alex Hormozi | Orchestrator | AI Head of Sales / Router | 15/15 |
| Jeb Blount | Jeb Blount | Tier 1 | SDR / Prospector | 15/15 |
| Jeremy Miner | Jeremy Miner | Tier 1 | Closer | 14/15 |
| Jacco van der Kooij | Jacco van der Kooij | Tier 2 | Sales Analyst / RevOps | 15/15 |

## Pipeline Architecture

```
Lead entra → Hormozi roteia
  ├→ Jeb Blount PROSPECTA (multi-channel, Golden Hours, qualifica via BANT+)
  ├→ Jeremy Miner FECHA (NEPQ questions + CLOSER structure do Hormozi)
  └→ Jacco van der Kooij ANALISA (Bow Tie lifecycle, SPICED, dashboards)
```

## Ativacao

```
/squad-sales:agents:alex-hormozi        → Chief (roteia para especialistas)
/squad-sales:agents:jeb-blount          → SDR / Prospecting
/squad-sales:agents:jeremy-miner        → Closer
/squad-sales:agents:jacco-van-der-kooij → Sales Analyst / RevOps
```

## Comandos por Agente

### Alex Hormozi (Chief)
| Comando | Descricao |
|---------|-----------|
| `*route` | Analisar situacao e rotear para especialista |
| `*board` | Reunir 3 especialistas para opinar |
| `*sdr` | Conectar com Jeb Blount |
| `*closer` | Conectar com Jeremy Miner |
| `*analyst` | Conectar com Jacco van der Kooij |
| `*closer-script` | Gerar script CLOSER para produto especifico |
| `*objection` | Lidar com objecao via AAA + scripts |
| `*pipeline` | Desenhar pipeline completo |
| `*team` | Arquitetar time de vendas |
| `*kpi` | Configurar dashboard de KPIs |
| `*compensation` | Desenhar estrutura de comissao |
| `*diagnose` | Diagnosticar bottleneck de vendas |

### Jeb Blount (SDR)
| Comando | Descricao |
|---------|-----------|
| `*prospect` | Gerar plano de prospecting para target |
| `*cadence` | Desenhar sequencia multi-channel (21 dias) |
| `*cold-call` | Gerar script de cold call |
| `*cold-email` | Gerar sequencia de cold email |
| `*voicemail` | Gerar script de voicemail (15s) |
| `*qualify` | Rodar qualificacao BANT+ |
| `*objection` | Lidar com objecao de prospecting |
| `*golden-hours` | Configurar rotina Golden Hours |
| `*pipeline-math` | Calcular targets de atividade |
| `*audit-prospecting` | Auditar abordagem atual |
| `*social-touch` | Gerar sequencia LinkedIn |
| `*referral-ask` | Gerar script de referral |

### Jeremy Miner (Closer)
| Comando | Descricao |
|---------|-----------|
| `*nepq` | Gerar conversa NEPQ completa |
| `*close` | Gerar approach de fechamento |
| `*objection` | Lidar com objecao de closing |
| `*call-structure` | Desenhar arquitetura de call |
| `*discovery` | Gerar perguntas de discovery |
| `*roleplay` | Praticar cenario de fechamento |
| `*audit-call` | Auditar transcript de call |
| `*tonality` | Guia de tonalidade |
| `*anti-pitch` | Gerar apresentacao anti-pitch |
| `*pre-frame` | Gerar scripts de pre-framing |

### Jacco van der Kooij (Analyst)
| Comando | Descricao |
|---------|-----------|
| `*bow-tie` | Mapear negocio no Bow Tie model |
| `*spiced` | Executar diagnostico SPICED |
| `*gtm-motion` | Identificar GTM motion correto |
| `*metrics` | Configurar framework de metricas |
| `*ltv-cac` | Calcular e analisar LTV:CAC |
| `*pipeline-health` | Analisar saude do pipeline |
| `*forecast` | Construir modelo de forecast |
| `*dashboard` | Desenhar dashboard por role |
| `*impact-matrix` | Priorizar com Impact Matrix 2x2 |
| `*audit-sales` | Auditoria completa de analytics |
| `*benchmark` | Comparar metrica vs industria |
| `*conversion-analysis` | Analisar conversao por stage |
| `*diagnose` | Diagnosticar problema com dados |

## Frameworks Clonados

### Alex Hormozi
- C.L.O.S.E.R. Framework (6 steps)
- AAA Objection Handling (Triple-A)
- Setter-Closer Architecture
- Sales KPIs & Metrics System
- Conviction Framework & Tonality
- The 5 Closes + Bonus Closes
- Specific Objection Scripts (9 objecoes)

### Jeb Blount
- Fanatical Prospecting Methodology
- Golden Hours System
- Multi-Channel Cadence Architecture (21-day)
- Objection Handling for Prospecting (10 objecoes)
- BANT+ Qualification Framework
- Pipeline Mathematics
- Rejection Proof Mindset

### Jeremy Miner
- NEPQ 6-Stage Conversation Flow (com question banks)
- Tonality & Vocal Mastery (7 tonalidades)
- Objection Prevention & Resolution (7 objecoes)
- Anti-Pitch Presentation
- Call Structure & Flow
- Behavioral Science Principles

### Jacco van der Kooij
- Bow Tie Data Model (Revenue Architecture)
- SPICED Diagnostic Framework
- GTM Motions Framework (5 motions)
- Revenue Metrics System (unit economics, pipeline, health)
- Impact Matrix (2x2 prioritization)
- Revenue Forecasting Models (4 modelos)
- Dashboard Design Framework (5 dashboards por role)

## Workflow Tipico

1. **Diagnostico**: Ativar Hormozi → `*diagnose` para identificar bottleneck
2. **Prospecting**: Se pipeline fraco → `*sdr` → Jeb Blount → `*cadence` + `*pipeline-math`
3. **Closing**: Se close rate baixo → `*closer` → Jeremy Miner → `*nepq` + `*objection`
4. **Analysis**: Para qualquer metrica → `*analyst` → Jacco → `*bow-tie` + `*dashboard`
5. **Board**: Para decisao complexa → `*board` → todos opinam

## Estrutura de Arquivos

```
squads/squad-sales/
├── config.yaml
├── README.md
├── agents/
│   ├── alex-hormozi.md      (2,055 lines — Chief/Router)
│   ├── jeb-blount.md        (2,356 lines — SDR)
│   ├── jeremy-miner.md      (2,000 lines — Closer)
│   └── jacco-van-der-kooij.md (1,320 lines — Analyst)
├── tasks/
├── templates/
├── checklists/
└── data/
```

## Integracao World OS

- Segue Protocolo Sinapse (le/escreve em project-state.yaml)
- Compativel com todos os squads do ecossistema
- Hormozi roteia automaticamente baseado em keywords

## Quality Metrics

- **Total agent code**: 7,731 linhas
- **Frameworks INLINE**: 27 frameworks completos
- **Score medio**: 14.75/15
- **Smoke tests**: 12 (3 por agente)
- **Decision heuristics**: 46 (10-12 por agente)
- **Signature phrases**: 44+ com [SOURCE:]
