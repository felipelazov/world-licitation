# habit-design

> Task do Nir Eyal (Retention) — Design de Habito no Produto

**Task ID:** habit-design
**Owner:** nir-eyal
**Squad:** squad-product
**Pattern:** PD-RT-002

---

## Task Anatomy

| Campo | Valor |
|-------|-------|
| **Input** | Comportamento desejado do usuario + Hook Analysis |
| **Output** | Habit loop projetado + metricas de engajamento |
| **Pre-conditions** | hook-analysis completa |
| **Trigger** | Apos hook-analysis identificar gaps, ou nova feature precisa de habit loop |

---

## Overview

Habit design e a engenharia de transformar um comportamento desejado em habito. "Habits are defined as behaviors done with little or no conscious thought." Nir Eyal projeta o loop completo para que o usuario atinja a Habit Zone: alta frequencia + alto valor percebido.

---

## Action Items

### Step 1: Definir Comportamento-Alvo
- Qual acao queremos que o usuario faca habitualmente?
- Com que frequencia? (diaria, semanal, trigger-based)
- Qual o valor para o usuario E para o negocio?
- O comportamento esta na Habit Zone? (alta frequencia + alto valor percebido)

### Step 2: Projetar Trigger Interno
- Qual emocao/situacao vai disparar o comportamento SEM prompt externo?
- Mapear: momento do dia + emocao + contexto = trigger
- Design do "momento zero": o que o usuario pensa/sente ANTES de agir
- Projetar ponte: como o produto se conecta a esse momento emocional

### Step 3: Simplificar Action ao Maximo
- Reduzir passos ao minimo (ideal: 1-2 cliques)
- Reduzir esforco cognitivo (nao pedir decisoes complexas)
- Reduzir tempo ate o valor (< 30 segundos)
- Fogg: aumentar Ability > aumentar Motivation (mais efetivo)

### Step 4: Projetar Variable Reward
- Escolher tipo(s): Tribe, Hunt, Self
- Adicionar variabilidade REAL (nao cosmetic)
- Garantir que recompensa satisfaz mas deixa querer MAIS
- Calibrar: recompensa previsivel demais = tedio, aleatoria demais = frustracacao

### Step 5: Projetar Investment Loop
- Que investimento o usuario faz APOS recompensa?
- Esse investimento: (a) melhora o produto, (b) cria switching cost, (c) carrega proximo trigger?
- Ideal: os 3 ao mesmo tempo
- O loop deve ser NATURAL, nao forçado

### Step 6: Validar Etica (Manipulation Matrix)
- Nos usamos o produto? (facilitator check)
- Acreditamos que melhora a vida do usuario?
- O habito e saudavel para o usuario a longo prazo?
- Se NAO → redesign. "We have a moral obligation to use our power for good."

---

## Acceptance Criteria

1. Comportamento-alvo definido com frequencia e valor
2. Trigger interno identificado (emocao + contexto)
3. Action simplificada ao minimo (< 3 cliques, < 30s)
4. Variable reward projetada com variabilidade real
5. Investment loop fecha o ciclo (carrega proximo trigger)
6. Manipulation Matrix validada como Facilitator

---

## Veto Conditions

- NAO projetar dark patterns — habito deve BENEFICIAR o usuario
- NAO depender apenas de triggers externos — isso e engagement, nao habito
- NAO criar reward sem variabilidade — recompensa previsivel nao cria habito

---

## Output Example

```yaml
habit_design:
  comportamento_alvo: "Check matinal do dashboard de performance"
  frequencia: "Diaria (1x/dia, entre 7-9h)"
  habit_zone: "ALTA frequencia + ALTO valor percebido"

  trigger_interno:
    emocao: "Ansiedade matinal: 'como esta meu negocio hoje?'"
    contexto: "Ao acordar, com cafe, antes de abrir email"
    ponte: "Dashboard mostra resumo que responde a ansiedade em 8 segundos"

  action:
    acao: "Abrir app → ver resumo do dia"
    cliques: 1
    tempo_ate_valor: "8 segundos"
    simplificacao: "Widget na home screen mostra preview sem abrir app"

  variable_reward:
    tipo: "Hunt + Self"
    hunt: "Insight surpresa diario (variavel — 1 entre 50 tipos de insight)"
    self: "Score de performance do negocio (progresso vs semana passada)"
    variabilidade: "ALTA — insight muda todo dia, score flutua com dados reais"

  investment:
    acao: "Marcar insight como 'util' ou configurar alerta customizado"
    melhora_produto: "IA aprende preferencias → insights mais relevantes amanha"
    switching_cost: "Historico de insights + configuracoes acumuladas"
    carrega_trigger: "Alerta customizado = proximo trigger personalizado"

  manipulation_matrix: "FACILITATOR — usamos o produto, acreditamos que ajuda PMEs"

  metricas_sucesso:
    - "DAU/MAU ratio > 0.4 (indica uso habitual)"
    - "D1 retention > 60%"
    - "D7 retention > 45%"
    - "D30 retention > 35%"
    - "Tempo medio de sessao matinal: 2-5 minutos"
```

---

## Handoff

- Habit design aprovado → melissa-perri (incluir no roadmap como prioridade)
- Metricas definidas → engagement-metrics task (monitorar)
- Impacto em messaging → april-dunford (se habito mudar como usuario ve o produto)
