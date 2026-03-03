# Automation Quality Checklist (10-Point)

> Checklist padrao para auditar qualidade de qualquer automacao AIOS.
> Usado pelo automation-strategist no comando *audit.

## Checklist

### Executores (1 check)
- [ ] **AQ_01**: Cada step tem executor designado (humano/agente/worker/clone)

### Resiliencia (3 checks)
- [ ] **AQ_02**: Error handling (try/catch + logging) em todos os steps
- [ ] **AQ_03**: Retry logic com backoff exponencial
- [ ] **AQ_04**: Fallback definido para cada step critico

### Consistencia (2 checks)
- [ ] **AQ_05**: Operacoes idempotentes (rerun seguro sem duplicacao)
- [ ] **AQ_06**: Logging e audit trail (quem/quando/o que)

### Qualidade (2 checks)
- [ ] **AQ_07**: Testes unitarios + integracao passando
- [ ] **AQ_08**: Documentacao atualizada (README ou inline)

### Seguranca (1 check)
- [ ] **AQ_09**: Auth, rate limiting e input validation

### Observabilidade (1 check)
- [ ] **AQ_10**: Monitoramento e alertas configurados

## Scoring

| Peso | Check |
|------|-------|
| 0.15 | AQ_01 (executores) |
| 0.15 | AQ_02 (error handling) |
| 0.10 | AQ_03 (retry) |
| 0.10 | AQ_04 (fallback) |
| 0.10 | AQ_05 (idempotencia) |
| 0.10 | AQ_06 (logging) |
| 0.10 | AQ_07 (testes) |
| 0.05 | AQ_08 (docs) |
| 0.10 | AQ_09 (security) |
| 0.05 | AQ_10 (monitoring) |

**Total: 1.0 | Threshold: 0.70**

| Score | Status | Acao |
|-------|--------|------|
| >= 0.85 | PASS | Aprovado para producao |
| 0.70-0.84 | WARN | Aprovar com melhorias planejadas |
| < 0.70 | FAIL | Corrigir antes de aprovar |
