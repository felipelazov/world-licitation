# Task: Prevent Churn

**Task ID:** `cs-rt-churn-prevention`
**Pattern:** HO-TP-001 (Task Anatomy Standard)
**Version:** 1.0.0
**Last Updated:** 2026-02-24

---

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_name** | Prevent Churn |
| **status** | `pending` |
| **responsible_executor** | joey-coleman (CS / Retencao) |
| **execution_type** | `Hybrid` |
| **input** | Cliente em risco (health score < 60) |
| **output** | Acao de recuperacao executada + motivo documentado |
| **action_items** | 4 steps |
| **acceptance_criteria** | 5 criteria |

**Estimated Time:** 1-3h

---

## Overview

Deteccao e acao de recuperacao para clientes em risco de churn. O objetivo e identificar a causa raiz da insatisfacao, executar acoes de retencao e documentar tudo para aprendizado. Cada churn evitado e receita preservada. Cada churn documentado e aprendizado para o futuro.

---

## Input

- **Cliente em risco** (CRM data)
  - Required: Yes
  - Source: Task `health-check` (score < 60) ou sinais detectados
  - Descricao: Cliente na zona Laranja ou Vermelha
- **Historico completo** (CRM data)
  - Required: Yes
  - Source: CRM
  - Descricao: Onboarding, suporte, engajamento, pagamentos
- **Playbook de retencao** (reference)
  - Required: Yes
  - Source: Template `churn-prevention-playbook.md`
  - Descricao: Acoes pre-aprovadas por cenario

---

## Output

- **Acao de recuperacao executada** (CRM entry)
  - Destination: CRM
  - Format: Registro da acao com resultado
- **Motivo do risco documentado** (document)
  - Destination: CRM + CS Head
  - Format: Causa raiz categorizada + acao tomada
- **Resultado da retencao** (CRM entry)
  - Destination: CRM
  - Format: Retido, churned ou em observacao

---

## Precondicoes

- [ ] Health score < 60 confirmado ou sinal de churn detectado
- [ ] Historico do cliente disponivel no CRM
- [ ] Playbook de retencao atualizado
- [ ] CS Head informado (para clientes zona Vermelha)

---

## Action Items

### Step 1: Identificar Sinais e Causa Raiz

Entender POR QUE o cliente esta em risco antes de agir.

**Sinais de churn (deteccao precoce):**

| Sinal | Urgencia | O que investigar |
|-------|----------|-----------------|
| Queda de uso > 50% | Alta | O que mudou? Equipe? Prioridades? |
| CSAT <= 2 repetido | Alta | Problema nao resolvido? Expectativa nao atendida? |
| Pedido de cancelamento | Critica | Motivo real (nem sempre o declarado) |
| Pagamento atrasado | Media | Problema financeiro ou decisao de sair? |
| Sem login ha 15+ dias | Alta | Desistiu? Mudou de ferramenta? |
| Comparacao com concorrente | Media | O que o concorrente oferece que nos nao? |
| Ticket critico nao resolvido | Alta | Falha de suporte? |
| Mudanca de decision maker | Media | Novo gestor tem outras prioridades? |

- [ ] Mapear sinais presentes no cliente
- [ ] Consultar historico de interacoes (suporte, engajamento, onboarding)
- [ ] Identificar provavel causa raiz (produto, suporte, expectativa, financeiro, externo)
- [ ] Classificar urgencia: Imediata (cancelamento pedido), Alta (sinais fortes), Media (sinais moderados)

### Step 2: Contato de Recuperacao

Abordar o cliente com empatia e proposito.

**Antes do contato:**
- [ ] Alinhar abordagem com CS Head (obrigatorio para zona Vermelha)
- [ ] Preparar argumentos baseados na causa raiz identificada
- [ ] Verificar se ha oferta de retencao aprovada (desconto, extensao, feature)

**Durante o contato:**
- [ ] Ouvir PRIMEIRO. Nao chegar oferecendo desconto.
- [ ] Perguntar: "Como tem sido sua experiencia recentemente?"
- [ ] Perguntar: "O que poderiamos fazer diferente?"
- [ ] Validar a causa raiz (confirmar com o cliente)
- [ ] Apresentar plano de acao concreto para resolver a causa raiz
- [ ] Se aplicavel: oferecer retencao (pre-aprovada pelo CS Head)
- [ ] Se cliente decidiu cancelar: nao insistir, documentar motivo real

**Regras de retencao:**
```
1. OUVIR antes de oferecer
2. RESOLVER a causa raiz, nao mascarar com desconto
3. Desconto SOMENTE se aprovado pelo CS Head
4. Se o problema e do produto: comprometer-se com prazo real
5. Se o cliente decidiu sair: respeitar, agradecer, aprender
```

### Step 3: Executar Plano de Acao

Implementar o que foi combinado com o cliente.

| Cenario | Acao | Aprovacao |
|---------|------|-----------|
| Problema de produto | Escalar para Produto com deadline | CS Head |
| Problema de suporte | Plano de melhoria de atendimento | Shep Hyken |
| Expectativa desalinhada | Realinhar escopo e resultado | CS |
| Problema financeiro | Negociar plano/prazo | CS Head |
| Desengajamento | Novo onboarding parcial | Donna Weber |
| Concorrente | Demonstrar diferenciais | CS + Produto |

- [ ] Executar acao combinada com o cliente
- [ ] Acompanhar progresso da acao (follow-ups semanais)
- [ ] Verificar impacto no health score apos 2 semanas
- [ ] Ajustar abordagem se necessario

### Step 4: Documentar e Aprender

Registrar tudo para melhoria contínua.

- [ ] Documentar causa raiz no CRM (categoria + detalhe)
- [ ] Documentar acao tomada e resultado
- [ ] Classificar resultado: Retido, Churned, Em observacao
- [ ] Se churned: registrar motivo primario e secundario
- [ ] Se retido: agendar health check em 30 dias
- [ ] Se retido: agendar contato proativo em 2 semanas
- [ ] Reportar ao CS Head com aprendizados

**Categorias de causa raiz de churn:**

| Categoria | Exemplos |
|-----------|----------|
| **Produto** | Feature faltando, bug critico, UX ruim |
| **Suporte** | Lentidao, nao resolucao, mau atendimento |
| **Expectativa** | Prometido mais do que entregue, escopo mal definido |
| **Financeiro** | Cliente sem budget, crise, corte de custos |
| **Externo** | Mudanca de gestao, pivot do negocio, fechou empresa |
| **Concorrencia** | Migrou para concorrente com feature X |

---

## Acceptance Criteria

- [ ] **AC-01:** Causa raiz identificada e categorizada antes de qualquer acao
- [ ] **AC-02:** CS Head informado e alinhado ANTES do contato (obrigatorio para zona Vermelha)
- [ ] **AC-03:** Contato de recuperacao realizado em ate 48h apos deteccao do risco
- [ ] **AC-04:** Acao de retencao executada conforme playbook (sem improvisacao)
- [ ] **AC-05:** Resultado documentado (retido/churned/observacao) com motivo e aprendizado

---

## Veto Conditions

- NAO dar desconto sem aprovacao do CS Head
- NAO ignorar sinais de risco ("vai passar" nao e estrategia)
- NAO pressionar cliente que decidiu sair (respeitar a decisao)
- NAO oferecer solucao que nao resolve a causa raiz (band-aid proibido)
- NAO prometer timeline de produto que nao foi validado com o time

---

## Output Example

```yaml
churn_prevention_record:
  data: "2026-02-24"
  cliente: "Startup XYZ"
  empresa: "Startup XYZ"
  health_score: 45
  zona: "Risco"
  sinais:
    - "Queda de uso 65% no ultimo mes"
    - "CSAT 2.5 nos ultimos 3 tickets"
    - "Sem login ha 12 dias"
  causa_raiz:
    categoria: "Produto"
    detalhe: "Feature de relatorio que o cliente mais usava ficou indisponivel apos update"
    secundaria: "Suporte demorou 5 dias para resolver ticket sobre isso"
  contato_recuperacao:
    data: "2026-02-24"
    canal: "Call (Zoom)"
    duracao: "25min"
    abordagem: "Escuta ativa + reconhecimento do problema + plano de acao"
    feedback_cliente: "Frustrado mas aberto a resolucao se for rapido"
  acao:
    tipo: "Resolucao de produto + melhoria de suporte"
    detalhes:
      - "Feature restaurada em hotfix (prazo: 48h, confirmado por Produto)"
      - "SLA de atendimento elevado para prioridade alta"
    aprovacao: "CS Head (lincoln-murphy)"
  resultado: "Em observacao"
  followup:
    proximo_contato: "2026-02-26"
    health_check: "2026-03-10"
  aprendizado: "Updates de produto que removem features devem ter comunicacao previa e rollback rapido"
  status: "em_recuperacao"
```

---

## Tools

| Tool | Uso |
|------|-----|
| CRM | Historico, registro e tracking |
| Zoom | Calls de recuperacao |
| WhatsApp | Follow-ups rapidos |

---

## Handoff

| Attribute | Value |
|-----------|-------|
| **Next Task (retido)** | `health-check` (em 30 dias) |
| **Next Task (churned)** | Encerramento de conta + retrospectiva |
| **Trigger** | Resultado definido (retido/churned/observacao) |
| **Executor** | joey-coleman + CS Head |

### Handoff Checklist

- [ ] Causa raiz documentada e categorizada
- [ ] Acao executada e resultado registrado
- [ ] Se retido: health check agendado
- [ ] Se churned: motivo documentado para retrospectiva

---

## Error Handling

### Cliente cancela sem contato previo

- **Trigger:** Pedido de cancelamento surpresa
- **Detection:** Notificacao de cancelamento no sistema
- **Recovery:** Contato imediato (24h). Entender motivo. Se possivel, oferecer retencao. Se nao, documentar.
- **Prevention:** Health check regular, engagement proativo, monitoramento de sinais

### Oferta de retencao recusada

- **Trigger:** Cliente recusa desconto/benefit oferecido
- **Detection:** Feedback do cliente durante contato
- **Recovery:** Perguntar o que RESOLVERIA o problema. Se nada resolve, respeitar e documentar.
- **Prevention:** Focar em resolver causa raiz, nao em descontos. Desconto sem valor e dinheiro jogado fora.

---

_Task Version: 1.0.0_
_Pattern: HO-TP-001 (Task Anatomy Standard)_
_Last Updated: 2026-02-24_
_Compliant: Yes_
