# Retention Health Checklist (Product-Side)

**Produto:** _______________
**Periodo:** _______________
**Responsavel:** Nir Eyal

---

## 1. Hook Model Health

- [ ] Hook model documentado e atualizado (4 fases)
- [ ] Trigger interno identificado (emocao + contexto)
- [ ] Action simplificada (< 3 cliques, < 30 seg ate valor)
- [ ] Variable reward ativa com variabilidade REAL
- [ ] Investment loop fecha o ciclo (carrega proximo trigger)
- [ ] Manipulation Matrix = Facilitator
- [ ] Nenhum dark pattern identificado

## 2. Metricas de Engajamento

- [ ] DAU/MAU ratio medido e dentro do target
- [ ] D1 retention medido e dentro do target
- [ ] D7 retention medido e dentro do target
- [ ] D30 retention medido e dentro do target
- [ ] Session frequency medida e dentro do target
- [ ] Time to value medido e dentro do target
- [ ] Feature adoption rate medido para features core

## 3. Zonas de Engajamento

- [ ] Usuarios classificados por zona (Habit / At-Risk / Churn)
- [ ] % de usuarios na Habit Zone >= {target}%
- [ ] % de usuarios na Churn Zone <= {threshold}%
- [ ] Alertas de migracao de zona configurados e funcionando
- [ ] Acoes automaticas por zona definidas

## 4. Cohort Analysis

- [ ] Cohorts mensais analisados
- [ ] Retention curve comparada entre cohorts
- [ ] Cohorts com decline investigados
- [ ] "Aha moment" identificado e medido
- [ ] Conversao para "aha moment" monitorada

## 5. Churn Analysis (Product-Side)

- [ ] Churn rate medido e dentro do target
- [ ] Churn segmentado por causa (trigger/action/reward/investment)
- [ ] Top 3 causas de churn identificadas
- [ ] Fixes propostos para causa #1
- [ ] Churn por mudanca de contexto separado (nao e problema de produto)

## 6. Alinhamento com CS

- [ ] Metricas de retention alinhadas com squad-customer-success
- [ ] Alertas de churn zone compartilhados com CS
- [ ] Feedback de CS integrado na analise de churn
- [ ] Nao ha duplicacao de esforco product vs CS

## 7. Etica e Bem-Estar

- [ ] Tempo de uso e saudavel (nao excessivo)
- [ ] Notificacoes nao sao abusivas
- [ ] Usuario pode controlar frequencia de comunicacao
- [ ] Nao ha mecanismos de dependencia nociva
- [ ] "Indistractable" check: produto ajuda foco, nao distrai

---

## Score de Saude

| Secao | Items OK / Total | Score |
|-------|-----------------|-------|
| Hook Model Health | {x/7} | {%} |
| Metricas de Engajamento | {x/7} | {%} |
| Zonas de Engajamento | {x/5} | {%} |
| Cohort Analysis | {x/5} | {%} |
| Churn Analysis | {x/5} | {%} |
| Alinhamento com CS | {x/4} | {%} |
| Etica e Bem-Estar | {x/5} | {%} |
| **TOTAL** | **{x/38}** | **{%}** |

**SAUDAVEL:** >= 80% | **ATENCAO:** 60-79% | **CRITICO:** < 60%

---

## Cadencia

- **Semanal:** Check rapido de metricas core (secoes 2-3)
- **Mensal:** Analise completa (todas as secoes)
- **Trimestral:** Revisao de thresholds, targets, e hook model
