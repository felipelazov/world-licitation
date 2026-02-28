# Weekly Support Report

**Periodo:** {week_start} a {week_end}
**Data de Geracao:** {report_date}
**Responsavel:** {support_lead}

---

## Resumo da Semana

| Metrica | Valor | Meta | vs Semana Anterior | Status |
|---------|-------|------|--------------------|--------|
| **Tickets Abertos** | {tickets_opened} | — | {opened_change} | — |
| **Tickets Resolvidos** | {tickets_resolved} | — | {resolved_change} | — |
| **Tickets Pendentes (backlog)** | {tickets_pending} | <= {pending_target} | {pending_change} | {pending_status} |
| **CSAT Medio** | {csat_avg}/5.0 | >= 4.0 | {csat_change} | {csat_status} |
| **Tempo Medio 1a Resposta** | {avg_first_response} | <= 2h | {first_response_change} | {first_response_status} |
| **Tempo Medio Resolucao** | {avg_resolution_time} | <= 8h | {resolution_change} | {resolution_status} |

---

## Distribuicao por Nivel

| Nivel | Quantidade | % do Total | Resolvidos | Pendentes | SLA Compliance |
|-------|-----------|-----------|-----------|-----------|----------------|
| **N1** (simples) | {n1_total} | {n1_pct}% | {n1_resolved} | {n1_pending} | {n1_sla}% |
| **N2** (investigacao) | {n2_total} | {n2_pct}% | {n2_resolved} | {n2_pending} | {n2_sla}% |
| **N3** (critico) | {n3_total} | {n3_pct}% | {n3_resolved} | {n3_pending} | {n3_sla}% |
| **Total** | {total_tickets} | 100% | {total_resolved} | {total_pending} | {total_sla}% |

---

## Performance de SLA

### Primeira Resposta

| Nivel | Target | Realizado | Compliance | Status |
|-------|--------|-----------|-----------|--------|
| N1 | <= 2h | {n1_fr_actual} | {n1_fr_compliance}% | {n1_fr_status} |
| N2 | <= 4h | {n2_fr_actual} | {n2_fr_compliance}% | {n2_fr_status} |
| N3 | <= 30min | {n3_fr_actual} | {n3_fr_compliance}% | {n3_fr_status} |

### Resolucao

| Nivel | Target | Realizado | Compliance | Status |
|-------|--------|-----------|-----------|--------|
| N1 | <= 8h | {n1_res_actual} | {n1_res_compliance}% | {n1_res_status} |
| N2 | <= 24h | {n2_res_actual} | {n2_res_compliance}% | {n2_res_status} |
| N3 | <= 4h | {n3_res_actual} | {n3_res_compliance}% | {n3_res_status} |

### Tickets que Estouraram SLA

| Ticket ID | Cliente | Nivel | SLA Target | Tempo Real | Motivo do Estouro |
|-----------|---------|-------|-----------|-----------|-------------------|
| {sla_breach_id_1} | {sla_breach_client_1} | {sla_breach_level_1} | {sla_breach_target_1} | {sla_breach_actual_1} | {sla_breach_reason_1} |
| {sla_breach_id_2} | {sla_breach_client_2} | {sla_breach_level_2} | {sla_breach_target_2} | {sla_breach_actual_2} | {sla_breach_reason_2} |

---

## Distribuicao por Categoria

| Categoria | Quantidade | % do Total | Tendencia |
|-----------|-----------|-----------|-----------|
| Duvida de uso | {cat_question_count} | {cat_question_pct}% | {cat_question_trend} |
| Bug de produto | {cat_bug_count} | {cat_bug_pct}% | {cat_bug_trend} |
| Integracao/API | {cat_integration_count} | {cat_integration_pct}% | {cat_integration_trend} |
| Billing/Financeiro | {cat_billing_count} | {cat_billing_pct}% | {cat_billing_trend} |
| Feature request | {cat_feature_count} | {cat_feature_pct}% | {cat_feature_trend} |
| Acesso/Login | {cat_access_count} | {cat_access_pct}% | {cat_access_trend} |
| Performance | {cat_performance_count} | {cat_performance_pct}% | {cat_performance_trend} |
| Outro | {cat_other_count} | {cat_other_pct}% | {cat_other_trend} |

---

## Satisfacao (CSAT)

### Distribuicao de Notas

| Nota | Quantidade | % |
|------|-----------|---|
| 5 (Excelente) | {csat_5_count} | {csat_5_pct}% |
| 4 (Bom) | {csat_4_count} | {csat_4_pct}% |
| 3 (Regular) | {csat_3_count} | {csat_3_pct}% |
| 2 (Ruim) | {csat_2_count} | {csat_2_pct}% |
| 1 (Pessimo) | {csat_1_count} | {csat_1_pct}% |
| Sem avaliacao | {csat_none_count} | {csat_none_pct}% |

### Clientes Insatisfeitos (CSAT <= 3)

| Cliente | Empresa | Ticket | CSAT | Motivo | Acao Recomendada |
|---------|---------|--------|------|--------|-----------------|
| {unsat_client_1} | {unsat_company_1} | {unsat_ticket_1} | {unsat_csat_1} | {unsat_reason_1} | {unsat_action_1} |
| {unsat_client_2} | {unsat_company_2} | {unsat_ticket_2} | {unsat_csat_2} | {unsat_reason_2} | {unsat_action_2} |

---

## Top 5 Problemas Recorrentes

Problemas que apareceram 3 ou mais vezes na semana e precisam de atencao do time de Produto.

### 1. {recurring_problem_1}

| Campo | Detalhe |
|-------|---------|
| **Frequencia** | {freq_1} tickets esta semana |
| **Clientes Afetados** | {affected_1} |
| **Impacto** | {impact_1} |
| **Causa Provavel** | {probable_cause_1} |
| **Sugestao para Produto** | {suggestion_1} |
| **Tickets Relacionados** | {related_tickets_1} |

### 2. {recurring_problem_2}

| Campo | Detalhe |
|-------|---------|
| **Frequencia** | {freq_2} tickets esta semana |
| **Clientes Afetados** | {affected_2} |
| **Impacto** | {impact_2} |
| **Causa Provavel** | {probable_cause_2} |
| **Sugestao para Produto** | {suggestion_2} |
| **Tickets Relacionados** | {related_tickets_2} |

### 3. {recurring_problem_3}

| Campo | Detalhe |
|-------|---------|
| **Frequencia** | {freq_3} tickets esta semana |
| **Clientes Afetados** | {affected_3} |
| **Impacto** | {impact_3} |
| **Causa Provavel** | {probable_cause_3} |
| **Sugestao para Produto** | {suggestion_3} |
| **Tickets Relacionados** | {related_tickets_3} |

### 4. {recurring_problem_4}

| Campo | Detalhe |
|-------|---------|
| **Frequencia** | {freq_4} tickets esta semana |
| **Clientes Afetados** | {affected_4} |
| **Impacto** | {impact_4} |
| **Causa Provavel** | {probable_cause_4} |
| **Sugestao para Produto** | {suggestion_4} |
| **Tickets Relacionados** | {related_tickets_4} |

### 5. {recurring_problem_5}

| Campo | Detalhe |
|-------|---------|
| **Frequencia** | {freq_5} tickets esta semana |
| **Clientes Afetados** | {affected_5} |
| **Impacto** | {impact_5} |
| **Causa Provavel** | {probable_cause_5} |
| **Sugestao para Produto** | {suggestion_5} |
| **Tickets Relacionados** | {related_tickets_5} |

---

## Clientes com Mais Tickets

| # | Cliente | Empresa | Tickets na Semana | Acumulado 30d | Health Score | Acao |
|---|---------|---------|-------------------|---------------|-------------|------|
| 1 | {top_ticket_client_1} | {top_ticket_company_1} | {top_ticket_count_1} | {top_ticket_30d_1} | {top_ticket_hs_1} | {top_ticket_action_1} |
| 2 | {top_ticket_client_2} | {top_ticket_company_2} | {top_ticket_count_2} | {top_ticket_30d_2} | {top_ticket_hs_2} | {top_ticket_action_2} |
| 3 | {top_ticket_client_3} | {top_ticket_company_3} | {top_ticket_count_3} | {top_ticket_30d_3} | {top_ticket_hs_3} | {top_ticket_action_3} |

---

## Base de Conhecimento (KB)

| Metrica | Valor |
|---------|-------|
| **Artigos consultados esta semana** | {kb_articles_consulted} |
| **Artigos novos criados** | {kb_new_articles} |
| **Artigos atualizados** | {kb_updated_articles} |
| **Gaps identificados** | {kb_gaps_count} |

### Gaps na KB (problemas sem artigo)

| Problema | Frequencia | Artigo Necessario |
|----------|------------|-------------------|
| {kb_gap_1} | {kb_gap_freq_1} | {kb_gap_article_1} |
| {kb_gap_2} | {kb_gap_freq_2} | {kb_gap_article_2} |

---

## Wins da Semana

1. {win_1}
2. {win_2}
3. {win_3}

---

## Riscos e Alertas

1. {risk_1}
2. {risk_2}
3. {risk_3}

---

## Acoes para Proxima Semana

- [ ] {action_next_1}
- [ ] {action_next_2}
- [ ] {action_next_3}
- [ ] {action_next_4}

---

## Historico Semanal (ultimas 4 semanas)

| Semana | Tickets | Resolvidos | CSAT | SLA % | Tendencia |
|--------|---------|-----------|------|-------|-----------|
| {week_4_ago} | {hist_tickets_4} | {hist_resolved_4} | {hist_csat_4} | {hist_sla_4}% | — |
| {week_3_ago} | {hist_tickets_3} | {hist_resolved_3} | {hist_csat_3} | {hist_sla_3}% | {hist_trend_3} |
| {week_2_ago} | {hist_tickets_2} | {hist_resolved_2} | {hist_csat_2} | {hist_sla_2}% | {hist_trend_2} |
| {week_current} | {hist_tickets_1} | {hist_resolved_1} | {hist_csat_1} | {hist_sla_1}% | {hist_trend_1} |

---

_Template: weekly-support-report v1.0_
_Squad: squad-customer-success_
_Owner: shep-hyken_
_Frequencia: Toda segunda-feira ate 12h_
