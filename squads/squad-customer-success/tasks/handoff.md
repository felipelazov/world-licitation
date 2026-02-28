# Task: Handoff to CS

**Task ID:** `cs-on-handoff`
**Pattern:** HO-TP-001 (Task Anatomy Standard)
**Version:** 1.0.0
**Last Updated:** 2026-02-24

---

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_name** | Handoff to CS |
| **status** | `pending` |
| **responsible_executor** | donna-weber (Onboarding Specialist) |
| **execution_type** | `Hybrid` |
| **input** | Cliente ativado com first value confirmado |
| **output** | Contexto documentado + CS responsavel apresentado |
| **action_items** | 4 steps |
| **acceptance_criteria** | 5 criteria |

**Estimated Time:** 0.5-1h

---

## Overview

Transferencia formal do cliente de Onboarding para o time de CS/Retencao. O objetivo e garantir que TODO o contexto do cliente seja preservado e que a transicao seja imperceptivel para o cliente. O cliente nunca deve sentir que "comecou do zero" com uma pessoa nova.

---

## Input

- **Registro de first value** (CRM entry)
  - Required: Yes
  - Source: Task `first-value`
  - Descricao: Vitoria documentada, metricas, feedback
- **Historico completo de onboarding** (CRM)
  - Required: Yes
  - Source: Tasks `welcome-client`, `setup-account`, `first-value`
  - Descricao: Todas as interacoes, configuracoes, problemas encontrados
- **Perfil do cliente** (CRM entry)
  - Required: Yes
  - Source: Registro de onboarding
  - Descricao: Dados, plano, dores, expectativas, personalidade

---

## Output

- **Documento de handoff** (document)
  - Destination: CS/Retencao (joey-coleman)
  - Format: Contexto completo com historico, preferencias e riscos
- **CS responsavel apresentado** (interaction)
  - Destination: Cliente
  - Format: Call ou email de apresentacao
- **Registro de transicao** (CRM entry)
  - Destination: CRM
  - Format: Data de handoff, CS designado, status atualizado

---

## Precondicoes

- [ ] First value confirmado (task `first-value` finalizada)
- [ ] Historico de onboarding completo no CRM
- [ ] CS responsavel designado pelo CS Head (lincoln-murphy)
- [ ] CS responsavel disponivel para call de apresentacao

---

## Action Items

### Step 1: Compilar Contexto Completo

Reunir TODAS as informacoes relevantes sobre o cliente.

- [ ] Resumir jornada de onboarding (welcome → setup → first value)
- [ ] Listar dores originais e como foram endereçadas
- [ ] Documentar configuracoes feitas e funcionalidades ativas
- [ ] Registrar preferencias de comunicacao do cliente (horarios, canal, tom)
- [ ] Documentar problemas encontrados durante onboarding e como foram resolvidos
- [ ] Identificar riscos ou pontos de atencao para CS

**Documento de Handoff deve conter:**

```
1. Dados do Cliente (nome, empresa, plano, data fechamento)
2. Contexto de Venda (dor, expectativa, promessas)
3. Jornada de Onboarding (timeline com marcos)
4. Configuracoes Realizadas (o que esta ativo, o que falta)
5. First Value (resultado, metricas, feedback)
6. Preferencias (canal, horario, tom de comunicacao)
7. Riscos e Pontos de Atencao
8. Oportunidades Identificadas (upsell, cross-sell)
9. Recomendacoes para CS
```

### Step 2: Briefar CS Responsavel

Transferir conhecimento para quem vai assumir a conta.

- [ ] Agendar briefing com CS designado (joey-coleman ou membro do time)
- [ ] Apresentar documento de handoff
- [ ] Responder duvidas do CS sobre o cliente
- [ ] Alinhar proximos passos e frequencia de contato
- [ ] Compartilhar nuances que nao estao no documento (impressoes pessoais)

### Step 3: Apresentar CS ao Cliente

Transicao suave e profissional.

- [ ] Agendar call de apresentacao (Onboarding + CS + Cliente)
- [ ] Donna apresenta o CS como "pessoa que vai cuidar da conta"
- [ ] CS demonstra conhecimento do contexto (cita dor, first value, plano)
- [ ] Cliente confirma que se sente confortavel com a transicao
- [ ] Definir proxima interacao CS-Cliente (data e pauta)

### Step 4: Formalizar Transicao

Registrar a transferencia oficialmente.

- [ ] Atualizar owner da conta no CRM (Onboarding → CS)
- [ ] Marcar onboarding como completo no sistema
- [ ] Calcular metricas finais de onboarding (time to first value, satisfaction)
- [ ] Enviar email de encerramento ao cliente agradecendo pela jornada
- [ ] Notificar CS Head sobre conclusao do onboarding

---

## Acceptance Criteria

- [ ] **AC-01:** Documento de handoff completo com todos os 9 campos preenchidos
- [ ] **AC-02:** CS responsavel briefado e sem duvidas sobre o cliente
- [ ] **AC-03:** Call de apresentacao realizada com cliente + Onboarding + CS
- [ ] **AC-04:** Cliente confirmou que se sente confortavel com a transicao
- [ ] **AC-05:** Owner da conta atualizado no CRM de Onboarding para CS

---

## Veto Conditions

- NAO fazer handoff sem first value confirmado
- NAO transferir sem documento de handoff completo
- NAO apresentar CS que nao foi briefado sobre o cliente
- NAO fazer handoff por email — deve ter call de apresentacao
- NAO encerrar onboarding sem confirmacao do cliente

---

## Output Example

```yaml
handoff_record:
  cliente: "Joao Silva"
  empresa: "Tech Solutions Ltda"
  onboarding:
    inicio: "2026-02-24"
    conclusao: "2026-03-05"
    duracao_dias: 9
    time_to_first_value_dias: 5
    satisfacao_nps: 9
  cs_designado:
    agente: "joey-coleman"
    data_briefing: "2026-03-04"
    data_apresentacao_cliente: "2026-03-05"
  documento_handoff: "clientes/tech-solutions/handoff-2026-03-05.md"
  riscos_identificados:
    - "Cliente tem expectativa alta de customizacao avancada"
  oportunidades:
    - "Interesse em plano Enterprise (sinal de upsell)"
  status: "handoff_completo"
  owner_atual: "joey-coleman"
```

---

## Tools

| Tool | Uso |
|------|-----|
| CRM | Registro e transferencia de ownership |
| ClickUp | Tarefas e acompanhamento de transicao |
| Zoom | Call de apresentacao CS-Cliente |
| Email | Comunicacao formal de encerramento |

---

## Handoff

| Attribute | Value |
|-----------|-------|
| **Next Task** | `health-check` (CS/Retencao pipeline) |
| **Trigger** | Handoff completo + owner atualizado no CRM |
| **Executor** | joey-coleman |

### Handoff Checklist

- [ ] Documento de handoff entregue ao CS
- [ ] CS briefado e sem duvidas
- [ ] Cliente apresentado ao CS
- [ ] CRM atualizado com novo owner

---

## Error Handling

### CS designado nao disponivel

- **Trigger:** CS responsavel nao pode assumir no prazo
- **Detection:** CS Head nao designou CS em 48h apos solicitacao
- **Recovery:** CS Head designa backup. Se impossivel, Donna estende acompanhamento.
- **Prevention:** Solicitar designacao de CS logo apos first value

### Cliente resiste a transicao

- **Trigger:** Cliente pede para continuar com Donna
- **Detection:** Cliente expressa desconforto na call de apresentacao
- **Recovery:** Donna participa de 1-2 calls com CS + Cliente para transicao gradual
- **Prevention:** Apresentar CS como "upgrade" (mais disponibilidade, mais experiencia)

---

_Task Version: 1.0.0_
_Pattern: HO-TP-001 (Task Anatomy Standard)_
_Last Updated: 2026-02-24_
_Compliant: Yes_
