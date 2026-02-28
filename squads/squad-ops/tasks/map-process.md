# Task: Mapear Processo de Negocio

**Task ID:** squad-ops/map-process
**Version:** 1.0.0
**Execution Type:** Interativo (70% Human / 30% Agent)
**Duration:** 45-90 minutos
**Agent:** process-mapper

---

## Proposito

Mapear um processo de negocio do FIM para o INICIO (backwards mapping). Identificar cada etapa, responsavel, ponto de decisao, gap e condicao de veto. O mapeamento reverso revela dependencias ocultas que o mapeamento linear esconde.

**REGRA INVIOLAVEL:** Process Mapper SEMPRE trabalha de tras pra frente (fim->inicio), NUNCA do inicio pro fim. [SOURCE: Pedro Valerio]

---

## Inputs

```yaml
obrigatorios:
  nome_processo:
    field: "Nome do processo a ser mapeado"
    format: "string"
    required: true
  estado_final:
    field: "Estado final desejado (o que o processo ENTREGA)"
    format: "string"
    required: true
  partes_envolvidas:
    field: "Pessoas/roles envolvidos no processo"
    format: "lista de nomes ou cargos"
    required: true
```

---

## Steps

### Step 1: Definir Estado Final (5 min)
Identificar: o que o processo ENTREGA, quem RECEBE, como VERIFICAR que esta completo. Sem estado final claro, nao comeca.

### Step 2: Trabalhar de Tras pra Frente (20-40 min)
A partir do estado final, perguntar repetidamente: "O que precisa estar pronto IMEDIATAMENTE antes?" + "Quem e responsavel?" + "Quanto tempo leva?" + "O que pode dar errado?" Repetir ate chegar ao gatilho inicial.

### Step 3: Identificar Responsaveis por Etapa (10 min)
Para CADA etapa: responsavel principal (nome especifico, NUNCA "o time"), backup e aprovador.
**VETO:** Etapa sem responsavel nomeado = processo para. [SOURCE: Pedro Valerio]

### Step 4: Marcar Pontos de Decisao (5-10 min)
Cada bifurcacao: qual a decisao (binaria), quem decide, criterio objetivo. Caminhos errados sao BLOQUEADOS, nao alertados.

### Step 5: Identificar Gaps e Riscos (10-15 min)
Gaps (handoff sem criterio, espera indefinida) e riscos (pessoa unica, SLA ausente). Classificar: CRITICAL | HIGH | MEDIUM | LOW. Para cada gap: recomendacao concreta.

### Step 6: Definir Veto Conditions (5-10 min)
Para cada etapa critica: SE {condicao negativa} ENTAO {bloqueio fisico}. Veto conditions IMPEDEM avancar, nao alertam. Documentar caminhos errados a impossibilitar.

---

## Output

Documento `deliverables/ops/{slug}-process-map.md` contendo:
- **Resultado final:** entrega + consumidor + criterio de conclusao
- **Mapa de etapas (fim->inicio):** numero, etapa, responsavel, input, output, tempo, riscos
- **Gaps:** descricao, severity, etapa afetada, recomendacao
- **Veto conditions:** etapa, condicao SE, bloqueio ENTAO
- **Responsaveis:** etapa, dono, backup, aprovador

---

## Quality Gate

- [ ] Estado final definido com output tangivel e criterio de verificacao
- [ ] Mapeamento feito do FIM para o INICIO (nunca linear)
- [ ] TODAS as etapas tem responsavel nomeado (nunca "o time")
- [ ] TODOS os inputs/outputs definidos por etapa
- [ ] Gaps documentados com severity e recomendacao
- [ ] Caminhos errados documentados com veto conditions
- [ ] Fluxo estritamente unidirecional (nada volta)
- [ ] Score >= 70% para handoff ao Architect

---

**Task Status:** Ready for Production
