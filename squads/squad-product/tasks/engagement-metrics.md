# engagement-metrics

> Task do Nir Eyal (Retention) — Framework de Metricas de Engajamento

**Task ID:** engagement-metrics
**Owner:** nir-eyal
**Squad:** squad-product
**Pattern:** PD-RT-003

---

## Task Anatomy

| Campo | Valor |
|-------|-------|
| **Input** | Produto em operacao com dados de uso |
| **Output** | Framework de metricas de engajamento + thresholds + alertas |
| **Pre-conditions** | Produto live com analytics configurado |
| **Trigger** | Setup inicial de metricas, ou revisao quando retention goals mudam |

---

## Overview

Metricas de engajamento medem se o Hook esta funcionando. Nir Eyal define os indicadores que revelam se usuarios estao na Habit Zone ou em risco de churn. "Through consecutive Hook cycles, successful products reach their ultimate goal of unprompted user engagement."

---

## Action Items

### Step 1: Definir Metricas Core
- **DAU/MAU Ratio:** Indicador de stickiness (meta: > 0.3 para B2B, > 0.5 para consumer)
- **Retention Curves:** D1, D7, D30, D90 — onde a curva estabiliza?
- **Session Frequency:** Quantas vezes por semana o usuario volta?
- **Time to Value:** Quanto tempo ate o usuario experimentar valor?
- **Feature Adoption:** % de usuarios que usam features core

### Step 2: Definir Thresholds por Zona
- **Habit Zone (verde):** Metricas acima do threshold — usuario habituado
- **At-Risk Zone (amarelo):** Metricas caindo — precisa de intervencao
- **Churn Zone (vermelho):** Metricas abaixo do minimo — risco iminente
- Para cada zona: acoes recomendadas

### Step 3: Configurar Alertas
- Alerta quando usuario migra de zona (verde → amarelo, amarelo → vermelho)
- Alerta quando cohort inteiro mostra decline
- Alerta quando feature adoption cai significativamente
- Alertas vao para: Nir Eyal (product) + squad-customer-success (CS ops)

### Step 4: Criar Dashboard de Engagement
- Visao cohort: como cada grupo de usuarios evolui
- Visao individual: health score por usuario
- Visao feature: quais features geram mais engagement
- Comparacao temporal: semana vs semana, mes vs mes

### Step 5: Definir Cadencia de Review
- Semanal: check rapido de metricas core
- Mensal: analise de cohorts e trends
- Trimestral: revisao completa de thresholds e zonas

---

## Acceptance Criteria

1. Metricas core definidas com thresholds numericos
2. 3 zonas definidas (Habit, At-Risk, Churn) com criterios claros
3. Sistema de alertas configurado para migracoes de zona
4. Dashboard de engagement projetado
5. Cadencia de review definida

---

## Veto Conditions

- NAO usar vanity metrics (page views, downloads) como indicador de engagement real
- NAO definir thresholds sem baseline — medir primeiro, definir threshold depois
- NAO ignorar cohort analysis — media geral esconde problemas em segmentos

---

## Output Example

```yaml
engagement_framework:
  metricas_core:
    dau_mau_ratio:
      baseline: 0.22
      threshold_habit: ">= 0.35"
      threshold_risk: "0.15 - 0.34"
      threshold_churn: "< 0.15"
    retention:
      d1: { baseline: 55, target: 65, churn_threshold: 40 }
      d7: { baseline: 38, target: 50, churn_threshold: 25 }
      d30: { baseline: 25, target: 40, churn_threshold: 15 }
    session_frequency:
      baseline: "2.1x/semana"
      target: "4x/semana"
      churn_threshold: "< 1x/semana por 2 semanas"
    time_to_value:
      baseline: "3.2 dias"
      target: "< 1 dia"

  zonas:
    habit_zone:
      criterio: "DAU/MAU > 0.35 AND D30 > 40% AND frequency > 3x/sem"
      acao: "Monitorar + identificar upsell signals"
    at_risk:
      criterio: "DAU/MAU 0.15-0.35 OR D30 15-40% OR frequency 1-3x/sem"
      acao: "Trigger externo de re-engagement + revisar hook"
    churn_zone:
      criterio: "DAU/MAU < 0.15 OR D30 < 15% OR frequency < 1x/sem"
      acao: "Alerta CS + campanha de reativacao + churn diagnosis"

  alertas:
    - tipo: "Migracao de zona"
      destino: ["nir-eyal", "squad-customer-success"]
    - tipo: "Cohort decline > 10%"
      destino: ["marty-cagan", "melissa-perri"]

  cadencia:
    semanal: "Check rapido metricas core (15 min)"
    mensal: "Cohort analysis + trend review (1h)"
    trimestral: "Revisao completa de thresholds (2h)"
```

---

## Handoff

- Metricas → squad-customer-success (alinhamento CS operacional)
- Alertas de churn zone → churn-diagnosis task
- Trends preocupantes → melissa-perri (priorizar no roadmap)
- Metricas de sucesso → marty-cagan (product review input)
