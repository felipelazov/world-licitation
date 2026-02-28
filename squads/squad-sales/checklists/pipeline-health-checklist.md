# Checklist de Saude do Pipeline

**Periodo:** _______________
**Data da Auditoria:** _______________
**Responsavel:** Jacco van der Kooij

---

## 1. Estrutura de Estagios

- [ ] Estagios do pipeline definidos e nomeados (ex: Lead → MQL → SQL → Proposta → Negociacao → Fechado)
- [ ] Criterios de entrada e saida de cada estagio documentados
- [ ] Cada estagio tem acao obrigatoria antes de avancar deal
- [ ] Estagios refletem a jornada de compra do CLIENTE (nao o processo interno)
- [ ] Nenhum estagio "lixeira" onde deals ficam parados sem acao

## 2. Velocidade do Pipeline

- [ ] Tempo medio em cada estagio medido e documentado
- [ ] Ciclo de venda medio calculado (dias do primeiro contato ao fechamento)
- [ ] Deals estagnados ha mais de 2x o ciclo medio identificados
- [ ] Acoes de aceleracao definidas para deals lentos
- [ ] Benchmark de velocidade por segmento/produto estabelecido

## 3. Taxas de Conversao

- [ ] Taxa de conversao entre cada estagio rastreada
- [ ] Conversao geral (lead → cliente) calculada e monitorada
- [ ] Estagios com maior queda de conversao identificados
- [ ] Causas de perda documentadas por estagio (preco, timing, concorrente, inacao)
- [ ] Meta de conversao por estagio definida com base em historico

## 4. Previsibilidade e Forecast

- [ ] Forecast mensal/trimestral baseado em dados do pipeline (nao intuicao)
- [ ] Pesos de probabilidade atribuidos por estagio (ex: Proposta = 50%)
- [ ] Pipeline coverage ratio calculado (pipeline / meta >= 3x)
- [ ] Forecast comparado com resultado real do periodo anterior (acuracia)
- [ ] Deals de "commit" vs "upside" separados na previsao

## 5. Higiene do Pipeline

- [ ] Deals sem atividade ha 30+ dias revisados ou removidos
- [ ] Valor total do pipeline auditado (remover deals inflados)
- [ ] Deals sem proximo passo definido corrigidos ou desqualificados
- [ ] Pipeline review semanal com time de vendas acontecendo
- [ ] CRM atualizado com informacoes corretas em todos os campos obrigatorios

---

## Score de Saude

| Secao | Items OK / Total | Score |
|-------|-----------------|-------|
| Estrutura | {x/5} | {%} |
| Velocidade | {x/5} | {%} |
| Conversao | {x/5} | {%} |
| Forecast | {x/5} | {%} |
| Higiene | {x/5} | {%} |
| **TOTAL** | **{x/25}** | **{%}** |

**SAUDAVEL:** >= 80% | **ATENCAO:** 60-79% | **CRITICO:** < 60%
