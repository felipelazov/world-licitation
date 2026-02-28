# Phase: Business DNA Blueprint

**Squad:** squad-product
**Chief:** marty-cagan
**Agent(s):** marty-cagan
**Peso:** 10%
**Deliverables:** `deliverables/business-dna/`

---

## Objetivo

Consolidar TODAS as decisoes dos 3 advisors (Sinek, Hormozi, Jobs) em um unico documento estrategico — o Business DNA Blueprint. Este documento e o briefing definitivo que alimenta todos os squads downstream com informacao acionavel, eliminando interpretacao e ambiguidade.

## Pre-Requisitos

Antes de iniciar esta fase, os seguintes dados DEVEM existir em `project-state.yaml`:

- **WHY/HOW/WHAT** — definidos por Sinek na fase proposito
- **Oferta principal** — definida por Hormozi na fase produto
- **Features essenciais** — definidas por Jobs na fase visao-produto

Se algum pre-requisito estiver ausente, a fase NAO deve iniciar. Recomendar conclusao da fase pendente primeiro.

## Perguntas-Chave

1. Qual e a narrativa estrategica completa (WHY → HOW → WHAT) em formato storytelling?
2. Como a oferta irrecusavel se traduz em formato utilizavel por outros squads?
3. Quais features ficaram e quais foram cortadas — e qual o rationale de cada decisao?
4. O que este negocio NAO e? (Anti-briefing com >= 5 itens)
5. Qual o mapa completo de decisoes dos advisors e seus impactos por squad?
6. Qual o brief acionavel para cada squad ativo no projeto?
7. Quais KPIs compoem o scorecard com baseline, target 90d e squad responsavel?
8. (Condicional) Se projeto.tipo = app/hibrido: como as features mapeiam para requisitos tecnicos (FR, NFR, user stories)?

## Decisoes Esperadas

1. `narrativa_estrategica` — storytelling coeso do WHY/HOW/WHAT
2. `oferta_formatada` — Grand Slam Offer em formato de briefing
3. `feature_map` — features in/out com rationale consolidado
4. `anti_briefing` — lista do que o negocio NAO e (>= 5 itens)
5. `decision_map` — tabela advisor → decisao → impacto → squads
6. `squad_briefs` — um brief por squad ativo
7. `scorecard` — KPIs com baseline + target 90d
8. `prd_bridge` — (condicional) mapeamento features → FR/NFR/user stories

## Outputs / Deliverables

- `deliverables/business-dna/business-dna-blueprint.md` — documento principal (8 secoes)
- `deliverables/business-dna/squad-briefs/{squad-id}-brief.md` — um brief por squad ativo
- `deliverables/business-dna/decision-map.md` — mapa completo de decisoes dos advisors
- `deliverables/business-dna/scorecard.md` — KPIs consolidados
- `deliverables/business-dna/prd-bridge.md` — (condicional, se tipo=app/hibrido) ponte para PRD tecnico

## Criterios de Conclusao

- [ ] Narrativa estrategica documentada em formato storytelling (nao bullets)
- [ ] Oferta irrecusavel formatada para uso por outros squads
- [ ] Feature map com in/out e rationale por decisao
- [ ] Anti-briefing com >= 5 itens claros
- [ ] Mapa de decisoes completo com impacto por squad
- [ ] Briefs gerados para cada squad ativo
- [ ] Scorecard com KPIs, baseline e target 90d
- [ ] (Se app/hibrido) PRD bridge gerado com FR, NFR, user stories
- [ ] Validacao >= 6/8 secoes no checklist `*dna-validate`
- [ ] Decisoes registradas em `project-state.yaml`

## Constitutional Gate

**NADA no Business DNA Blueprint que nao rastreie a uma decisao de advisor.** Cada afirmacao no documento DEVE ter origem em decisao registrada no `project-state.yaml`. Se nao ha decisao de advisor, nao entra no DNA. Isso evita invencao de features, narrativas ou KPIs que nenhum advisor definiu.

## Proxima Fase

**identidade** — O Business DNA Blueprint alimenta a identidade visual: o tom de voz, a personalidade da marca e os componentes de design nascem das decisoes consolidadas no DNA. O design-chief recebe o brief de squad com direcao especifica.
