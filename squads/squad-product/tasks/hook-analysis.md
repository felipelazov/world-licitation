# hook-analysis

> Task do Nir Eyal (Retention) — Analise de Hook Model

**Task ID:** hook-analysis
**Owner:** nir-eyal
**Squad:** squad-product
**Pattern:** PD-RT-001

---

## Task Anatomy

| Campo | Valor |
|-------|-------|
| **Input** | Produto / feature existente |
| **Output** | Hook Model mapeado (Trigger → Action → Reward → Investment) |
| **Pre-conditions** | Produto em uso ou prototipo funcional |
| **Trigger** | Produto novo, feature critica, ou metricas de retention baixas |

---

## Overview

"The Hook Model describes an experience designed to connect the user's problem to a company's product with enough frequency to form a habit." Nir Eyal mapeia cada fase do Hook para identificar onde o ciclo esta forte, onde esta fraco, e como fortalecer para gerar uso habitual.

---

## Action Items

### Step 1: Mapear Triggers Existentes
- **Triggers Externos:** quais prompts levam o usuario ao produto? (email, notificacao, SMS, ad)
- **Triggers Internos:** que emocao/situacao leva o usuario a pensar no produto? (tedio, ansiedade, FOMO, necessidade)
- Avaliar: o produto depende de triggers externos ou ja tem internos?
- Meta: migrar de externo para interno (habito real)

### Step 2: Analisar Action
- Qual a acao mais simples que o usuario faz ao abrir o produto?
- Aplicar Fogg Behavior Model: B = M × A × T (Behavior = Motivation × Ability × Trigger)
- A acao e simples o suficiente? (medir: cliques, tempo, esforco cognitivo)
- Reducao de friccao: como simplificar a acao ao minimo possivel?

### Step 3: Avaliar Variable Reward
- Que tipo de recompensa o usuario recebe?
  - **Tribe:** validacao social, status, comunidade
  - **Hunt:** recursos, informacao, ofertas
  - **Self:** maestria, progresso, completude
- A recompensa tem VARIABILIDADE? (previsivel = entediante)
- O usuario quer MAIS apos receber a recompensa?

### Step 4: Analisar Investment
- O que o usuario COLOCA no produto? (dados, conteudo, customizacao, rede, reputacao)
- Esse investimento torna o produto MELHOR no proximo ciclo?
- Cria switching cost? (quanto mais investe, mais dificil sair)
- O investimento carrega o proximo trigger?

### Step 5: Documentar Hook Map
- Montar diagrama completo: Trigger → Action → Variable Reward → Investment → (loop)
- Identificar o elo mais fraco
- Propor melhorias especificas
- Avaliar na Manipulation Matrix: somos Facilitator? (usamos o produto + acreditamos que e bom)

---

## Acceptance Criteria

1. Os 4 elementos do Hook mapeados com detalhes
2. Tipo de trigger classificado (externo vs interno)
3. Tipo de recompensa classificado (Tribe/Hunt/Self) com avaliacao de variabilidade
4. Investment analisado por switching cost e loop loading
5. Elo mais fraco identificado com proposta de melhoria

---

## Veto Conditions

- NAO projetar hooks manipulativos — usar Manipulation Matrix para garantir que somos Facilitator
- NAO ignorar triggers internos — hooks baseados so em push notifications nao criam habitos reais
- NAO assumir que recompensa fixa funciona — sem variabilidade, o usuario para de voltar

---

## Output Example

```yaml
hook_analysis:
  produto: "Dashboard IA para PMEs"
  trigger:
    externo: ["Email diario com insights", "Notificacao de anomalia"]
    interno: "Ansiedade matinal: 'como esta meu negocio?'"
    maturidade: "EXTERNO — ainda depende de push para abrir"
    melhoria: "Criar habito de check matinal via trigger interno (ansiedade + curiosidade)"
  action:
    acao_principal: "Abrir dashboard e ver resumo do dia"
    cliques_ate_valor: 2
    tempo_ate_valor: "8 segundos"
    avaliacao: "BOA — simples e rapida"
  variable_reward:
    tipo: "Hunt (insights novos) + Self (progresso do negocio)"
    variabilidade: "MEDIA — insights mudam mas formato e sempre igual"
    melhoria: "Adicionar 'insight surpresa' diario que varia formato e conteudo"
  investment:
    atual: "Dados do negocio, configuracoes, historico"
    switching_cost: "ALTO — dados acumulados sao insubstituiveis"
    loop_loading: "FRACO — investment nao carrega proximo trigger"
    melhoria: "Apos ver insights, usuario configura alerta customizado (investment → proximo trigger)"
  elo_mais_fraco: "Trigger — depende de external. Precisa migrar para internal."
  manipulation_matrix: "FACILITATOR — equipe usa o produto + acredita que ajuda PMEs"
```

---

## Handoff

- Hook Map → habit-design (projetar melhorias)
- Hook fraco em retention → melissa-perri (priorizar no roadmap)
- Hook impacta messaging → april-dunford (ajustar narrativa se habito mudar)
- Metricas de engagement → squad-customer-success (alinhar CS operacional)
