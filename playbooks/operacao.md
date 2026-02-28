# Phase: Operacao

**Squad:** squad-agency
**Chief:** ia-agency-chief
**Agent(s):** estrategista-negocios, construtor-agentes, gestor-operacional
**Peso:** 10%
**Deliverables:** `deliverables/operacao/`

---

## Objetivo

Estruturar as operacoes do negocio -- catalogo de servicos, automacoes, ferramentas e fluxo de onboarding -- para que a entrega seja sistematica, replicavel e escalavel.

## Perguntas-Chave

1. Quais servicos serao oferecidos (estrategista-negocios)?
2. Quais ferramentas e plataformas sao necessarias?
3. Quais processos podem ser automatizados (construtor-agentes)?
4. Qual e o fluxo de onboarding do cliente do inicio ao fim?
5. Quais metricas operacionais precisam ser monitoradas (gestor-operacional)?
6. Qual e a capacidade operacional atual (quantos clientes simultaneos)?

## Decisoes Esperadas

1. `service_catalog` -- lista de servicos com escopo e preco
2. `tech_stack` -- ferramentas e plataformas escolhidas
3. `automation_priorities` -- top 5 automacoes a implementar
4. `onboarding_steps` -- etapas do onboarding com responsaveis
5. `operational_capacity` -- capacidade inicial definida

## Outputs / Deliverables

- `deliverables/operacao/service-catalog.md` -- catalogo de servicos completo
- `deliverables/operacao/automation-map.md` -- mapa de automacoes com ferramentas
- `deliverables/operacao/onboarding-flow.md` -- fluxo de onboarding documentado

## Criterios de Conclusao

- [ ] Catalogo de servicos documentado com precos
- [ ] Mapa de automacoes com pelo menos 5 processos identificados
- [ ] Fluxo de onboarding mapeado de ponta a ponta
- [ ] Tech stack definida e justificada
- [ ] Decisoes registradas em `project-state.yaml`

## Proxima Fase

**escala** -- As operacoes alimentam a escala: processos sistematizados e automacoes sao pre-requisito para avaliar franqueabilidade e expansao.
