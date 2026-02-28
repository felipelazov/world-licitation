# Task: Execute Engagement Plan

**Task ID:** `cs-rt-engagement`
**Pattern:** HO-TP-001 (Task Anatomy Standard)
**Version:** 1.0.0
**Last Updated:** 2026-02-24

---

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_name** | Execute Engagement Plan |
| **status** | `pending` |
| **responsible_executor** | joey-coleman (CS / Retencao) |
| **execution_type** | `Hybrid` |
| **input** | Clientes ativos com health score |
| **output** | Contatos proativos realizados + novidades compartilhadas |
| **action_items** | 4 steps |
| **acceptance_criteria** | 5 criteria |

**Estimated Time:** 2-3h

---

## Overview

Execucao de contatos proativos com a base de clientes. O objetivo e manter relacionamento ativo, compartilhar novidades relevantes, coletar feedback e identificar necessidades antes que virem problemas. Engajamento proativo e o antidoto do churn silencioso.

---

## Input

- **Health score atualizado** (document)
  - Required: Yes
  - Source: Task `health-check`
  - Descricao: Score e zona de cada cliente
- **Novidades e atualizacoes** (content)
  - Required: No
  - Source: Produto, Marketing, CS Head
  - Descricao: Features novas, eventos, conteudos relevantes
- **Calendario de contatos** (schedule)
  - Required: Yes
  - Source: CRM
  - Descricao: Historico de ultimo contato por cliente

---

## Output

- **Contatos proativos realizados** (CRM entries)
  - Destination: CRM
  - Format: Registro de cada contato com resumo e feedback
- **Novidades compartilhadas** (communications)
  - Destination: Clientes
  - Format: Emails, WhatsApp, calls conforme segmento
- **Insights coletados** (document)
  - Destination: CRM + CS Head
  - Format: Feedback, necessidades, sinais de risco ou expansao

---

## Precondicoes

- [ ] Health check atualizado (task `health-check` recente)
- [ ] Lista de clientes com data de ultimo contato
- [ ] Novidades/conteudo disponivel para compartilhar (opcional mas recomendado)

---

## Action Items

### Step 1: Segmentar Base

Dividir clientes em grupos para comunicacao personalizada.

**Segmentacao por zona + ultimo contato:**

| Segmento | Criterio | Frequencia de Contato | Canal Primario |
|----------|----------|----------------------|----------------|
| **VIP** | Score 80+ e plano Enterprise/Pro | Quinzenal | Call + Email |
| **Ativo** | Score 60-79 | Mensal | Email + WhatsApp |
| **Silencioso** | Sem contato ha 30+ dias | Imediato | WhatsApp + Email |
| **Em risco** | Score < 60 | Semanal | Call (prioritario) |

- [ ] Classificar cada cliente no segmento correto
- [ ] Identificar clientes com contato atrasado (fora da frequencia)
- [ ] Priorizar contatos atrasados e clientes em risco

### Step 2: Planejar Contatos

Definir o que comunicar para cada segmento.

- [ ] VIP: Novidades exclusivas + convite para beta/eventos + feedback estrategico
- [ ] Ativo: Novidades gerais + tips de uso + cases de sucesso
- [ ] Silencioso: Check-in "como vai?" + valor que podem estar perdendo
- [ ] Em risco: NÃO fazer engagement padrao — direcionar para task `churn-prevention`

**Regras de contato:**
1. Sempre personalizar (nunca copiar/colar generico)
2. Sempre trazer valor (novidade, dica, convite)
3. Nunca ser invasivo ou insistente
4. Sempre perguntar, nao apenas informar
5. Registrar tudo no CRM

### Step 3: Executar Contatos

Realizar os contatos planejados.

- [ ] Enviar emails personalizados por segmento
- [ ] Enviar WhatsApp para contatos prioritarios
- [ ] Agendar calls para VIPs e clientes que solicitaram
- [ ] Convidar clientes relevantes para proximos eventos/webinars
- [ ] Compartilhar novidades de produto (features, melhorias)
- [ ] Compartilhar cases de sucesso de clientes similares

### Step 4: Registrar e Analisar

Documentar resultados e extrair insights.

- [ ] Registrar cada contato no CRM (data, canal, resumo, feedback)
- [ ] Documentar insights relevantes (necessidades, dores novas, sugestoes)
- [ ] Identificar sinais de expansao (interesse em features, perguntas sobre planos)
- [ ] Identificar sinais de risco (desengajamento, frustração, comparacao com concorrentes)
- [ ] Atualizar calendario de proximo contato por cliente
- [ ] Reportar insights significativos ao CS Head

---

## Acceptance Criteria

- [ ] **AC-01:** 100% dos clientes com contato atrasado (fora da frequencia) contatados
- [ ] **AC-02:** Contatos personalizados por segmento (nao generico)
- [ ] **AC-03:** Cada contato registrado no CRM com resumo e feedback
- [ ] **AC-04:** Sinais de risco ou expansao documentados e direcionados
- [ ] **AC-05:** Calendario de proximo contato atualizado para cada cliente

---

## Veto Conditions

- NAO contatar cliente em risco (score < 60) sem falar com CS Head primeiro
- NAO enviar comunicacao generica (copiar/colar) para todos os clientes
- NAO contatar cliente mais de 1x por semana sem motivo especifico
- NAO fazer contato apenas para "marcar presenca" — sempre trazer valor

---

## Output Example

```yaml
engagement_record:
  data: "2026-02-24"
  total_contatos_realizados: 12
  por_segmento:
    vip: 3
    ativo: 6
    silencioso: 3
    em_risco: 0  # direcionados para churn-prevention
  por_canal:
    email: 8
    whatsapp: 6
    call: 2
  contatos:
    - cliente: "Tech Solutions"
      segmento: "VIP"
      canal: "Call"
      resumo: "Compartilhado roadmap Q2. Cliente entusiasmado com nova feature."
      feedback: "Perguntou sobre API avancada (sinal de upsell)"
      proximo_contato: "2026-03-10"
    - cliente: "Startup ABC"
      segmento: "Silencioso"
      canal: "WhatsApp"
      resumo: "Check-in apos 35 dias sem contato"
      feedback: "Time mudou de prioridades, voltam a usar em marco"
      proximo_contato: "2026-03-03"
  insights:
    sinais_upsell: ["Tech Solutions - interesse em API avancada"]
    sinais_risco: ["Startup ABC - desengajamento temporario"]
  status: "engagement_executado"
```

---

## Tools

| Tool | Uso |
|------|-----|
| Email | Comunicacao formal e novidades |
| WhatsApp | Contatos rapidos e pessoais |
| Zoom | Calls com VIPs e contatos estrategicos |
| CRM | Registro e rastreamento de contatos |

---

## Handoff

| Attribute | Value |
|-----------|-------|
| **Next Task (sinal upsell)** | `upsell-detection` |
| **Next Task (sinal risco)** | `churn-prevention` |
| **Trigger** | Insight identificado durante engajamento |
| **Executor** | joey-coleman |

### Handoff Checklist

- [ ] Contatos realizados e registrados
- [ ] Sinais de upsell documentados
- [ ] Sinais de risco sinalizados
- [ ] Calendario atualizado

---

## Error Handling

### Cliente nao responde a tentativas de contato

- **Trigger:** 2+ tentativas sem resposta em canais diferentes
- **Detection:** Registros de contato sem resposta
- **Recovery:** Tentar canal diferente. Se 3 tentativas sem resposta, classificar como sinal de risco e direcionar para health check urgente.
- **Prevention:** Variar canais e horarios de contato

### Feedback negativo inesperado

- **Trigger:** Cliente expressa insatisfacao durante contato proativo
- **Detection:** Tom negativo ou reclamacao direta
- **Recovery:** Ouvir com empatia. Registrar como urgente. Direcionar para CS Head se grave. Se moderado, enderecar na mesma interacao.
- **Prevention:** Consultar health score e historico de suporte antes de contatar

---

_Task Version: 1.0.0_
_Pattern: HO-TP-001 (Task Anatomy Standard)_
_Last Updated: 2026-02-24_
_Compliant: Yes_
