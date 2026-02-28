# Task: Validacao Quality Gate (10 Dimensoes)

**Task ID:** squad-ops/quality-gate
**Version:** 1.0.0
**Execution Type:** Interativo (70% Human / 30% Agent)
**Duration:** 30-60 minutos
**Agent:** qa-architect

---

## Proposito

Executar validacao de quality gate com scoring em 10 dimensoes. Cada dimensao recebe nota de 1.0 a 10.0. Minimo de 6.0 por dimensao critica. Media geral determina veredicto: PASS (>= 7.0), CONDITIONAL (6.0-6.9), FAIL (< 6.0), VETO (qualquer critica < 5.0). Nada passa sem evidencia documentada.

**REGRA INVIOLAVEL:** QA Architect NUNCA cria, NUNCA corrige — apenas VALIDA e emite veredicto. Correcoes voltam para o role responsavel. [SOURCE: Pedro Valerio]

---

## Inputs

```yaml
obrigatorios:
  deliverable:
    field: "Artefato a ser validado (processo, sistema, automacao, pacote completo)"
    format: "markdown ou conjunto de documentos"
    required: true
  processo_sistema:
    field: "Nome do processo/sistema sendo avaliado"
    format: "string"
    required: true
```

---

## Steps

### Step 1: Coletar Artefatos (5 min)
Reunir todos os artefatos do deliverable: mapa de processo, arquitetura, spec de automacoes, templates, docs. Verificar predecessores. Artefato faltante = gap critico.

### Step 2: Scoring 10 Dimensoes (15-30 min)
Avaliar CADA dimensao com nota 1.0 a 10.0 e evidencia documentada:

| # | Dimensao | Peso | Critica? |
|---|----------|------|----------|
| D01 | Ordem e Estrutura | 1.0 | Nao |
| D02 | Impossibilidade de Erro | 1.2 | SIM |
| D03 | Teste da Filha (Usabilidade) | 1.2 | SIM |
| D04 | Fluxo Unidirecional | 1.0 | SIM |
| D05 | Responsabilidade Clara | 1.0 | SIM |
| D06 | Evidencia e Documentacao | 1.0 | Nao |
| D07 | Guardrails de Automacao | 1.0 | SIM |
| D08 | Coerencia entre Artefatos | 1.0 | Nao |
| D09 | SLAs e Escalation | 0.8 | Nao |
| D10 | Monitoramento e Vigilancia | 0.8 | Nao |

### Step 3: Documentar Evidencias (5-10 min)
Para cada dimensao: nota numerica + evidencia concreta + issues encontrados + recomendacao (se < 7.0) + rota de retorno (para qual role corrigir).

### Step 4: Calcular Veredicto (5 min)
Media ponderada das 10 dimensoes:
- **PASS:** Media >= 7.0 E nenhuma critica < 6.0 → entrega liberada
- **CONDITIONAL:** Media 6.0-6.9 E nenhuma critica < 5.0 → aprovado com ressalvas
- **FAIL:** Media < 6.0 OU critica < 6.0 → retorna com lista de correcoes
- **VETO:** Qualquer critica < 5.0 → bloqueio total, retorna ao ops-chief

Para FAIL/VETO: listar EXATAMENTE quais dimensoes falharam, correcao e role responsavel.

---

## Output

Documento `deliverables/ops/{slug}-quality-gate-report.md` contendo:
- **Scoring:** 10 dimensoes com nota, peso, evidencia e issues
- **Resumo:** media ponderada, dimensoes criticas abaixo de 6, total de issues
- **Veredicto:** PASS | CONDITIONAL | FAIL | VETO
- **Issues:** dimensao, severity, descricao, recomendacao, retorna para qual role
- **Proximo passo:** acao recomendada

---

## Quality Gate

- [ ] TODAS as 10 dimensoes avaliadas com nota numerica
- [ ] TODA nota tem evidencia documentada (nao e opiniao)
- [ ] Dimensoes criticas (D02, D03, D04, D05, D07) avaliadas com rigor extra
- [ ] Issues listados com severity, recomendacao e rota de retorno
- [ ] Veredicto calculado corretamente pela media ponderada
- [ ] Para FAIL/VETO: lista clara de correcoes com role responsavel
- [ ] Relatorio completo e formatado

---

**Task Status:** Ready for Production
