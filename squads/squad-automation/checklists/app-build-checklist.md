# App Build Checklist

> Valida se a aplicacao nativa AIOS esta pronta para review.

## Checklist

### Estrutura (3 checks)
- [ ] Diretorio `src/services/automations/{nome}/` criado
- [ ] Arquivo `index.ts` (orquestrador) presente
- [ ] Arquivo `types.ts` com tipos da automacao

### Implementacao (4 checks)
- [ ] Todos steps implementados em `steps/`
- [ ] Cada step com executor configurado
- [ ] Error handling (try/catch) em cada step
- [ ] Retry logic implementado

### Qualidade (3 checks)
- [ ] TypeScript compila sem erros (`npx tsc --noEmit`)
- [ ] Testes unitarios escritos para cada step
- [ ] Teste de integracao escrito

### Integracao (2 checks)
- [ ] API route criada (se trigger HTTP)
- [ ] CRON configurado (se trigger scheduled)

## Scoring

| Score | Status | Acao |
|-------|--------|------|
| 12/12 | PASS | Enviar pro strategist para review |
| 9-11/12 | WARN | Completar itens faltantes |
| <9/12 | FAIL | Rebuild necessario |
