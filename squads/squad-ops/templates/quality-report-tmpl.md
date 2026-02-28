# Relatorio de Quality Gate: {nome_do_gate}

## Metadados

| Campo | Valor |
|-------|-------|
| **Gate** | {nome_do_gate} |
| **Artefato Avaliado** | {nome_do_artefato} |
| **Avaliador** | {qa_architect} |
| **Data** | {YYYY-MM-DD} |
| **Ciclo** | {1a avaliacao | 2a re-avaliacao} |
| **Veredicto** | {APROVADO | REPROVADO | CONDICIONAL | WAIVER} |

---

## Resumo Executivo

{2-3 frases: o que foi avaliado, principal conclusao, acao recomendada.}

| Indicador | Valor |
|-----------|-------|
| **Metricas avaliadas** | {total} |
| **Aprovadas** | {qtd} |
| **Reprovadas** | {qtd} |
| **Score geral** | {pontuacao}% |

---

## Detalhamento por Metrica

### {nome_da_metrica_1}

| Campo | Valor |
|-------|-------|
| **Valor Medido** | {resultado} |
| **Threshold Aprovacao** | {minimo} |
| **Status** | {PASS | FAIL | WARNING} |
| **Tipo** | {bloqueante | informativo} |

**Evidencia:** {como o valor foi obtido}

### {nome_da_metrica_2}

| Campo | Valor |
|-------|-------|
| **Valor Medido** | {resultado} |
| **Threshold Aprovacao** | {minimo} |
| **Status** | {PASS | FAIL | WARNING} |
| **Tipo** | {bloqueante | informativo} |

**Evidencia:** {como o valor foi obtido}

---

## Tabela Consolidada

| # | Metrica | Medido | Threshold | Status | Tipo |
|---|---------|--------|-----------|--------|------|
| 1 | {nome} | {valor} | {threshold} | {PASS | FAIL} | {bloqueante | informativo} |
| 2 | {nome} | {valor} | {threshold} | {PASS | FAIL} | {bloqueante | informativo} |
| 3 | {nome} | {valor} | {threshold} | {PASS | FAIL} | {bloqueante | informativo} |

---

## Issues Encontradas

### {titulo_da_issue}
- **Severidade:** {critica | alta | media | baixa}
- **Descricao:** {o que foi encontrado}
- **Impacto:** {risco se nao corrigir}
- **Recomendacao:** {o que fazer}
- **Prazo:** {quando resolver}

---

## Comparativo

| Metrica | Anterior | Atual | Tendencia |
|---------|----------|-------|-----------|
| {metrica} | {valor} | {valor} | {melhorou | piorou | estavel} |

---

## Veredicto e Proximos Passos

**Veredicto:** {APROVADO | REPROVADO | CONDICIONAL | WAIVER}
**Justificativa:** {por que esse veredicto}

| # | Acao | Responsavel | Prazo |
|---|------|-------------|-------|
| 1 | {acao} | {quem} | {quando} |
| 2 | {acao} | {quem} | {quando} |

### Re-avaliacao (se necessario)
- **Data prevista:** {YYYY-MM-DD}
- **Itens a re-avaliar:** {quais metricas}

---

| Papel | Nome | Data |
|-------|------|------|
| Avaliador | {qa_architect} | {YYYY-MM-DD} |
| Dono do Gate | {ops_chief} | {YYYY-MM-DD} |
