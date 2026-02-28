# Checklist de Saude — Mid-Project Health Check

Executar a cada 3-4 sessoes de trabalho como auditoria preventiva.
Detecta drift, inconsistencias e gaps ANTES que virem problema na entrega.
Sem isso, problemas so aparecem no `project-delivery.md` — tarde demais.

---

## Contexto do Health Check

| Campo | Valor |
|-------|-------|
| Data do check | _____________________ |
| Sessoes desde ultimo check | _____________________ |
| Fase atual | _____________________ |
| Fases concluidas | _____________________ |
| Responsavel | _____________________ |

---

## 1. Progresso Real vs Registrado

- [ ] `progresso.geral` reflete a realidade (nao esta inflado nem defasado)
- [ ] `progresso.fase_atual` aponta para a fase realmente em andamento
- [ ] Fases marcadas `concluido` realmente tem deliverables entregues
- [ ] Fases marcadas `em_andamento` tem trabalho ativo (nao estagnadas)
- [ ] Nenhuma fase `em_andamento` ha mais de 5 sessoes sem avancar

> **Risco se falhar:** Dashboard do Maestro mostra progresso falso. Decisoes baseadas em dados errados.

## 2. Coerencia de Decisoes

- [ ] Decisoes recentes nao contradizem decisoes anteriores
- [ ] Se houve mudanca de direcao: decisao anterior atualizada com contexto
- [ ] Nenhuma decisao "fantasma" (registrada mas sem efeito nos deliverables)
- [ ] Decisoes de fases diferentes sao compatíveis entre si
- [ ] Campo `impacta` das decisoes reflete os squads corretos

> **Risco se falhar:** Squads trabalham com premissas contraditorias. Resultado final incoerente.

## 3. Completude do Negocio

- [ ] Campos do `negocio` preenchidos sao proporcionais as fases concluidas
- [ ] Nenhum campo vazio para fase ja marcada como `concluido`
- [ ] Campos preenchidos sao consistentes entre si (ex: publico_alvo + oferta fazem sentido)
- [ ] Campos criticos para proximas fases ja tem pelo menos rascunho

**Mapeamento de referencia:**

| Fase concluida | Campos que DEVEM estar preenchidos |
|----------------|-------------------------------------|
| descoberta | (decisoes apenas — zona de genialidade) |
| proposito | why, how, what, causa, publico_alvo, posicionamento |
| produto | oferta_principal, preco, dream_outcome, garantia, diferenciais |
| visao-produto | produto_core, features_essenciais, features_cortadas |
| identidade | tom_de_voz, personalidade_marca, cores, tipografia, logo_descricao |
| conteudo | pilares_conteudo, plataformas, frequencia |
| vendas | meta_vendas, ticket_medio, canal_vendas, funil |
| aquisicao | canais_aquisicao, estrategia_marketing, orcamento_marketing |
| retencao | health_score, churn_rate, nps, fluxo_onboarding_cliente |
| operacao | servicos, ferramentas, automacoes |
| escala | (decisoes apenas — franchise) |

> **Risco se falhar:** Agentes leem contexto incompleto. Fazem suposicoes. Output desconectado.

## 4. Saude das Sinapses

- [ ] Nao ha acumulo de sinapses `pendente` (max 5 pendentes por vez)
- [ ] Sinapses `entregue` realmente resultaram em acao do destino
- [ ] Nenhuma sinapse aponta para squad que nao sera ativado
- [ ] Fluxo de sinapses faz sentido (nao ha loops ou contradicoes)

> **Risco se falhar:** Comunicacao inter-squad degradada. Ver `sinapse-quality.md` para auditoria detalhada.

## 5. Deliverables Existentes

- [ ] Pasta `deliverables/` tem subpastas organizadas por fase
- [ ] Deliverables existem para cada fase marcada como `concluido`
- [ ] Nenhum deliverable e placeholder ou rascunho inacabado
- [ ] Nomes seguem padrao `{tipo}-{descricao}.{ext}`
- [ ] Nenhum arquivo temporario ou de teste misturado

> **Risco se falhar:** Entrega final descobre que deliverables estao faltando ou incompletos.

## 6. Ultima Sessao e Continuidade

- [ ] `ultima_sessao` esta atualizada (nao referencia sessao antiga)
- [ ] `ultima_sessao.proximo_passo` e acionavel (sabe-se o que fazer na proxima sessao)
- [ ] `ultima_sessao.resumo` e util para quem nao participou da sessao
- [ ] Nao ha "buraco" entre sessoes (contexto nao se perdeu)

> **Risco se falhar:** Proxima sessao comeca do zero. Maestro nao sabe o que aconteceu. Repetição de trabalho.

## 7. Riscos e Bloqueios

- [ ] Nenhuma fase futura depende de algo que ainda nao foi decidido
- [ ] Restricoes do cliente (prazo, orcamento) estao sendo respeitadas
- [ ] Nenhum squad bloqueado esperando input de outro
- [ ] Se ha riscos conhecidos: documentados em decisoes ou notas
- [ ] Expectativas do cliente continuam alinhadas com o que esta sendo entregue

> **Risco se falhar:** Surpresas na reta final. Cliente descobre que o projeto foi por outro caminho.

---

## Scoring

| Secao | Itens | Score |
|-------|-------|-------|
| Progresso | /5 | _____ |
| Coerencia | /5 | _____ |
| Negocio | /4 | _____ |
| Sinapses | /4 | _____ |
| Deliverables | /5 | _____ |
| Continuidade | /4 | _____ |
| Riscos | /5 | _____ |
| **TOTAL** | **/32** | _____ |

**Interpretacao:**
- **27-32:** SAUDAVEL — Projeto no trilho. Continuar normalmente
- **21-26:** ATENCAO — Gaps detectados. Corrigir antes de avancar para proxima fase
- **14-20:** ALERTA — Projeto com drift significativo. Pausa para realinhamento
- **< 14:** CRITICO — Projeto fora do trilho. Sessao de realinhamento com cliente necessaria

---

## Acoes por Resultado

| Resultado | Acao |
|-----------|------|
| SAUDAVEL | Documentar check e seguir. Proximo check em 3-4 sessoes |
| ATENCAO | Listar gaps, corrigir cada um, re-checar em 1-2 sessoes |
| ALERTA | Parar fase atual. Resolver gaps. Ativar Maestro para realinhamento |
| CRITICO | Sessao com cliente. Realinhar expectativas. Possivelmente reconfigurar fases |

---

**Auditado por:** ____________________
**Data:** ____________________
