# Conversion Quality Checklist

> Valida qualidade da conversao n8n → AIOS antes de passar pro app-builder.

## Checklist

### Parsing (3 checks)
- [ ] JSON parseado sem erros
- [ ] Todos os nodes extraidos e listados
- [ ] Todas as connections mapeadas

### Mapping (4 checks)
- [ ] 100% dos nodes mapeados para componente AIOS
- [ ] Nenhum node com tipo "unknown" (sem MANUAL_REVIEW pendente)
- [ ] Cada step tem executor designado (humano/agente/worker/clone)
- [ ] Credentials marcadas como [CREDENTIAL_REQUIRED]

### Improvements (2 checks)
- [ ] Minimo 1 melhoria sugerida sobre o fluxo original
- [ ] Error handling considerado para cada step

### Spec (3 checks)
- [ ] Spec YAML completa e valida
- [ ] Node mapping table em Markdown gerada
- [ ] Handoffs preservam todas connections originais

## Scoring

| Score | Status | Acao |
|-------|--------|------|
| 12/12 | PASS | Enviar pro app-builder |
| 9-11/12 | WARN | Corrigir gaps menores, enviar |
| <9/12 | FAIL | Refazer conversao |
