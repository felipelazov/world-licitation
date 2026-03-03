# Task: Convert n8n Flow

> Recebe JSON de workflow n8n e converte em spec de aplicacao AIOS nativa.

## Task Anatomy

```yaml
task:
  name: "Convert n8n Flow to AIOS Spec"
  status: "active"
  responsible_executor: "n8n-converter"
  execution_type: "agent"

  input:
    required:
      - field: "n8n_json"
        type: "JSON"
        source: "Usuario (paste ou upload)"
        description: "JSON exportado do n8n (workflow completo)"
    optional:
      - field: "context"
        type: "text"
        description: "Descricao do que o workflow faz (para contexto)"

  output:
    produces:
      - field: "conversion_spec"
        type: "YAML"
        destination: "app-builder"
        description: "Spec completa com steps, executores, integracoes e melhorias"
      - field: "node_mapping_table"
        type: "Markdown table"
        description: "Tabela visual de n8n node → AIOS component"
      - field: "improvement_list"
        type: "Markdown list"
        description: "Melhorias sugeridas sobre o fluxo original"

  action_items:
    - "Parsear JSON (nodes, connections, parameters)"
    - "Mapear cada node para componente AIOS"
    - "Designar executor por step (humano/agente/worker/clone)"
    - "Preservar todas connections como handoffs"
    - "Identificar credentials necessarias [CREDENTIAL_REQUIRED]"
    - "Sugerir melhorias (error handling, retry, etc)"
    - "Gerar spec YAML para app-builder"

  acceptance_criteria:
    - criterion: "100% dos nodes mapeados"
      evidence: "Nenhum node com tipo 'unknown'"
    - criterion: "100% dos executores designados"
      evidence: "Cada step com executor explicito"
    - criterion: "100% das connections preservadas"
      evidence: "Numero de handoffs = numero de connections"
    - criterion: "Zero credenciais no output"
      evidence: "Todas marcadas [CREDENTIAL_REQUIRED]"
    - criterion: "Minimo 1 melhoria sugerida"
      evidence: "Lista de improvements nao vazia"

  veto_conditions:
    - "JSON invalido ou incompleto → pedir JSON correto"
    - "Node type desconhecido → marcar como MANUAL_REVIEW e avisar"
    - "Workflow sem trigger → VETO (todo workflow precisa de trigger)"

  elicit: false
  human_review: false
```

## Execution Steps

1. **Parse JSON**
   - Validar estrutura do JSON
   - Extrair array de `nodes[]`
   - Extrair mapa de `connections`
   - Extrair `settings`

2. **Map Nodes**
   - Para cada node, consultar tabela de mapeamento em config.yaml
   - Se node desconhecido → marcar MANUAL_REVIEW
   - Registrar: node_type → aios_component → executor

3. **Preserve Connections**
   - Cada connection vira handoff_to no step
   - Validar que nao ha orfaos (node sem input e nao e trigger)

4. **Assign Executors**
   - worker: deterministic, API calls, data transforms
   - agente: AI tasks, complex decisions
   - humano: approvals, forms, manual input
   - clone: domain-specific expertise

5. **Suggest Improvements**
   - Error handling ausente → sugerir
   - Retry logic ausente → sugerir
   - Security (auth, rate limit) → sugerir
   - Monitoring → sugerir

6. **Generate Spec**
   - Output YAML formatado com todos os steps
   - Incluir node_mapping_table em Markdown
   - Incluir improvement_list
