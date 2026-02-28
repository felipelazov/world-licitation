# Task: Desenhar Automacoes com Guardrails

**Task ID:** squad-ops/design-automation
**Version:** 1.0.0
**Execution Type:** Interativo (70% Human / 30% Agent)
**Duration:** 60-120 minutos
**Agent:** automation-architect

---

## Proposito

Desenhar automacoes a prova de bala a partir da arquitetura de sistema (output do Architect). TODA automacao DEVE ter os 5 guardrails obrigatorios: loop prevention, idempotency, audit trail, manual escape e retry logic. Automacao sem guardrail nao sai daqui. Automacao nao ensina — ela IMPEDE. [SOURCE: Pedro Valerio]

**REGRA INVIOLAVEL:** Automation Architect NUNCA cria processos e NUNCA cria arquitetura. Recebe estrutura pronta e transforma em regras de automacao. [SOURCE: Pedro Valerio]

---

## Inputs

```yaml
obrigatorios:
  arquitetura_sistema:
    field: "Arquitetura do sistema (output de design-system-structure, QG >= 70%)"
    format: "markdown com folders, lists, campos, status, views, SLAs"
    required: true
  ferramenta_automacao:
    field: "Ferramenta de automacao (N8N, Make, Zapier, ClickUp Automations)"
    format: "string"
    required: true
  triggers_necessarios:
    field: "Lista de eventos que precisam disparar acoes automaticas"
    format: "lista descritiva"
    required: true
```

---

## Steps

### Step 1: Identificar Candidatos a Automacao (10-15 min)
Aplicar matriz PV_PM_001: alta freq + alto impacto + alta auto = AUTOMATIZAR. Baixa freq + alto impacto = MANTER MANUAL. Baixa freq + baixo impacto = ELIMINAR. Listar cada candidato com trigger, acao esperada e prioridade.

### Step 2: Definir Task Definitions (15-25 min)
Para CADA automacao: ID unico, nome descritivo, inputs (campo, tipo, origem), outputs (campo, tipo, destino), acceptance criteria (como verificar), dependencies (o que precisa existir antes).
**VETO:** Task sem input/output = nao automatiza. [SOURCE: Pedro Valerio]

### Step 3: Implementar 5 Guardrails por Automacao (15-25 min)
Para CADA automacao, definir TODOS os 5 guardrails:
1. **Loop Prevention** — dedup key, max iteracoes, cooldown
2. **Idempotency** — mesma entrada = mesma saida, upsert > create
3. **Audit Trail** — localizacao dos logs, campos logados, retencao
4. **Manual Escape** — como humano intervem, como desativar, onde esta doc
5. **Retry Logic** — max tentativas (3), backoff exponencial, acao final (DLQ + notificacao)

**VETO:** Automacao sem QUALQUER dos 5 guardrails = VETO absoluto. [SOURCE: Pedro Valerio]

### Step 4: Definir Error Handling (10-15 min)
Para CADA automacao: cenario origem fora do ar, cenario destino fora do ar, cenario dados invalidos, fallback manual documentado, notificacao a quem precisa AGIR.

### Step 5: Desenhar Monitoramento (5-10 min)
Dashboard de saude (ativas, falhadas, em retry), alertas de threshold (>3 falhas/h), relatorio semanal, responsavel pelo monitoramento.

---

## Output

Documento `deliverables/ops/{slug}-automation-spec.md` contendo:
- **Candidatos avaliados:** matriz de decisao com prioridade
- **Specs por automacao:** ID, trigger, condicoes, acoes, guardrails (5), error handling, fallback
- **Testes por automacao:** 1 happy path + 2 cenarios de erro
- **Monitoramento:** dashboard, alertas, relatorio, responsavel

---

## Quality Gate

- [ ] Candidatos avaliados pela matriz PV_PM_001
- [ ] CADA automacao tem task definition completa (input, output, AC, deps)
- [ ] CADA automacao tem os 5 guardrails documentados (ZERO excecao)
- [ ] CADA automacao tem error handling com fallback manual
- [ ] CADA automacao tem 3 cenarios de teste (1 happy + 2 error)
- [ ] Monitoramento definido com dashboard, alertas e responsavel
- [ ] Nenhuma automacao cria fluxo bidirecional
- [ ] Score >= 70% para handoff ao QA Architect

---

**Task Status:** Ready for Production
