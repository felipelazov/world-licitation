# Checklist de Quality Gate

**Objetivo:** Verificar se gates de qualidade estao corretamente configurados
**Agente:** qa-architect
**Padrao:** Metricas claras, thresholds objetivos, monitoramento ativo

---

## 1. DEFINICAO DO GATE

- [ ] Nome do gate claro e descritivo
- [ ] Objetivo definido em 1-2 frases
- [ ] Fase do processo onde o gate se aplica identificada
- [ ] Dono do gate (quem decide GO/NO-GO) nomeado
- [ ] Escopo do que o gate avalia listado
- [ ] Escopo do que o gate NAO avalia excluido explicitamente
- [ ] Pre-condicoes para ativar o gate documentadas

**Criterio:** Qualquer pessoa entende PARA QUE o gate existe.

---

## 2. METRICAS E THRESHOLDS

- [ ] Cada metrica tem nome, descricao e unidade de medida
- [ ] Fonte de dados de cada metrica identificada
- [ ] Metodo de calculo documentado
- [ ] Threshold de APROVACAO definido para cada metrica
- [ ] Threshold de REPROVACAO definido para cada metrica
- [ ] Metricas bloqueantes (hard gate) separadas das informativas (soft gate)
- [ ] Thresholds baseados em dados historicos ou benchmarks
- [ ] Minimo 3, maximo 10 metricas por gate

**Criterio:** Zero espaco para interpretacao subjetiva do resultado.

---

## 3. MONITORAMENTO E ALERTAS

- [ ] Coleta de dados automatizada onde possivel
- [ ] Frequencia de coleta definida
- [ ] Dashboard com status atual visivel (verde/amarelo/vermelho)
- [ ] Tendencia ao longo do tempo visivel
- [ ] Alerta para threshold violado configurado
- [ ] Canal de notificacao definido (email, Slack, etc.)
- [ ] Tempo maximo de resposta ao alerta definido

**Criterio:** Violacoes detectadas e comunicadas em tempo habil.

---

## 4. ACOES E GOVERNANCA

- [ ] Acao para APROVADO definida (proximo passo)
- [ ] Acao para REPROVADO definida (corrigir e resubmeter)
- [ ] Acao para CONDICIONAL definida (aprovar com ressalvas)
- [ ] Prazo para correcao em caso de reprovacao definido
- [ ] Limite de resubmissoes antes de escalacao
- [ ] Processo de excecao/waiver documentado
- [ ] Waivers registrados com justificativa
- [ ] Revisao periodica do gate agendada (trimestral)

**Criterio:** Resultado do gate gera acao concreta e imediata.

---

## GATE DE QUALIDADE DO QUALITY GATE

| Secao | Status | Observacoes |
|-------|--------|-------------|
| 1. Definicao | [ ] PASS [ ] FAIL | |
| 2. Metricas | [ ] PASS [ ] FAIL | |
| 3. Monitoramento | [ ] PASS [ ] FAIL | |
| 4. Governanca | [ ] PASS [ ] FAIL | |

**STATUS GERAL:** [ ] APROVADO [ ] PRECISA REVISAO [ ] BLOQUEADO

---

**Versao:** 1.0.0 | **Responsavel:** ops-chief
