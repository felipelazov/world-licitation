# Checklist de Prontidao para Automacao

**Objetivo:** Avaliar se um processo esta pronto para ser automatizado
**Agente:** automation-architect
**Padrao:** Automacao viavel, justificavel e com fallback humano

---

## 1. ELEGIBILIDADE

- [ ] Processo e repetitivo (executa 3+ vezes por semana)
- [ ] Regras de decisao sao objetivas e documentaveis
- [ ] Inputs sao estruturados ou estruturaveis
- [ ] Outputs sao previsiveis e verificaveis
- [ ] Processo nao exige julgamento humano subjetivo em etapas criticas

**Criterio:** Atende pelo menos 4 dos 5 itens.

---

## 2. ROI E JUSTIFICATIVA

- [ ] Tempo gasto manualmente por execucao medido
- [ ] Frequencia de execucao documentada
- [ ] Custo estimado da automacao (desenvolvimento + manutencao)
- [ ] Payback calculado (meses ate ROI positivo)
- [ ] Beneficios intangiveis listados (menos erro, velocidade, escala)

**Criterio:** ROI positivo em ate 6 meses OU beneficio critico intangivel.

---

## 3. COMPLEXIDADE E DEPENDENCIAS

- [ ] Numero de etapas e pontos de decisao contados
- [ ] Complexidade classificada: baixa (< 5 etapas) | media (5-15) | alta (> 15)
- [ ] Integracoes externas necessarias listadas
- [ ] APIs e acessos verificados como disponiveis
- [ ] Permissoes e credenciais mapeadas
- [ ] Dados de entrada com fonte confiavel confirmada
- [ ] Formato e validacoes dos dados definidos

**Criterio:** Complexidade compativel com recursos disponiveis.

---

## 4. FALLBACK E TRATAMENTO DE ERROS

- [ ] Processo manual documentado como fallback
- [ ] Responsavel pelo fallback identificado
- [ ] Criterios de ativacao do fallback definidos
- [ ] Top 5 cenarios de erro mais provaveis listados
- [ ] Retry automatico configurado para erros transientes
- [ ] Notificacao de falha definida (para quem, por onde)
- [ ] Logs de execucao armazenados para debug

**Criterio:** Se a automacao cair, alguem sabe o que fazer em 30 min.

---

## 5. MONITORAMENTO E MANUTENCAO

- [ ] Metricas de sucesso/falha definidas
- [ ] Dashboard ou relatorio de execucoes planejado
- [ ] Alertas para anomalias configurados
- [ ] Responsavel pela manutencao definido
- [ ] Documentacao tecnica planejada
- [ ] Revisao periodica agendada (mensal ou trimestral)

**Criterio:** Automacao nao vira caixa preta que ninguem sabe manter.

---

## GATE DE PRONTIDAO

| Secao | Status | Observacoes |
|-------|--------|-------------|
| 1. Elegibilidade | [ ] PASS [ ] FAIL | |
| 2. ROI | [ ] PASS [ ] FAIL | |
| 3. Complexidade | [ ] PASS [ ] FAIL | |
| 4. Fallback | [ ] PASS [ ] FAIL | |
| 5. Monitoramento | [ ] PASS [ ] FAIL | |

**DECISAO:** [ ] AUTOMATIZAR [ ] SIMPLIFICAR ANTES [ ] NAO AUTOMATIZAR

**Justificativa:** _______________________________________________

---

**Versao:** 1.0.0 | **Responsavel:** ops-chief
