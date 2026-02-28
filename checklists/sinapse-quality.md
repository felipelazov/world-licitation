# Checklist de Qualidade — Sinapse Quality

Executar PERIODICAMENTE (a cada 3-4 sessoes) ou quando sinapses acumulam.
Sinapses sao o sistema nervoso do World OS. Se a qualidade cair,
a comunicacao entre squads morre silenciosamente.

---

## Contexto da Auditoria

| Campo | Valor |
|-------|-------|
| Data da auditoria | _____________________ |
| Total de sinapses no state | _____________________ |
| Pendentes | _____________________ |
| Entregues | _____________________ |
| Responsavel pela auditoria | _____________________ |

---

## 1. Sinapses Pendentes — Idade

- [ ] Nenhuma sinapse `pendente` ha mais de 2 sessoes de trabalho
- [ ] Sinapses pendentes antigas tem justificativa (squad destino ainda nao foi ativado)
- [ ] Sinapses pendentes apontam para squads que SERAO ativados (nao ignorados)
- [ ] Se ha sinapses antigas sem justificativa: listadas para acao imediata

> **Risco se falhar:** Sinapses acumulam e viram ruido. Squads param de prestar atencao.

## 2. Qualidade do Campo `acao`

- [ ] Toda sinapse tem campo `acao` preenchido
- [ ] `acao` descreve algo CONCRETO que o destino deve fazer (nao generico)
- [ ] `acao` e acionavel sem precisar ler a sessao original
- [ ] Nenhuma acao tipo "considerar", "avaliar" ou "levar em conta" sem especificidade
- [ ] `acao` e realista para o escopo do squad destino

**Exemplos de acao BOA vs RUIM:**

| Ruim | Boa |
|------|-----|
| "Levar em conta o posicionamento" | "Usar tom profissional-acessivel. Cores devem transmitir confianca tecnologica." |
| "Considerar na estrategia" | "Criar 3 pilares de conteudo baseados no WHY: democratizar IA para PMEs." |
| "Alinhar com decisoes" | "Preco de R$2.500/mes definido. Ajustar proposta comercial para refletir." |

> **Risco se falhar:** Squad destino recebe sinapse mas nao sabe O QUE fazer com ela. Comunicacao inutil.

## 3. Qualidade do Campo `contexto`

- [ ] Toda sinapse tem campo `contexto` preenchido
- [ ] `contexto` explica POR QUE o destino precisa saber (nao so O QUE)
- [ ] `contexto` e auto-suficiente (nao depende de informacao externa)
- [ ] `contexto` inclui informacao relevante para o DESTINO (nao para a origem)

> **Risco se falhar:** Squad destino sabe o que fazer mas nao entende por que. Execucao mecanica sem contexto.

## 4. Sinapses Orfas

- [ ] Toda sinapse `para` aponta para um squad valido (existe em `project-state.yaml` > `squads`)
- [ ] Nenhuma sinapse aponta para squad que nao sera usado neste projeto
- [ ] Nenhuma sinapse aponta para fase marcada como `ignorado`
- [ ] Squad destino realmente precisa da informacao (nao e spam)

> **Risco se falhar:** Sinapses para lugar nenhum. Poluem o state. Confundem o Maestro.

## 5. Sinapses Duplicadas

- [ ] Nenhuma sinapse repete a MESMA decisao para o MESMO destino
- [ ] Se ha sinapses relacionadas para o mesmo destino: consolidadas em uma so
- [ ] IDs de sinapse sao sequenciais e unicos (sem SIN-001 duplicado)

> **Risco se falhar:** Squad destino recebe informacao repetida. Confusao sobre qual e a versao correta.

## 6. Coerencia com Decisoes

- [ ] Toda sinapse referencia uma decisao que EXISTE em `decisoes[]`
- [ ] Informacao na sinapse e CONSISTENTE com a decisao original
- [ ] Nenhuma sinapse contradiz outra sinapse para o mesmo destino
- [ ] Nenhuma sinapse contradiz o `negocio` do state

> **Risco se falhar:** Squad destino recebe informacao que conflita com o estado do projeto. Decisoes divergentes.

## 7. Sinapses Entregues — Verificacao

- [ ] Sinapses marcadas como `entregue` foram realmente consumidas (squad destino agiu)
- [ ] Nenhuma sinapse marcada como `entregue` sem evidencia de consumo
- [ ] Se a acao da sinapse gerou trabalho: resultado e visivel nos deliverables

> **Risco se falhar:** Sinapses marcadas como entregues sem efeito real. Falsa sensacao de comunicacao.

---

## Scoring

| Secao | Itens | Score |
|-------|-------|-------|
| Idade | /4 | _____ |
| Campo acao | /5 | _____ |
| Campo contexto | /4 | _____ |
| Orfas | /4 | _____ |
| Duplicadas | /3 | _____ |
| Coerencia | /4 | _____ |
| Entregues | /3 | _____ |
| **TOTAL** | **/27** | _____ |

**Interpretacao:**
- **23-27:** SAUDAVEL — Sinapses funcionando como esperado
- **18-22:** ATENCAO — Itens a corrigir. Comunicacao parcialmente degradada
- **12-17:** ALERTA — Qualidade baixa. Squads provavelmente perdendo contexto
- **< 12:** CRITICO — Sistema de sinapses quebrado. Parar e corrigir antes de continuar

---

## Acoes Corretivas

| Problema | Acao |
|----------|------|
| Sinapses antigas pendentes | Ativar squad destino ou remover sinapse com justificativa |
| Acao vaga | Reescrever com acao concreta e especifica |
| Sinapse orfa | Remover e documentar motivo |
| Duplicada | Consolidar em uma unica sinapse |
| Contradiz estado | Corrigir sinapse ou atualizar estado |

---

**Auditado por:** ____________________
**Data:** ____________________
