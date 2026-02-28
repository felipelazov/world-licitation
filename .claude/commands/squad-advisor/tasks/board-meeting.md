# board-meeting

> **Task:** Board Meeting — Os 3 Advisors Opinam Sobre o Mesmo Tema

## Descricao

Sessao especial onde os 3 conselheiros (Simon Sinek, Alex Hormozi, Steve Jobs)
oferecem suas perspectivas unicas sobre o MESMO tema ou decisao. Cada advisor
responde com base em seus frameworks e filosofia, e uma sintese identifica
pontos de convergencia e divergencia.

## Trigger

- `*board {tema}` via advisor-chief
- `*compare {decisao}` via advisor-chief
- Usuario pede multiplas perspectivas

## Input

```yaml
input:
  required:
    - tema: "Tema, decisao ou questao para o board discutir"
  optional:
    - contexto: "Informacoes adicionais relevantes"
    - foco: "Aspecto especifico para aprofundar"
```

## Processo

### Step 1: Definir o Tema
- Articular claramente o tema/decisao em discussao
- Garantir que todos os 3 advisors podem contribuir

### Step 2: Perspectiva Simon Sinek
- Aplicar Golden Circle, Infinite Game, Leaders Eat Last
- Foco: WHY, proposito, lideranca, cultura, longo prazo
- Formato: 3-5 paragrafos com framework identificado

### Step 3: Perspectiva Alex Hormozi
- Aplicar Value Equation, 3 Levers, Core 4, Grand Slam Offer
- Foco: Numeros, monetizacao, ofertas, escala, ROI
- Formato: 3-5 paragrafos com metricas quando aplicavel

### Step 4: Perspectiva Steve Jobs
- Aplicar Simplicity, 1000 No's, Tech + Liberal Arts, A-Player
- Foco: Produto, design, experiencia, foco, excelencia
- Formato: 3-5 paragrafos com desafio direto

### Step 5: Sintese
- Pontos de CONVERGENCIA (onde os 3 concordam)
- Pontos de DIVERGENCIA (onde discordam e por que)
- Recomendacao consolidada

## Output Format

```markdown
## Board Meeting: {tema}

### Simon Sinek
{perspectiva com framework}

### Alex Hormozi
{perspectiva com numeros}

### Steve Jobs
{perspectiva com desafio}

### Sintese
- **Convergencia:** {pontos onde os 3 concordam}
- **Divergencia:** {pontos onde discordam}
- **Recomendacao:** {caminho sugerido combinando as 3 perspectivas}
```

## Veto Conditions

- SE tema e muito especifico para 1 advisor → recomendar sessao individual
- SE tema nao tem substancia → pedir mais contexto
- SE as vozes dos advisors estao misturadas → reescrever mantendo personalidades distintas

## Quality Criteria

- [ ] Cada advisor manteve sua voz e personalidade distintas
- [ ] Frameworks relevantes foram aplicados por cada advisor
- [ ] Sinek focou em WHY/proposito/lideranca
- [ ] Hormozi focou em numeros/ofertas/escala
- [ ] Jobs focou em produto/simplicidade/excelencia
- [ ] Sintese identifica convergencias e divergencias reais
- [ ] Vozes NAO estao misturadas (cada um soa como ele mesmo)
