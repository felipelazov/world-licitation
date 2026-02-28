# Task: Auditoria de Compliance Interna

**Task ID:** squad-adm/compliance-audit
**Version:** 1.0.0
**Execution Type:** Interativo (70% Human / 30% Agent)
**Duration:** 50 minutos
**Agent:** ray-dalio-compliance

---

## Proposito

Auditoria interna para identificar gaps entre o que a empresa DEVERIA fazer e o que REALMENTE faz. Cobre processos, LGPD e politicas. Radical Transparency de Ray Dalio: nao esconder gaps — diagnosticar, classificar e corrigir. Pain + Reflection = Progress.

---

## Inputs

```yaml
obrigatorios:
  area_auditar:
    field: "Area a auditar (financeiro/operacional/TI/RH/LGPD/geral)"
    format: "string"
    required: true
  ultima_auditoria:
    field: "Data da ultima auditoria nesta area (ou 'nunca')"
    format: "string"
    required: true
  regulamentacoes_aplicaveis:
    field: "Regulamentacoes aplicaveis (LGPD, CLT, normas do setor)"
    format: "string"
    required: true
opcionais:
  incidentes_recentes:
    field: "Incidentes que motivaram a auditoria"
    format: "string"
    required: false
  politicas_existentes:
    field: "Politicas internas ja existentes (listar)"
    format: "string"
    required: false
```

---

## Steps

### Step 1: Definir Escopo da Auditoria (5 min)
Estabelecer: o que sera auditado (processos, documentos, sistemas), periodo de referencia, criterios de avaliacao (leis, politicas, best practices), o que esta FORA do escopo, tipo (periodica ou sob demanda). Notificar areas — auditoria e transparente.

### Step 2: Mapear Processos vs Requisitos (12 min)
Para cada processo: qual o requisito legal/politica, qual a pratica atual, existe gap? Verificacoes por area: Financeiro (NFs, DRE, obrigacoes fiscais), Operacional (documentacao, backups, contingencia), LGPD (ROPA, base legal, consentimentos, incidentes), RH (contratos, FGTS/INSS, ferias).

### Step 3: Identificar e Documentar Gaps (10 min)
Para cada gap: descricao factual, requisito violado, evidencia (documento/entrevista/observacao), impacto potencial (multa, processo, perda de dados), causa raiz (falta de processo, conhecimento ou negligencia).

### Step 4: Classificar por Criticidade (8 min)
Severidade: **Critico** (risco legal imediato, vazamento — corrigir em 48h), **Alto** (processo faltante, controle ineficaz — 7 dias), **Medio** (documentacao incompleta — 30 dias), **Baixo** (melhoria recomendada — 90 dias). Priorizar criticos primeiro.

### Step 5: Recomendar Remediacoes (10 min)
Para cada gap: acao corretiva especifica, responsavel, prazo conforme severidade, recurso necessario, como verificar a correcao, prevencao futura. Gaps criticos LGPD/financeiro → escalar para ADM Chief imediatamente.

### Step 6: Definir Prazo de Correcao e Follow-Up (5 min)
Cronograma: Semana 1 (criticos), Semana 2-3 (altos), Mes 1 (medios), Trimestre (baixos). Follow-up em 30/60/90 dias. Agendar proxima auditoria conforme calendario de compliance.

---

## Output

Relatorio de Auditoria contendo: escopo e criterios, matriz de processos vs requisitos, lista de gaps com evidencia e causa raiz, classificacao por severidade (critico/alto/medio/baixo), plano de remediacao com responsaveis e prazos, cronograma de follow-up, e parecer geral.

Arquivo: `deliverables/adm/compliance-audit-{area}-{YYYY-MM-DD}.yaml`

---

## Quality Gate

- [ ] Escopo definido com criterios claros
- [ ] Processos mapeados contra requisitos legais/politicas
- [ ] Cada gap documentado com evidencia e causa raiz
- [ ] Gaps classificados por severidade
- [ ] Plano de remediacao com acao, responsavel e prazo
- [ ] Cronograma de follow-up definido (30/60/90 dias)
- [ ] Gaps criticos escalados para ADM Chief
- [ ] Proxima auditoria agendada
