# Task: Create Automation App

> Constroi aplicacao AIOS nativa a partir de spec de conversao ou design de automacao.

## Task Anatomy

```yaml
task:
  name: "Create Native AIOS Automation App"
  status: "active"
  responsible_executor: "app-builder"
  execution_type: "agent"

  input:
    required:
      - field: "conversion_spec"
        type: "YAML"
        source: "n8n-converter ou automation-chief"
        description: "Spec com steps, executores e integracoes"
    optional:
      - field: "existing_patterns"
        type: "reference"
        description: "Patterns de automacoes ja existentes no projeto"

  output:
    produces:
      - field: "app_files"
        type: "TypeScript files"
        destination: "src/services/automations/{nome}/"
        description: "Codigo da aplicacao nativa"
      - field: "api_route"
        type: "TypeScript file"
        destination: "src/app/api/automations/{nome}/route.ts"
        description: "API route (se aplicavel)"
      - field: "test_files"
        type: "TypeScript files"
        destination: "src/services/automations/{nome}/tests/"
        description: "Testes unitarios e integracao"
      - field: "types_file"
        type: "TypeScript file"
        description: "Tipos da automacao"

  action_items:
    - "Criar estrutura de diretorios"
    - "Implementar cada step com executor configurado"
    - "Implementar orquestrador principal (index.ts)"
    - "Criar API route se houver trigger HTTP"
    - "Configurar CRON se houver trigger scheduled"
    - "Implementar error handling em cada step"
    - "Implementar retry logic com backoff"
    - "Criar fallbacks"
    - "Escrever testes unitarios por step"
    - "Escrever teste de integracao"
    - "Documentar tipos"

  acceptance_criteria:
    - criterion: "Todos steps implementados"
      evidence: "1 arquivo por step em steps/"
    - criterion: "Executores configurados"
      evidence: "Cada step usa executor correto"
    - criterion: "Error handling em 100% dos steps"
      evidence: "try/catch com logging em cada step"
    - criterion: "Testes passando"
      evidence: "npm test sem falhas"
    - criterion: "TypeScript compila"
      evidence: "npx tsc --noEmit sem erros"

  veto_conditions:
    - "Sem spec → VETO (pedir spec antes)"
    - "Spec incompleta (step sem executor) → devolver pro n8n-converter"
    - "Credencial necessaria nao documentada → VETO ate documentar"

  elicit: false
  human_review: true
```

## App Structure Template

```
src/services/automations/{nome}/
├── index.ts              # Orquestrador — executa steps em sequencia
├── config.ts             # Configuracao (schedule, retries, timeouts)
├── types.ts              # Tipos da automacao
├── steps/
│   ├── 01-{nome-step}.ts # Step 1 com executor
│   ├── 02-{nome-step}.ts # Step 2 com executor
│   └── ...
├── utils/
│   └── retry.ts          # Retry com backoff exponencial
└── tests/
    ├── {step}.test.ts    # Unit test por step
    └── integration.test.ts
```

## Executor Implementation Patterns

### Worker (deterministic)
```typescript
export async function executeStep(input: StepInput): Promise<StepOutput> {
  try {
    // Operacao deterministica
    const result = await apiCall(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(`[${STEP_ID}] Error:`, error);
    return { success: false, error: error.message };
  }
}
```

### Agente (AI-powered)
```typescript
export async function executeStep(input: StepInput): Promise<StepOutput> {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      messages: [{ role: 'user', content: buildPrompt(input) }],
    });
    return { success: true, data: parseResponse(response) };
  } catch (error) {
    console.error(`[${STEP_ID}] AI Error:`, error);
    // Fallback: regra simples se IA falhar
    return fallbackLogic(input);
  }
}
```

### Humano (approval gate)
```typescript
export async function executeStep(input: StepInput): Promise<StepOutput> {
  // Criar registro de aprovacao pendente
  const approval = await supabase.from('approvals').insert({
    automation: AUTOMATION_ID,
    step: STEP_ID,
    data: input,
    status: 'pending',
    expires_at: addHours(new Date(), 48),
  });
  // Notificar responsavel
  await notify(input.approver, { type: 'approval_required', data: approval });
  // Retornar pending — orquestrador monitora via polling ou realtime
  return { success: true, status: 'pending', approval_id: approval.id };
}
```
