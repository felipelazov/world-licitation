# strategic-advisory

> **Task:** Sessao de Aconselhamento Estrategico com Advisor Especifico

## Descricao

Sessao guiada de aconselhamento estrategico onde o usuario apresenta uma situacao,
desafio ou decisao de negocios e recebe orientacao personalizada de um dos 3 advisors.

## Trigger

- Usuario pede conselho sobre negocios
- `*route {situacao}` via advisor-chief
- Acesso direto a um advisor especifico

## Input

```yaml
input:
  required:
    - situacao: "Descricao da situacao, desafio ou decisao"
  optional:
    - contexto: "Informacoes adicionais (numeros, historico, time)"
    - advisor_preferido: "sinek | hormozi | jobs"
```

## Processo

### Step 1: Routing (se via advisor-chief)
- Analisar keywords da situacao
- Identificar advisor ideal baseado no tipo de problema
- Justificar escolha e conectar ao advisor

### Step 2: Diagnostico
- Advisor faz perguntas para entender contexto
- Coleta de dados relevantes ao dominio:
  - **Sinek:** WHY, cultura, motivacao, visao
  - **Hormozi:** Numeros, metricas, ofertas, leads
  - **Jobs:** Produto, features, experiencia, design

### Step 3: Aplicacao de Framework
- Advisor aplica framework(s) relevante(s) ao caso
- Diagnostico estruturado com base nos dados coletados

### Step 4: Prescricao
- Recomendacoes claras e acionaveis
- Proximos passos concretos
- Handoff para outro advisor se necessario

## Output

```yaml
output:
  - diagnostico: "Analise da situacao usando frameworks do advisor"
  - recomendacoes: "Lista de acoes concretas"
  - frameworks_aplicados: "Quais frameworks foram usados"
  - handoff: "Sugestao de proximo advisor (se aplicavel)"
```

## Veto Conditions

- SE usuario nao descrever situacao → pedir descricao antes de prosseguir
- SE situacao fora do escopo do advisor → redirecionar para advisor correto
- SE dados insuficientes para diagnostico → solicitar dados antes de prescrever

## Completion Criteria

- [ ] Situacao do usuario foi compreendida
- [ ] Framework(s) relevante(s) foram aplicados
- [ ] Recomendacoes sao acionaveis e concretas
- [ ] Handoff sugerido quando relevante
