# Task: Suggest Improvements

> Analisa automacao existente e sugere melhorias concretas com ROI estimado.

## Task Anatomy

```yaml
task:
  name: "Suggest Automation Improvements"
  status: "active"
  responsible_executor: "automation-strategist"
  execution_type: "agent"

  input:
    required:
      - field: "automation_name"
        type: "string"
        source: "Usuario ou automation-chief"
        description: "Nome da automacao a analisar"
    optional:
      - field: "automation_code"
        type: "TypeScript files"
        description: "Codigo fonte da automacao"
      - field: "business_context"
        type: "text"
        description: "Contexto do negocio para calcular ROI"

  output:
    produces:
      - field: "improvement_report"
        type: "Markdown"
        description: "Relatorio com melhorias priorizadas"
      - field: "roi_table"
        type: "Markdown table"
        description: "Tabela de ROI por melhoria"
      - field: "action_plan"
        type: "Markdown checklist"
        description: "Plano de acao ordenado por prioridade"

  action_items:
    - "Ler codigo/spec da automacao"
    - "Rodar audit checklist (10 pontos)"
    - "Identificar gaps e oportunidades"
    - "Classificar melhorias por categoria"
    - "Estimar ROI de cada melhoria"
    - "Priorizar por impacto × esforco"
    - "Gerar plano de acao"

  acceptance_criteria:
    - criterion: "Audit completo (10 checks)"
      evidence: "Tabela com PASS/WARN/FAIL para cada check"
    - criterion: "Min 3 melhorias sugeridas"
      evidence: "Lista com descricao concreta"
    - criterion: "ROI estimado para cada melhoria"
      evidence: "Numeros de tempo/custo"
    - criterion: "Plano de acao priorizado"
      evidence: "Checklist ordenado"

  veto_conditions:
    - "Automacao nao existe ou codigo nao encontrado → pedir referencia"
    - "Sem contexto do negocio para ROI → pedir contexto antes de estimar"

  elicit: true
  elicitation:
    - question: "Qual automacao quer melhorar?"
      type: "text"
    - question: "Quanto tempo a automacao economiza hoje?"
      type: "text"
      optional: true
    - question: "Qual o principal problema com ela?"
      type: "text"
      optional: true
```
