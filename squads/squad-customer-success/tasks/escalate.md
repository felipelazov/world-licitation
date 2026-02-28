# Task: Escalate Ticket

**Task ID:** `cs-sp-escalate`
**Pattern:** HO-TP-001 (Task Anatomy Standard)
**Version:** 1.0.0
**Last Updated:** 2026-02-24

---

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_name** | Escalate Ticket |
| **status** | `pending` |
| **responsible_executor** | shep-hyken (Suporte) |
| **execution_type** | `Hybrid` |
| **input** | Ticket N2/N3 classificado |
| **output** | Encaminhamento + contexto + acompanhamento |
| **action_items** | 4 steps |
| **acceptance_criteria** | 5 criteria |

**Estimated Time:** 15-30min

---

## Overview

Escalacao de tickets que nao podem ser resolvidos no nivel 1. O objetivo e encaminhar para o especialista correto com TODO o contexto necessario, acompanhar ate resolucao e manter o cliente informado durante todo o processo. O cliente nunca deve ficar no escuro.

---

## Input

- **Ticket classificado N2/N3** (support ticket)
  - Required: Yes
  - Source: Task `ticket-triage` ou reclassificacao de `resolve`
  - Descricao: Ticket com nivel, prioridade, historico de tentativas
- **Contexto de tentativas** (text)
  - Required: No
  - Source: Task `resolve` (se houve tentativa N1)
  - Descricao: O que ja foi tentado e por que nao funcionou
- **Historico do cliente** (CRM)
  - Required: Yes
  - Source: CRM
  - Descricao: Plano, health score, tickets anteriores

---

## Output

- **Ticket escalado** (support ticket)
  - Destination: Especialista/time tecnico
  - Format: Ticket com contexto completo e expectativa de resolucao
- **Cliente informado** (communication)
  - Destination: Cliente
  - Format: Mensagem explicando a escalacao e prazo esperado
- **Acompanhamento ativo** (tracking)
  - Destination: Sistema de suporte
  - Format: Follow-ups agendados ate resolucao

---

## Precondicoes

- [ ] Ticket classificado como N2 ou N3 (task `ticket-triage`)
- [ ] Contexto completo documentado no ticket
- [ ] Especialista/time de destino identificado

---

## Action Items

### Step 1: Documentar Contexto Completo

O especialista nao deve precisar pedir mais informacoes.

- [ ] Descrever o problema em detalhe tecnico
- [ ] Listar o que ja foi tentado (se houve tentativa N1)
- [ ] Incluir screenshots, logs ou evidencias do problema
- [ ] Informar impacto no cliente (o que ele nao consegue fazer)
- [ ] Informar urgencia com base na classificacao de prioridade

**Formato do contexto de escalacao:**
```
TICKET: [ID]
CLIENTE: [nome] | EMPRESA: [empresa] | PLANO: [plano]
HEALTH SCORE: [score]
NIVEL: [N2/N3] | PRIORIDADE: [Critica/Alta/Media]

PROBLEMA:
[Descricao detalhada]

JA TENTADO:
[Lista do que foi feito]

EVIDENCIAS:
[Screenshots, logs, URLs]

IMPACTO:
[O que o cliente nao consegue fazer]

SLA RESTANTE:
[Tempo restante para resolucao]
```

### Step 2: Escalar para Especialista

Direcionar para a pessoa certa.

- [ ] Identificar especialista/time responsavel pelo tipo de problema
- [ ] Enviar ticket com contexto completo via canal oficial (ClickUp, Slack)
- [ ] Confirmar que o especialista recebeu e entendeu o ticket
- [ ] Alinhar prazo esperado de resolucao
- [ ] Registrar data/hora da escalacao no ticket

**Matriz de escalacao:**

| Tipo de Problema | Especialista | Canal |
|-----------------|-------------|-------|
| Bug de produto | Time de Produto | ClickUp |
| Integracao/API | Time Tecnico | Slack #integracao |
| Infraestrutura | DevOps | Slack #infra |
| Seguranca | Time de Seguranca | Slack #seguranca (urgente) |
| Financeiro/Billing | Financeiro | Email |
| Processo/Operacional | squad-ops | ClickUp |

### Step 3: Comunicar Cliente

Manter o cliente informado sobre o andamento.

- [ ] Informar ao cliente que o ticket foi escalado
- [ ] Explicar por que foi necessario escalar (sem jargao tecnico)
- [ ] Informar prazo esperado de resolucao
- [ ] Dar ao cliente um ponto de contato (voce continua sendo)
- [ ] Confirmar canal para atualizacoes

**Mensagem modelo:**
```
Ola [nome],

Estou analisando sua solicitacao com nossa equipe especializada
para garantir a melhor solucao.

Prazo estimado de retorno: [X horas/dias]

Vou te manter atualizado(a) sobre o andamento. Qualquer duvida,
estou aqui.
```

### Step 4: Acompanhar ate Resolucao

Nao escalar e esquecer. Acompanhar ativamente.

- [ ] Agendar follow-ups com o especialista (a cada 4h para N3, a cada 24h para N2)
- [ ] Atualizar o cliente a cada marco de progresso
- [ ] Quando resolvido: aplicar solucao ou orientar cliente
- [ ] Verificar satisfacao do cliente
- [ ] Documentar resolucao e alimentar KB

---

## Acceptance Criteria

- [ ] **AC-01:** Ticket escalado com contexto completo (problema, tentativas, evidencias, impacto)
- [ ] **AC-02:** Especialista confirmou recebimento e entendimento do ticket
- [ ] **AC-03:** Cliente informado sobre a escalacao e prazo esperado
- [ ] **AC-04:** Follow-ups realizados conforme frequencia definida (N2: 24h, N3: 4h)
- [ ] **AC-05:** Resolucao aplicada, documentada e satisfacao verificada

---

## Veto Conditions

- NAO escalar sem contexto documentado (especialista nao pode adivinhar)
- NAO escalar sem informar o cliente
- NAO escalar e abandonar — acompanhar ate resolucao
- NAO prometer prazo que nao foi validado com o especialista
- NAO escalar N1 por conveniencia (resolver primeiro)

---

## Output Example

```yaml
escalation_record:
  ticket_id: "TK-2026-0342"
  cliente: "Joao Silva"
  empresa: "Tech Solutions Ltda"
  classificacao: "N2"
  prioridade: "Alta"
  problema: "Dashboard nao carrega dados de ontem"
  ja_tentado:
    - "Cache limpo pelo cliente"
    - "Verificado em outro navegador"
    - "KB consultada - sem artigo relevante"
  escalado_para:
    time: "Time de Produto"
    canal: "ClickUp #produto"
    data_escalacao: "2026-02-24 14:30"
    prazo_estimado: "2026-02-25 14:30"
  comunicacao_cliente:
    informado: true
    canal: "Intercom"
    data: "2026-02-24 14:35"
  followups:
    - data: "2026-02-25 10:00"
      status: "especialista investigando"
      cliente_atualizado: true
    - data: "2026-02-25 14:00"
      status: "resolvido - bug de sincronizacao corrigido"
      cliente_atualizado: true
  resolucao:
    descricao: "Bug de sincronizacao de dados corrigido em hotfix"
    data_resolucao: "2026-02-25 13:45"
    dentro_sla: true
    csat: 4
  status: "resolvido"
```

---

## Tools

| Tool | Uso |
|------|-----|
| ClickUp | Escalacao e tracking de tarefas tecnicas |
| Slack | Comunicacao rapida com especialistas |
| Intercom | Comunicacao com cliente |
| CRM | Registro de escalacao e resolucao |

---

## Handoff

| Attribute | Value |
|-----------|-------|
| **Next Task (resolvido)** | Ticket fechado, alimenta task `report` |
| **Next Task (recorrente)** | `report` (padrao de problema recorrente) |
| **Trigger** | Resolucao aplicada e verificada |
| **Executor** | shep-hyken |

### Handoff Checklist

- [ ] Problema resolvido e confirmado pelo cliente
- [ ] Resolucao documentada no ticket e na KB
- [ ] CSAT coletado
- [ ] Se recorrente, sinalizado para task `report`

---

## Error Handling

### Especialista nao responde

- **Trigger:** Sem resposta do especialista em 4h (N3) ou 24h (N2)
- **Detection:** Follow-up sem retorno
- **Recovery:** Escalar para lider do time tecnico. Se N3, escalar para CS Head + CTO.
- **Prevention:** Definir SLAs internos de resposta por time

### Resolucao demora mais que o prometido ao cliente

- **Trigger:** Prazo informado ao cliente vai ser estourado
- **Detection:** Follow-up indica que resolucao vai atrasar
- **Recovery:** Informar cliente ANTES do prazo estourar. Dar novo prazo realista. Oferecer workaround se possivel.
- **Prevention:** Adicionar buffer de 20% ao prazo estimado pelo especialista

---

_Task Version: 1.0.0_
_Pattern: HO-TP-001 (Task Anatomy Standard)_
_Last Updated: 2026-02-24_
_Compliant: Yes_
