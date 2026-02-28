# Phase: Aquisicao

**Squad:** squad-marketing
**Chief:** thiago-finch
**Agent(s):** thiago-finch, gary-vaynerchuk, depesh-mandalia, andre-chaperon, joe-pulizzi, avinash-kaushik
**Peso:** 10%
**Deliverables:** `deliverables/aquisicao/`

---

## Objetivo

Estruturar a maquina de aquisicao de clientes -- canais pagos e organicos, campanhas, email marketing, analytics -- para gerar trafego qualificado e previsivel que alimente o funil de vendas definido na fase anterior.

## Perguntas-Chave

1. Quais canais de aquisicao sao prioritarios (Meta Ads, Google, organico, email, parceiros)?
2. Qual e o orcamento mensal de marketing e como sera distribuido?
3. Quais campanhas iniciais serao criadas (awareness, conversao, retargeting)?
4. Qual e a estrategia de email marketing (sequences, nurturing)?
5. Quais metricas serao acompanhadas (CAC, ROAS, CPL, taxa de conversao)?
6. Como o conteudo (fase anterior) se integra com a aquisicao paga?
7. Qual e o setup de analytics necessario (pixels, UTMs, dashboards)?

## Decisoes Esperadas

1. `canais_prioritarios` -- mix de canais com % de orcamento
2. `orcamento_mensal` -- orcamento total de marketing
3. `campanhas_iniciais` -- lista de campanhas com objetivo e canal
4. `metricas_alvo` -- CAC, ROAS, CPL alvos
5. `email_strategy` -- tipo de sequences e triggers

## Outputs / Deliverables

- `deliverables/aquisicao/channel-strategy.md` -- estrategia de canais com orcamento e prioridades
- `deliverables/aquisicao/campaign-plan.md` -- plano de campanhas iniciais (awareness, conversao, retargeting)
- `deliverables/aquisicao/email-sequences.md` -- sequences de email marketing (welcome, nurture, conversao)
- `deliverables/aquisicao/analytics-setup.md` -- setup de analytics, pixels e dashboards

## Criterios de Conclusao

- [ ] Mix de canais definido com orcamento por canal
- [ ] Plano de campanhas iniciais documentado
- [ ] Email sequences planejadas (pelo menos welcome + nurture)
- [ ] Analytics setup documentado (pixels, UTMs, dashboards)
- [ ] Metricas alvo definidas (CAC, ROAS, CPL)
- [ ] Decisoes registradas em `project-state.yaml`

## Proxima Fase

**retencao** -- A aquisicao traz clientes, a retencao os mantem. Os dados de aquisicao (perfil de cliente, canal de origem) alimentam a estrategia de onboarding e health score.
