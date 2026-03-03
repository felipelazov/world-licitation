# Task: Discover Automation Opportunities

> Analisa o negocio e descobre processos manuais que deveriam ser automatizados.

## Task Anatomy

```yaml
task:
  name: "Discover Automation Opportunities"
  status: "active"
  responsible_executor: "automation-strategist"
  execution_type: "agent"

  input:
    required:
      - field: "business_description"
        type: "text"
        source: "Usuario"
        description: "Descricao do negocio, processos e dores"
    optional:
      - field: "existing_automations"
        type: "list"
        description: "Automacoes ja existentes (para nao duplicar)"
      - field: "team_size"
        type: "number"
        description: "Tamanho da equipe (para calcular ROI)"

  output:
    produces:
      - field: "opportunity_map"
        type: "Markdown table"
        description: "Mapa de oportunidades com prioridade"
      - field: "top_3_automations"
        type: "Markdown"
        description: "Top 3 automacoes detalhadas com spec preliminar"
      - field: "roadmap"
        type: "Markdown"
        description: "Roadmap de implementacao sugerido"

  action_items:
    - "Entender o negocio (perguntas estruturadas)"
    - "Mapear processos manuais repetitivos"
    - "Classificar por frequencia × impacto × automatizabilidade"
    - "Calcular ROI estimado por oportunidade"
    - "Priorizar top 3 por ROI"
    - "Criar spec preliminar do top 3"
    - "Gerar roadmap de implementacao"

  acceptance_criteria:
    - criterion: "Min 5 oportunidades identificadas"
      evidence: "Tabela com 5+ linhas"
    - criterion: "Classificacao completa"
      evidence: "Freq + Impacto + Automatizabilidade preenchidos"
    - criterion: "Top 3 com spec preliminar"
      evidence: "Descricao de steps e executores para cada"
    - criterion: "Roadmap ordenado"
      evidence: "Sequencia logica de implementacao"

  veto_conditions:
    - "Sem descricao do negocio → perguntar antes de sugerir"
    - "Sugestao sem ROI → nao incluir na lista"

  elicit: true
  elicitation:
    - question: "Descreva seu negocio em 2-3 frases"
      type: "text"
    - question: "Quais sao seus 3 maiores gargalos operacionais?"
      type: "text"
    - question: "Que tarefas voce faz repetidamente toda semana?"
      type: "text"
    - question: "Quantas pessoas tem na equipe?"
      type: "number"
      optional: true
```
