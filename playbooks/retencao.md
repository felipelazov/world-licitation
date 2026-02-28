# Phase: Retencao

**Squad:** squad-customer-success
**Chief:** lincoln-murphy
**Agent(s):** lincoln-murphy, donna-weber, shep-hyken, joey-coleman, wayne-mcculloch
**Peso:** 8%
**Deliverables:** `deliverables/retencao/`

---

## Objetivo

Estruturar o sistema de retencao e sucesso do cliente -- onboarding, health score, prevencao de churn e deteccao de upsell -- para maximizar o LTV e transformar clientes em promotores do negocio.

## Perguntas-Chave

1. Qual e o fluxo de onboarding ideal (primeiros 30, 60, 90 dias)?
2. Quais metricas definem um cliente saudavel (health score)?
3. Quais sao os sinais de churn e como detectar precocemente?
4. Qual e o NPS/CSAT esperado e como sera medido?
5. Quais sao os momentos de upsell/cross-sell naturais?
6. Como o suporte sera estruturado (canais, SLA, escalacao)?
7. Como transformar clientes satisfeitos em referrals?

## Decisoes Esperadas

1. `onboarding_stages` -- etapas do onboarding com marcos de sucesso
2. `health_score_model` -- indicadores e pesos do health score
3. `churn_signals` -- sinais de alerta de churn mapeados
4. `nps_target` -- NPS alvo e frequencia de medicao
5. `support_model` -- modelo de suporte (canais, SLA)

## Outputs / Deliverables

- `deliverables/retencao/onboarding-playbook.md` -- playbook de onboarding com etapas, marcos e responsaveis
- `deliverables/retencao/health-score-model.md` -- modelo de health score com indicadores e thresholds
- `deliverables/retencao/churn-prevention.md` -- mapa de sinais de churn e acoes preventivas
- `deliverables/retencao/cs-metrics.md` -- metricas de CS (NPS, CSAT, churn rate, LTV, expansion revenue)

## Criterios de Conclusao

- [ ] Fluxo de onboarding documentado (30/60/90 dias)
- [ ] Health score model definido com indicadores e thresholds
- [ ] Sinais de churn mapeados com acoes preventivas
- [ ] Metricas de CS definidas com targets
- [ ] Modelo de suporte documentado
- [ ] Decisoes registradas em `project-state.yaml`

## Proxima Fase

**operacao** -- A retencao define o que precisa funcionar. A operacao sistematiza: automacoes de follow-up, alertas de churn, dashboards de health score, SOPs de atendimento.
