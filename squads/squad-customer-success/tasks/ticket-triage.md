# Task: Triage Ticket

**Task ID:** `cs-sp-ticket-triage`
**Pattern:** HO-TP-001 (Task Anatomy Standard)
**Version:** 1.0.0
**Last Updated:** 2026-02-24

---

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_name** | Triage Ticket |
| **status** | `pending` |
| **responsible_executor** | shep-hyken (Suporte) |
| **execution_type** | `Hybrid` |
| **input** | Ticket aberto pelo cliente |
| **output** | Classificacao (N1/N2/N3) + prioridade + direcao |
| **action_items** | 4 steps |
| **acceptance_criteria** | 5 criteria |

**Estimated Time:** 5-15min

---

## Overview

Classificacao e priorizacao de tickets de suporte recebidos. Cada ticket deve ser lido com atencao, classificado por nivel de complexidade (N1/N2/N3), priorizado por urgencia e direcionado para resolucao ou escalacao. A triagem rapida e precisa e o que garante SLA e satisfacao.

---

## Input

- **Ticket do cliente** (support ticket)
  - Required: Yes
  - Source: Intercom, Zendesk, Freshdesk ou email
  - Campos: assunto, descricao, cliente, data, canal de entrada
- **Historico do cliente** (CRM)
  - Required: Yes
  - Source: CRM
  - Descricao: Plano, health score, tickets anteriores, status da conta
- **Base de conhecimento** (KB)
  - Required: No
  - Source: Notion/KB
  - Descricao: Artigos de solucao para busca rapida

---

## Output

- **Ticket classificado** (support ticket)
  - Destination: Sistema de suporte
  - Format: Ticket com nivel, prioridade e direcao definidos
- **Direcao definida** (decision)
  - Destination: Fila de resolucao ou escalacao
  - Format: Resolve (N1) ou Escalate (N2/N3)

---

## Precondicoes

- [ ] Ticket recebido com informacoes minimas (cliente, assunto, descricao)
- [ ] Acesso ao CRM para consultar historico do cliente
- [ ] Acesso a base de conhecimento

---

## Action Items

### Step 1: Ler Ticket com Contexto Completo

Nao classificar no automatico. Ler com atencao.

- [ ] Ler assunto e descricao completa do ticket
- [ ] Verificar historico do cliente no CRM (tickets anteriores, status da conta)
- [ ] Verificar health score do cliente (prioridade diferente para clientes em risco)
- [ ] Identificar se e um problema recorrente (pattern matching)

### Step 2: Classificar Nivel de Complexidade

Aplicar criterios objetivos de classificacao.

| Nivel | Descricao | Exemplos | Tempo SLA |
|-------|-----------|----------|-----------|
| **N1** | Duvida simples ou problema conhecido | "Como faco X?", bug conhecido, reset de senha | 2h |
| **N2** | Problema tecnico que precisa investigacao | Bug novo, integracao falhando, comportamento inesperado | 8h |
| **N3** | Problema critico ou sistemico | Sistema fora do ar, perda de dados, seguranca | 1h |

- [ ] Aplicar classificacao N1, N2 ou N3
- [ ] Documentar justificativa da classificacao

### Step 3: Priorizar por Urgencia

Combinar nivel com contexto do cliente.

| Fator | Peso | Criterio |
|-------|------|----------|
| Nivel do ticket | 40% | N3 > N2 > N1 |
| Health score do cliente | 25% | Cliente em risco = prioridade alta |
| Plano do cliente | 15% | Enterprise > Pro > Basic |
| Recorrencia | 10% | Problema recorrente = prioridade elevada |
| Impacto no negocio | 10% | Bloqueia operacao = critico |

Prioridades finais: **Critica**, **Alta**, **Media**, **Baixa**

- [ ] Calcular prioridade combinando fatores
- [ ] Atribuir prioridade ao ticket

### Step 4: Direcionar

Definir proximo passo: resolver ou escalar.

- [ ] N1 → Direcionar para task `resolve` (solucao direta)
- [ ] N2/N3 → Direcionar para task `escalate` (encaminhamento especialista)
- [ ] Adicionar tags relevantes ao ticket (categoria, produto, funcionalidade)
- [ ] Registrar tempo de triagem

---

## Acceptance Criteria

- [ ] **AC-01:** Ticket classificado (N1/N2/N3) em ate 15 minutos apos recebimento
- [ ] **AC-02:** Prioridade atribuida com base nos criterios definidos (nao no "achismo")
- [ ] **AC-03:** Direcao definida: resolve (N1) ou escalate (N2/N3)
- [ ] **AC-04:** Historico do cliente consultado antes da classificacao
- [ ] **AC-05:** Tags e categorias aplicadas ao ticket

---

## Veto Conditions

- NAO classificar sem ler o ticket completo (nao ler so o assunto)
- NAO classificar sem consultar historico do cliente
- NAO atribuir N1 a problema critico por pressa
- NAO atribuir N3 a duvida simples por pressao do cliente
- NAO deixar ticket sem classificacao por mais de 15 minutos

---

## Output Example

```yaml
triage_record:
  ticket_id: "TK-2026-0342"
  cliente: "Joao Silva"
  empresa: "Tech Solutions Ltda"
  assunto: "Dashboard nao carrega dados de ontem"
  classificacao:
    nivel: "N2"
    justificativa: "Bug nao documentado na KB. Requer investigacao tecnica."
  prioridade: "Alta"
  fatores:
    nivel_ticket: "N2 (40%)"
    health_score: "65 - em risco (25%)"
    plano: "Pro (15%)"
    recorrencia: "Primeira vez (10%)"
    impacto: "Parcial - dashboard funciona, dados atrasados (10%)"
  direcao: "escalate"
  tags: ["dashboard", "dados", "bug"]
  tempo_triagem: "8min"
  status: "triagem_completa"
```

---

## Tools

| Tool | Uso |
|------|-----|
| Intercom | Recebimento e classificacao de tickets |
| Zendesk | Alternativa para gerenciamento de tickets |
| Freshdesk | Alternativa para gerenciamento de tickets |
| CRM | Consulta de historico e health score |
| Notion (KB) | Busca de solucoes conhecidas |

---

## Handoff

| Attribute | Value |
|-----------|-------|
| **Next Task (N1)** | `resolve` |
| **Next Task (N2/N3)** | `escalate` |
| **Trigger** | Classificacao e priorizacao completas |
| **Executor** | shep-hyken |

### Handoff Checklist

- [ ] Nivel atribuido (N1/N2/N3)
- [ ] Prioridade calculada
- [ ] Direcao definida (resolve ou escalate)
- [ ] Tags aplicadas

---

## Error Handling

### Ticket sem informacao suficiente

- **Trigger:** Cliente abre ticket vago ("nao funciona")
- **Detection:** Descricao nao permite classificacao precisa
- **Recovery:** Solicitar detalhes ao cliente ANTES de classificar. NAO chutar nivel.
- **Prevention:** Formulario de abertura de ticket com campos obrigatorios

### Classificacao incorreta detectada

- **Trigger:** Agente de resolucao percebe que nivel esta errado
- **Detection:** Feedback do agente que recebeu o ticket
- **Recovery:** Reclassificar e redirecionar. Registrar para melhoria do processo.
- **Prevention:** Revisar criterios de classificacao mensalmente

---

_Task Version: 1.0.0_
_Pattern: HO-TP-001 (Task Anatomy Standard)_
_Last Updated: 2026-02-24_
_Compliant: Yes_
