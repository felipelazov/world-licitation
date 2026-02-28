# Checklist de Transicao — Phase Transition

Executar ANTES de iniciar a proxima fase do projeto.
Garante que a fase anterior entregou tudo que a proxima precisa.
Sem isso, squads downstream trabalham com base incompleta.

---

## Contexto da Transicao

| Campo | Valor |
|-------|-------|
| Fase concluindo | _____________________ |
| Squad responsavel | _____________________ |
| Proxima fase | _____________________ |
| Proximo squad | _____________________ |
| Data | _____________________ |

---

## 1. Estado da Fase Atual

- [ ] Fase marcada como `concluido` em `project-state.yaml` > `progresso.fases`
- [ ] `progresso.fase_atual` ainda aponta para a fase que esta concluindo
- [ ] `progresso.geral` recalculado com o peso da fase concluida
- [ ] Se a fase teve sub-etapas: todas concluidas ou explicitamente ignoradas

> **Risco se falhar:** Fase marcada como concluida sem estar. Progresso inflado. Gaps silenciosos.

## 2. Deliverables da Fase

- [ ] Pasta `deliverables/` tem os outputs esperados da fase
- [ ] Cada deliverable esta completo (nao e rascunho ou placeholder)
- [ ] Nomes de arquivo seguem o padrao `{tipo}-{descricao}.{ext}`
- [ ] Checklist interno do squad foi executado e aprovado (se existir)
- [ ] Nenhum deliverable prometido esta faltando

> **Risco se falhar:** Proxima fase comeca sem os inputs que precisa. Retrabalho garantido.

## 3. Decisoes Registradas

- [ ] Todas as decisoes significativas da fase estao em `project-state.yaml` > `decisoes`
- [ ] Cada decisao tem `impacta` preenchido (quais squads precisam saber)
- [ ] Decisoes tem `contexto` suficiente (nao so o que, mas o por que)
- [ ] Nenhuma decisao importante ficou apenas na conversa (nao registrada)

> **Risco se falhar:** Decisoes perdidas. Proximo squad toma decisoes contraditorias sem saber.

## 4. Sinapses Criadas

- [ ] Sinapses criadas para CADA squad impactado pelas decisoes da fase
- [ ] Cada sinapse tem campo `acao` concreto (o que o destino deve FAZER)
- [ ] Campo `contexto` explica POR QUE o destino precisa saber
- [ ] Sinapses apontam para squads corretos (ID valido)
- [ ] Status das sinapses e `pendente` (prontas para consumo)

> **Risco se falhar:** Sinapses vagas ou ausentes. Comunicacao inter-squad quebra. Core do World OS falha.

## 5. Contexto de Negocio Atualizado

- [ ] Campos do `negocio` correspondentes a fase estao preenchidos
- [ ] Campos preenchidos sao consistentes com as decisoes registradas
- [ ] Nenhum campo critico ficou vazio (conforme mapeamento squad → campos)
- [ ] Campos nao contradizem decisoes de fases anteriores

> **Risco se falhar:** Agentes da proxima fase leem contexto desatualizado ou vazio. Trabalham no escuro.

## 6. Ultima Sessao Atualizada

- [ ] `ultima_sessao.data` reflete a data da conclusao
- [ ] `ultima_sessao.squad` e `ultima_sessao.agent` corretos
- [ ] `ultima_sessao.fase` aponta para a fase que concluiu
- [ ] `ultima_sessao.resumo` descreve o que foi feito (1-2 frases)
- [ ] `ultima_sessao.proximo_passo` descreve o que a PROXIMA fase deve fazer
- [ ] `ultima_sessao.decisoes_tomadas` lista as decisoes chave

> **Risco se falhar:** Maestro nao consegue gerar greeting contextual. Proximo squad comeca sem resumo.

## 7. Prontidao da Proxima Fase

- [ ] Proxima fase marcada como `pendente` (nao `ignorado`) no state
- [ ] Squad da proxima fase esta acessivel (skill funciona)
- [ ] Sinapses pendentes para o proximo squad existem e sao claras
- [ ] Nao ha pre-requisitos faltando para a proxima fase
- [ ] `progresso.fase_atual` pode ser atualizado para a proxima fase

> **Risco se falhar:** Proxima fase comeca mas esta bloqueada por dependencia nao resolvida.

---

## Scoring

| Secao | Itens | Score |
|-------|-------|-------|
| Estado da fase | /4 | _____ |
| Deliverables | /5 | _____ |
| Decisoes | /4 | _____ |
| Sinapses | /5 | _____ |
| Negocio | /4 | _____ |
| Ultima sessao | /6 | _____ |
| Prontidao | /5 | _____ |
| **TOTAL** | **/33** | _____ |

**Interpretacao:**
- **28-33:** TRANSICAO APROVADA — Pode iniciar proxima fase
- **22-27:** ATENCAO — Completar itens faltantes antes de avancar
- **15-21:** ALERTA — Gaps significativos. Nao avancar sem resolver
- **< 15:** BLOQUEADO — Fase atual nao esta concluida. Voltar e completar

---

**Revisado por:** ____________________
**Data:** ____________________
