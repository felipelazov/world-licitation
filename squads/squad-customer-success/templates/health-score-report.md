# Health Score Report

**Periodo:** {report_period}
**Data de Geracao:** {report_date}
**Responsavel:** {cs_manager}
**Total de Clientes Ativos:** {total_active_clients}

---

## Resumo Executivo

| Metrica | Valor | Tendencia vs Periodo Anterior |
|---------|-------|-------------------------------|
| **Health Score Medio** | {avg_health_score}/100 | {trend_direction} ({trend_change_pts} pts) |
| **Clientes Saudaveis (80-100)** | {healthy_count} ({healthy_pct}%) | {healthy_trend} |
| **Clientes Atencao (60-79)** | {attention_count} ({attention_pct}%) | {attention_trend} |
| **Clientes Risco (40-59)** | {risk_count} ({risk_pct}%) | {risk_trend} |
| **Clientes Criticos (0-39)** | {critical_count} ({critical_pct}%) | {critical_trend} |

---

## Distribuicao por Zona

```
Saudavel (80-100):  [{healthy_bar}] {healthy_count} clientes ({healthy_pct}%)
Atencao  (60-79):   [{attention_bar}] {attention_count} clientes ({attention_pct}%)
Risco    (40-59):   [{risk_bar}] {risk_count} clientes ({risk_pct}%)
Critico  (0-39):    [{critical_bar}] {critical_count} clientes ({critical_pct}%)
```

---

## Dimensoes do Health Score

Media por dimensao em toda a base:

| Dimensao | Peso | Score Medio | vs Anterior | Status |
|----------|------|-------------|-------------|--------|
| **Uso do Produto** | 30% | {usage_score}/100 | {usage_trend} | {usage_status} |
| **Satisfacao** | 25% | {satisfaction_score}/100 | {satisfaction_trend} | {satisfaction_status} |
| **Suporte** | 20% | {support_score}/100 | {support_trend} | {support_status} |
| **Engajamento** | 15% | {engagement_score}/100 | {engagement_trend} | {engagement_status} |
| **Contrato** | 10% | {contract_score}/100 | {contract_trend} | {contract_status} |

---

## Movimentacoes de Zona

### Melhoraram (subiram de zona)

| Cliente | Empresa | De | Para | Score | Motivo |
|---------|---------|------|------|-------|--------|
| {client_name_1} | {company_1} | {from_zone_1} | {to_zone_1} | {score_1} | {reason_1} |
| {client_name_2} | {company_2} | {from_zone_2} | {to_zone_2} | {score_2} | {reason_2} |

### Pioraram (cairam de zona)

| Cliente | Empresa | De | Para | Score | Motivo | Acao |
|---------|---------|------|------|-------|--------|------|
| {client_name_3} | {company_3} | {from_zone_3} | {to_zone_3} | {score_3} | {reason_3} | {action_3} |
| {client_name_4} | {company_4} | {from_zone_4} | {to_zone_4} | {score_4} | {reason_4} | {action_4} |

---

## Clientes em Risco (Score < 60)

### Zona Vermelha (Critico: 0-39)

| Cliente | Empresa | Score | Dias na Zona | Causa Raiz | Acao em Andamento | Responsavel |
|---------|---------|-------|-------------|------------|-------------------|-------------|
| {crit_client_1} | {crit_company_1} | {crit_score_1} | {crit_days_1} | {crit_cause_1} | {crit_action_1} | {crit_owner_1} |

### Zona Laranja (Risco: 40-59)

| Cliente | Empresa | Score | Dias na Zona | Causa Raiz | Acao em Andamento | Responsavel |
|---------|---------|-------|-------------|------------|-------------------|-------------|
| {risk_client_1} | {risk_company_1} | {risk_score_1} | {risk_days_1} | {risk_cause_1} | {risk_action_1} | {risk_owner_1} |
| {risk_client_2} | {risk_company_2} | {risk_score_2} | {risk_days_2} | {risk_cause_2} | {risk_action_2} | {risk_owner_2} |

---

## Top 10 — Clientes Mais Saudaveis

| # | Cliente | Empresa | Score | Plano | Meses Ativo | Sinal de Upsell |
|---|---------|---------|-------|-------|-------------|----------------|
| 1 | {top_client_1} | {top_company_1} | {top_score_1} | {top_plan_1} | {top_months_1} | {top_upsell_1} |
| 2 | {top_client_2} | {top_company_2} | {top_score_2} | {top_plan_2} | {top_months_2} | {top_upsell_2} |
| 3 | {top_client_3} | {top_company_3} | {top_score_3} | {top_plan_3} | {top_months_3} | {top_upsell_3} |
| 4 | {top_client_4} | {top_company_4} | {top_score_4} | {top_plan_4} | {top_months_4} | {top_upsell_4} |
| 5 | {top_client_5} | {top_company_5} | {top_score_5} | {top_plan_5} | {top_months_5} | {top_upsell_5} |
| 6 | {top_client_6} | {top_company_6} | {top_score_6} | {top_plan_6} | {top_months_6} | {top_upsell_6} |
| 7 | {top_client_7} | {top_company_7} | {top_score_7} | {top_plan_7} | {top_months_7} | {top_upsell_7} |
| 8 | {top_client_8} | {top_company_8} | {top_score_8} | {top_plan_8} | {top_months_8} | {top_upsell_8} |
| 9 | {top_client_9} | {top_company_9} | {top_score_9} | {top_plan_9} | {top_months_9} | {top_upsell_9} |
| 10 | {top_client_10} | {top_company_10} | {top_score_10} | {top_plan_10} | {top_months_10} | {top_upsell_10} |

---

## Detalhamento Individual

### {client_name} — {company_name}

| Dimensao | Score | Detalhe |
|----------|-------|---------|
| Uso do Produto | {ind_usage}/100 | {ind_usage_detail} |
| Satisfacao | {ind_satisfaction}/100 | {ind_satisfaction_detail} |
| Suporte | {ind_support}/100 | {ind_support_detail} |
| Engajamento | {ind_engagement}/100 | {ind_engagement_detail} |
| Contrato | {ind_contract}/100 | {ind_contract_detail} |
| **TOTAL** | **{ind_total}/100** | **Zona: {ind_zone}** |

**Ultimo contato:** {last_contact_date} ({last_contact_channel})
**Proximo contato:** {next_contact_date}
**Renovacao:** {renewal_date} (em {days_to_renewal} dias)
**Observacoes:** {observations}

_(Repetir este bloco para cada cliente)_

---

## Metricas Agregadas

| Metrica | Valor Atual | Meta | Status |
|---------|-------------|------|--------|
| **Health Score Medio** | {avg_score} | >= 75 | {score_status} |
| **% Clientes Saudaveis** | {healthy_pct}% | >= 60% | {healthy_status} |
| **% Clientes em Risco** | {risk_total_pct}% | <= 15% | {risk_status} |
| **Churn Rate (periodo)** | {churn_rate}% | <= 5% | {churn_status} |
| **NPS Medio** | {avg_nps} | >= 50 | {nps_status} |
| **Time to First Value (media)** | {avg_ttfv} dias | <= 14 | {ttfv_status} |
| **Expansion Revenue** | R$ {expansion_revenue} | R$ {expansion_target} | {expansion_status} |

---

## Acoes Recomendadas

### Urgentes (esta semana)

1. {urgent_action_1}
2. {urgent_action_2}
3. {urgent_action_3}

### Planejadas (proximo mes)

1. {planned_action_1}
2. {planned_action_2}
3. {planned_action_3}

### Estrategicas (proximo trimestre)

1. {strategic_action_1}
2. {strategic_action_2}

---

## Historico de Health Score Medio

| Periodo | Score | Variacao |
|---------|-------|----------|
| {period_1} | {hist_score_1} | — |
| {period_2} | {hist_score_2} | {hist_change_2} |
| {period_3} | {hist_score_3} | {hist_change_3} |
| {period_4} | {hist_score_4} | {hist_change_4} |
| {period_5} (atual) | {hist_score_5} | {hist_change_5} |

---

_Template: health-score-report v1.0_
_Squad: squad-customer-success_
_Owner: joey-coleman_
_Frequencia recomendada: Quinzenal ou Mensal_
