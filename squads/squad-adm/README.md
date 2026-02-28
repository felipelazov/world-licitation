# Squad ADM — Gestao Administrativa Completa

Squad responsavel por toda operacao administrativa da empresa: financeiro, RH/people, juridico, facilities e compliance. 6 agentes baseados em especialistas reais. Governado por Radical Transparency (Ray Dalio).

## Estrutura

```
squad-adm/
├── agents/
│   ├── ray-dalio-adm-chief.md       ← Orquestrador (Principles / 5-Step Process)
│   ├── dave-ramsey-financeiro.md    ← CFO (ZBB, Cash Flow Waterfall)
│   ├── patrick-lencioni-rh.md      ← CPO (ITP, 5 Dysfunctions)
│   ├── ken-adams-juridico.md       ← CLO (MSCD, CLM)
│   ├── marie-kondo-facilities.md   ← Facilities (KonMari Corporate, PoLP)
│   └── ray-dalio-compliance.md     ← Compliance (PBC, LGPD, 5-Phase Audit)
├── tasks/
│   ├── financial-health-check.md    ← Checkup financeiro (45 min)
│   ├── team-health-check.md         ← Saude organizacional
│   ├── contract-review.md           ← Revisao de contratos
│   ├── tools-audit.md               ← Auditoria de ferramentas/acessos
│   └── compliance-audit.md          ← Auditoria interna
├── checklists/
│   ├── financial-health-checklist.md     ← QG-ADM-001 (receitas, despesas, burn rate)
│   ├── contract-review-checklist.md      ← QG-ADM-002 (red flags, termos, MSCD)
│   ├── tools-audit-checklist.md          ← QG-ADM-003 (PoLP, uso real, custo)
│   ├── compliance-audit-checklist.md     ← QG-ADM-004 (LGPD, politicas, riscos)
│   └── team-health-checklist.md          ← QG-ADM-005 (confianca, conflito, commitment)
├── templates/
│   ├── financial-report-tmpl.md          ← DRE, margem operacional, burn rate
│   ├── contract-review-report-tmpl.md    ← Parecer juridico de contratos
│   ├── tools-inventory-tmpl.md           ← Inventario SaaS/ferramentas + custo
│   ├── compliance-report-tmpl.md         ← Relatorio de auditoria + remediacao
│   └── team-health-report-tmpl.md        ← Diagnostico saude organizacional
├── workflows/
│   └── adm-operations-pipeline.yaml      ← 5 pipelines multi-agente
├── data/
│   └── coding-standards.md               ← Padroes de documentos e retencao
└── config.yaml
```

## 5 Departamentos

```
RAY DALIO (ADM Chief) — Orquestrador
├── FINANCEIRO (Dave Ramsey)
│   └── DRE, fluxo de caixa, budget, contas a pagar/receber
├── RH / PEOPLE (Patrick Lencioni)
│   └── Recrutamento (ITP), onboarding (90 days), offboarding
├── JURIDICO (Ken Adams)
│   └── Contratos (MSCD), disputas, compliance juridica
├── FACILITIES (Marie Kondo)
│   └── Ferramentas/SaaS, acessos (PoLP), fornecedores
└── COMPLIANCE (Ray Dalio)
    └── Auditorias, politicas, LGPD, governance
```

## Principio Unificador

**Radical Transparency** (Ray Dalio) — Todas as decisoes administrativas sao documentadas, rastreadas e auditaveis. O sistema funciona com o 5-Step Process: Goals → Problems → Diagnose → Design → Do.

## Pipelines Multi-Agente

### 1. Onboarding Completo (90 dias)
```
Lencioni (ITP fit + docs) → Kondo (acessos + ferramentas) → Compliance (LGPD + politicas) → Ramsey (registro financeiro)
```

### 2. Offboarding (5-7 dias)
```
Lencioni (exit interview) → Kondo (revoga acessos <24h) → Ramsey (rescisao) → Adams (closure legal)
```

### 3. Novo Contrato (10-15 dias)
```
Adams (revisao MSCD) → Compliance (LGPD clearance) → Ramsey (setup financeiro)
```

### 4. Fechamento Mensal (1-2 dias)
```
Ramsey (DRE + burn rate) → Compliance (review) → Kondo (custo ferramentas)
```

### 5. Auditoria Geral (15-20 dias, trimestral)
```
Compliance (auditoria base) → Ramsey (auditoria financeira) → Kondo (auditoria ferramentas) → Adams (review legal)
```

## Quality Gates

| Gate | Descricao | Tipo | Dono |
|------|-----------|------|------|
| QG-ADM-001 | Financial Accuracy — numeros conferidos, DRE = extratos | Bloqueante | Dave Ramsey |
| QG-ADM-002 | Contract Compliance — revisado antes de assinar | Bloqueante | Ken Adams |
| QG-ADM-003 | Access Control — PoLP auditado | Consultivo | Marie Kondo |
| QG-ADM-004 | LGPD Compliance — dados pessoais conforme lei | Bloqueante | Ray Dalio (Compliance) |
| QG-ADM-005 | Onboarding Complete — todos os passos checados | Consultivo | Patrick Lencioni |

## Frameworks por Agente

| Agente | Frameworks | Referencia |
|--------|-----------|------------|
| Ray Dalio (Chief) | 5-Step Process, Radical Transparency, Idea Meritocracy | "Principles" |
| Dave Ramsey | Zero-Based Budgeting, Cash Flow Waterfall, Debt Snowball | "EntreLeadership" |
| Patrick Lencioni | Ideal Team Player (ITP), 5 Dysfunctions, Working Genius | "The Ideal Team Player" |
| Ken Adams | MSCD (6 regras), CLM, Risk Assessment (6 dimensoes) | "A Manual of Style for Contract Drafting" |
| Marie Kondo | KonMari Corporate, PoLP (5 niveis), Vendor Scorecard | "The Life-Changing Magic of Tidying Up" (adaptado) |
| Ray Dalio (Compliance) | PBC, LGPD Framework (7 pilares), 5-Phase Audit | "Principles" (aplicado a compliance) |

## Roteamento do Chief

| Demanda | Agente | Departamento |
|---------|--------|-------------|
| "Pagar fornecedor" / "DRE" / "fluxo de caixa" | @dave-ramsey-financeiro | Financeiro |
| "Contratar" / "onboarding" / "demissao" | @patrick-lencioni-rh | RH |
| "Contrato" / "juridico" / "disputa" | @ken-adams-juridico | Juridico |
| "Ferramentas" / "acessos" / "fornecedores" | @marie-kondo-facilities | Facilities |
| "Auditoria" / "LGPD" / "politica" / "compliance" | @ray-dalio-compliance | Compliance |

## Regras de Retencao

| Tipo | Retencao | Acesso |
|------|----------|--------|
| Financeiro | 7 anos (requisito legal) | Ramsey + Chief |
| RH | 5 anos (confidencial) | Lencioni + Chief |
| Juridico | Indefinido (prescricao) | Adams + Chief |
| Compliance | 5 anos | Compliance + Chief |
| Facilities | 3 anos | Kondo + Chief |

## Severidade de Findings (Auditoria)

| Severidade | SLA | Acao |
|------------|-----|------|
| Critico | 48h | Acao imediata, escalar |
| Alto | 7 dias | Plano de remediacao obrigatorio |
| Medio | 30 dias | Correcao programada |
| Baixo | 90 dias | Melhoria continua |

## Tool Stack

| Ferramenta | Uso |
|-----------|-----|
| Google Workspace | Docs, Sheets, Drive |
| Slack | Comunicacao |
| Notion | Documentacao |
| ClickUp | Gestao de tarefas |
| Conta Azul | Contabilidade |
| DocuSign | Assinaturas de contrato |
| 1Password | Gestao de credenciais |

## Sinapses

| Decisao | Impacta |
|---------|---------|
| Budget de desenvolvimento | squad-product |
| Contratos com clientes | squad-sales |
| Compliance e ferramentas | squad-agency |
| Gestao de acessos | squad-design |
| Politicas internas | squad-content-distillery |

## Ativacao

```
/squad-adm:agents:ray-dalio-adm-chief    ← Orquestrador (routing geral)
/squad-adm:agents:dave-ramsey-financeiro  ← Financeiro
/squad-adm:agents:patrick-lencioni-rh     ← RH / People
/squad-adm:agents:ken-adams-juridico      ← Juridico
/squad-adm:agents:marie-kondo-facilities  ← Facilities
/squad-adm:agents:ray-dalio-compliance    ← Compliance
```
