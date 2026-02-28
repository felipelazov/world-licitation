# churn-diagnosis

> Task do Nir Eyal (Retention) — Diagnostico de Churn Product-Side

**Task ID:** churn-diagnosis
**Owner:** nir-eyal
**Squad:** squad-product
**Pattern:** PD-RT-004

---

## Task Anatomy

| Campo | Valor |
|-------|-------|
| **Input** | Dados de churn / baixo engajamento / alertas de engagement-metrics |
| **Output** | Root cause analysis + redesign de hook loops |
| **Pre-conditions** | engagement-metrics framework ativo + dados de churn |
| **Trigger** | Alerta de churn zone, aumento de churn rate, ou request do product-review |

---

## Overview

Churn product-side e diferente de churn por CS ruim. Aqui o problema esta no PRODUTO: o hook quebrou, o habito nao se formou, ou o valor percebido caiu. "A habit is when not doing an action causes a bit of discomfort" — se parar de usar nao doi, o hook falhou.

---

## Action Items

### Step 1: Identificar Onde o Hook Quebrou
- **Trigger falhou?** — usuario nao pensa no produto espontaneamente
- **Action com friccao?** — muito esforco para chegar ao valor
- **Reward previsivel?** — sem variabilidade, sem motivacao para voltar
- **Investment ausente?** — usuario nao colocou nada, nao tem switching cost
- Classificar: QUAL fase do Hook e o problema principal?

### Step 2: Analisar Dados de Comportamento
- Comparar churned vs retained: o que os retidos fazem que os churned nao fazem?
- Identificar "aha moment": qual acao separa quem fica de quem sai?
- Analisar frequencia de uso pre-churn: houve decline gradual ou abandono subito?
- Mapear ultima acao antes do churn: onde o usuario "desistiu"?

### Step 3: Segmentar por Causa
- **Churn por friccao:** produto e dificil demais de usar
- **Churn por valor:** usuario nao ve resultado suficiente
- **Churn por alternativa:** competidor oferece hook mais forte
- **Churn por mudanca de contexto:** usuario nao precisa mais (legitimio)
- Para cada segmento: tamanho + acao recomendada

### Step 4: Projetar Fix no Hook
- Para cada causa: redesign especifico do hook
- Priorizar: fix com maior impacto no maior segmento de churn
- Prototipar e testar antes de implementar full
- Definir metrica de sucesso do fix

### Step 5: Documentar e Comunicar
- Report de churn diagnosis com root causes, segmentos, e fixes propostos
- Compartilhar com squad-product para priorizacao
- Criar sinapse para squad-customer-success (alinhar CS ops)

---

## Acceptance Criteria

1. Fase do Hook onde ocorre a falha identificada com dados
2. Comportamento churned vs retained comparado
3. Churn segmentado por pelo menos 3 causas
4. Fix proposto para causa #1 com metrica de sucesso
5. Report documentado e compartilhado

---

## Veto Conditions

- NAO atribuir todo churn a "produto ruim" — pode ser posicionamento errado (encaminhar para Dunford)
- NAO propor fix sem dados — "achamos que o problema e X" nao e diagnostico
- NAO ignorar churn por mudanca de contexto — isso e saudavel e nao precisa de fix

---

## Output Example

```yaml
churn_diagnosis:
  periodo: "Jan 2026"
  churn_rate: "8.5% (meta: < 5%)"
  total_churned: 47

  hook_failure_analysis:
    trigger: "32% — usuarios nao pensam no produto espontaneamente"
    action: "15% — setup complexo demais (abandono no onboarding)"
    reward: "28% — dashboard previsivel, sem novidade"
    investment: "25% — usuarios nao customizaram, facil de sair"
    principal: "TRIGGER — maior causa de churn"

  churned_vs_retained:
    retained_fazem: "Check diario matinal, configuram alertas, usam 3+ features"
    churned_nao_fazem: "Nao configuram alertas, usam 1 feature, sessoes < 30 seg"
    aha_moment: "Usuarios que configuram pelo menos 1 alerta custom tem 3x mais retention"

  segmentos:
    - causa: "Trigger fraco (nao volta espontaneamente)"
      tamanho: "32% (15 usuarios)"
      fix: "Implementar insight surpresa diario + notificacao personalizada baseada em dados reais do negocio"
      metrica: "D7 retention do segmento: de 20% para 40%"

    - causa: "Reward previsivel (dashboard monotono)"
      tamanho: "28% (13 usuarios)"
      fix: "Variable reward: insight diario que muda tipo e formato"
      metrica: "Session frequency: de 1.2x para 3x/semana"

    - causa: "Investment baixo (nao customizou)"
      tamanho: "25% (12 usuarios)"
      fix: "Prompt de customizacao apos 3a sessao (investimento guiado)"
      metrica: "% usuarios com 1+ alerta custom: de 15% para 50%"

  prioridade: "Fix #1 (Trigger) — maior segmento, maior impacto estimado"

  sinapses:
    - para: "squad-customer-success"
      mensagem: "15% do churn e por setup complexo — alinhar com onboarding (Donna Weber)"
    - para: "melissa-perri"
      mensagem: "Priorizar: insight variavel + prompt de customizacao no roadmap"
```

---

## Handoff

- Fixes priorizados → melissa-perri (incluir no roadmap)
- Redesign de hook → habit-design task (projetar novo loop)
- Churn por posicionamento → april-dunford (repositioning pode ser necessario)
- Churn data → squad-customer-success (alinhar retencao operacional)
- Report → marty-cagan (input para product-review)
