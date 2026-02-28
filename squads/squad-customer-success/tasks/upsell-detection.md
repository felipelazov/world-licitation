# Task: Detect Upsell Opportunity

**Task ID:** `cs-rt-upsell-detection`
**Pattern:** HO-TP-001 (Task Anatomy Standard)
**Version:** 1.0.0
**Last Updated:** 2026-02-24

---

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_name** | Detect Upsell Opportunity |
| **status** | `pending` |
| **responsible_executor** | joey-coleman (CS / Retencao) |
| **execution_type** | `Hybrid` |
| **input** | Clientes saudaveis (health score 80+) |
| **output** | Oportunidade qualificada + lead para Vendas (SDR) |
| **action_items** | 4 steps |
| **acceptance_criteria** | 5 criteria |

**Estimated Time:** 1-2h

---

## Overview

Identificacao e qualificacao de oportunidades de expansao em clientes saudaveis. CS nao vende — CS identifica sinais de que o cliente precisa de mais e passa a oportunidade qualificada para o time de Vendas. A deteccao deve ser natural, baseada em sinais reais, nunca forçada.

---

## Input

- **Clientes saudaveis** (CRM data)
  - Required: Yes
  - Source: Task `health-check` (clientes com score 80+)
  - Descricao: Lista de clientes na zona Verde
- **Sinais de engajamento** (CRM data)
  - Required: Yes
  - Source: Task `engagement`, CRM, plataforma
  - Descricao: Interacoes recentes, perguntas, uso de funcionalidades
- **Catalogo de planos/servicos** (reference)
  - Required: Yes
  - Source: Produto/Comercial
  - Descricao: Planos disponiveis, features por plano, precos

---

## Output

- **Oportunidade qualificada** (document)
  - Destination: squad-sales (SDR)
  - Format: Lead com contexto, necessidade e recomendacao
- **Registro de sinais** (CRM entry)
  - Destination: CRM
  - Format: Historico de sinais de expansao detectados

---

## Precondicoes

- [ ] Health check atualizado (score 80+ confirmado)
- [ ] Historico de interacoes do cliente disponivel
- [ ] Catalogo de planos/servicos atualizado

---

## Action Items

### Step 1: Identificar Sinais de Expansao

Buscar indicadores naturais de que o cliente precisa de mais.

**Sinais positivos de upsell:**

| Sinal | Peso | Exemplo |
|-------|------|---------|
| Uso no limite do plano | Alto | "Estou chegando no limite de usuarios" |
| Pergunta sobre feature de plano superior | Alto | "Voces tem API avancada?" |
| Crescimento do time do cliente | Medio | "Contratamos 5 pessoas novas" |
| Pedido de customizacao | Medio | "Precisaria de um relatorio especifico" |
| Elogio publico ou referral | Medio | "Recomendei voces para um amigo" |
| Alta frequencia de uso | Medio | Top 10% de usuarios ativos |
| Participacao ativa em eventos | Baixo | Presente em webinars, community |
| Solicita integracao adicional | Medio | "Precisamos conectar com Salesforce" |

- [ ] Revisar interacoes dos ultimos 30 dias de clientes saudaveis
- [ ] Mapear sinais de expansao por cliente
- [ ] Classificar intensidade dos sinais (forte, moderado, fraco)

### Step 2: Mapear Necessidades

Entender o que o cliente realmente precisa (nao o que queremos vender).

- [ ] Qual problema o cliente esta tentando resolver?
- [ ] Qual funcionalidade/plano atenderia essa necessidade?
- [ ] O cliente tem budget para isso?
- [ ] O timing e adequado (nao esta no meio de uma crise)?
- [ ] A expansao traria valor REAL para o cliente?

**Teste de qualificacao:**
```
1. O cliente TEM a necessidade? (evidencia real)
2. O cliente SABE que tem a necessidade? (ja mencionou)
3. A solucao RESOLVE a necessidade? (match real)
4. O timing e ADEQUADO? (nao forcar)
5. O valor e CLARO? (ROI demonstravel)
```

Se qualquer resposta for NAO → ainda nao e hora de passar para Vendas.

### Step 3: Qualificar Oportunidade

Documentar a oportunidade com contexto completo para Vendas.

- [ ] Descrever necessidade do cliente com evidencias
- [ ] Recomendar plano/servico que atende
- [ ] Estimar valor potencial (revenue incremental)
- [ ] Definir grau de maturidade da oportunidade (quente, morna, fria)
- [ ] Incluir contexto de relacionamento (tom do cliente, preferencias)

**Formato da oportunidade qualificada:**
```
CLIENTE: [nome] | EMPRESA: [empresa]
PLANO ATUAL: [plano] | HEALTH SCORE: [score]
NECESSIDADE: [descricao clara com evidencia]
SINAIS: [lista de sinais detectados com datas]
RECOMENDACAO: [plano/servico sugerido]
VALOR ESTIMADO: [MRR/ARR incremental]
MATURIDADE: [Quente | Morna | Fria]
CONTEXTO: [como abordar, tom, preferencias]
TIMING: [por que agora]
```

### Step 4: Passar para Vendas

Transferir a oportunidade para o SDR com handoff claro.

- [ ] Registrar oportunidade no CRM
- [ ] Notificar SDR do squad-sales com contexto completo
- [ ] Definir quem faz o primeiro contato (CS apresenta SDR ou SDR aborda direto)
- [ ] Acompanhar status da oportunidade (CS continua como advisor)
- [ ] Registrar resultado final (converteu, nao converteu, motivo)

---

## Acceptance Criteria

- [ ] **AC-01:** Sinais de expansao documentados com evidencias reais (nao suposicoes)
- [ ] **AC-02:** Oportunidade passa no teste de qualificacao (5 perguntas com SIM)
- [ ] **AC-03:** Oportunidade documentada com formato completo para Vendas
- [ ] **AC-04:** SDR notificado com contexto suficiente para abordar o cliente
- [ ] **AC-05:** Acompanhamento ativo da oportunidade ate conclusao

---

## Veto Conditions

- NAO tentar fechar a venda (responsabilidade do squad-sales)
- NAO pressionar cliente para upgrade
- NAO passar oportunidade sem evidencia concreta de necessidade
- NAO recomendar plano que nao resolve o problema real do cliente
- NAO abordar cliente em risco (score < 60) com proposta de upsell

---

## Output Example

```yaml
upsell_opportunity:
  data_deteccao: "2026-02-24"
  cliente: "Tech Solutions Ltda"
  empresa: "Tech Solutions"
  plano_atual: "Pro Mensal"
  health_score: 92
  necessidade: "Time cresceu de 5 para 12 pessoas. Limite de usuarios do plano Pro atingido. Precisa de API para integracao com Salesforce."
  sinais:
    - sinal: "Perguntou sobre API avancada na call de engajamento"
      data: "2026-02-20"
      peso: "Alto"
    - sinal: "Uso no limite de usuarios (10/10)"
      data: "2026-02-18"
      peso: "Alto"
    - sinal: "Time cresceu 140% em 2 meses"
      data: "2026-02-15"
      peso: "Medio"
  recomendacao: "Plano Enterprise (ate 50 usuarios + API + integracoes)"
  valor_estimado:
    mrr_incremental: "R$ 800"
    arr_incremental: "R$ 9.600"
  maturidade: "Quente"
  contexto: "Cliente muito satisfeito. Preferencia por email + call. Decision maker: Joao (CEO). Rapido nas decisoes."
  timing: "Time crescendo rapido, limite de usuarios ja atinge operacao diaria"
  teste_qualificacao:
    tem_necessidade: true
    sabe_que_tem: true
    solucao_resolve: true
    timing_adequado: true
    valor_claro: true
  passado_para: "squad-sales (SDR)"
  data_passagem: "2026-02-24"
  status: "oportunidade_qualificada"
```

---

## Tools

| Tool | Uso |
|------|-----|
| CRM | Deteccao de sinais, registro e passagem para vendas |

---

## Handoff

| Attribute | Value |
|-----------|-------|
| **Next Task** | squad-sales (SDR aborda cliente) |
| **Trigger** | Oportunidade qualificada e registrada |
| **Executor** | squad-sales (SDR) |

### Handoff Checklist

- [ ] Oportunidade documentada com formato completo
- [ ] Teste de qualificacao aprovado (5/5)
- [ ] SDR notificado com contexto
- [ ] CS disponivel como advisor para o processo

---

## Error Handling

### SDR aborda cliente de forma agressiva

- **Trigger:** Cliente reclama de abordagem comercial forçada
- **Detection:** Feedback negativo do cliente apos contato do SDR
- **Recovery:** CS retoma relacionamento, pede desculpas, alinha abordagem com SDR. Registrar feedback.
- **Prevention:** Briefar SDR sobre tom e preferencias do cliente. Definir abordagem consultiva.

### Oportunidade nao converte

- **Trigger:** Cliente recusa proposta de upgrade
- **Detection:** SDR informa que oportunidade nao converteu
- **Recovery:** Registrar motivo. Manter relacionamento saudavel. Reavaliar em 60 dias.
- **Prevention:** Qualificar melhor (teste de 5 perguntas), respeitar timing do cliente

---

_Task Version: 1.0.0_
_Pattern: HO-TP-001 (Task Anatomy Standard)_
_Last Updated: 2026-02-24_
_Compliant: Yes_
