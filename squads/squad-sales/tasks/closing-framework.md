# Task: Framework de Fechamento Consultivo (NEPQ)

**Task ID:** squad-sales/closing-framework
**Version:** 1.0.0
**Execution Type:** Interativo (80% Human / 20% Agent)
**Duration:** 50 minutos
**Agent:** jeremy-miner

---

## Proposito

Desenhar um framework completo de fechamento consultivo baseado no metodo NEPQ (Neuro-Emotional Persuasion Questions). O output e um Closing Framework com scripts de perguntas diagnosticas, tratamento de objecoes e sequencias de fechamento que transformam vendas transacionais em vendas consultivas.

---

## Inputs

```yaml
obrigatorios:
  produto_servico:
    field: "Produto ou servico vendido"
    format: "string"
    required: true
    example: "Consultoria de IA para PMEs"

  faixa_preco:
    field: "Faixa de preco (ticket)"
    format: "string"
    required: true
    example: "R$2.000-5.000/mes"

  objecoes_comuns:
    field: "Top 5 objecoes mais frequentes"
    format: "lista"
    required: true
    example: "preco alto, preciso pensar, ja tenho fornecedor, nao e prioridade, nao tenho tempo"

  ciclo_venda:
    field: "Duracao media do ciclo de venda"
    format: "string"
    required: true
    example: "7-14 dias"

opcionais:
  processo_atual:
    field: "Como as vendas sao feitas hoje"
    format: "string"
    required: false

  taxa_conversao:
    field: "Taxa de conversao atual"
    format: "string"
    required: false
```

---

## Steps

### Step 1: Mapear Psicologia do Comprador (10 min)

Entender o processo de decisao do comprador:
- **Status quo bias:** por que o cliente resiste a mudar?
- **Dor latente vs dor ativa:** o cliente JA sabe que tem o problema?
- **Gatilhos emocionais:** o que motiva a decisao (medo, ambicao, frustracão, urgencia)
- **Jornada de compra:** awareness → consideration → decision
- **Stakeholders:** quem influencia, quem decide, quem paga

Perguntas para o usuario:
1. Quando um cliente diz "sim", qual foi o momento decisivo?
2. Quando diz "nao", qual e a razao real (nao a desculpa)?
3. O que seu melhor cliente diria sobre o resultado que teve?

### Step 2: Desenhar Perguntas Diagnosticas NEPQ (15 min)

Construir a sequencia de perguntas NEPQ em 4 fases:

**Fase 1 — Situation Questions (Conexao):**
Perguntas que demonstram interesse genuino e constroem rapport.
```
"Me conta um pouco sobre como funciona {processo} no seu negocio hoje?"
"Ha quanto tempo voce faz dessa forma?"
"O que te levou a buscar uma solucao agora?"
```

**Fase 2 — Problem Awareness Questions (Dor):**
Perguntas que fazem o cliente SENTIR o peso do problema.
```
"E como isso tem impactado {area especifica}?"
"Quanto voce estima que isso custa por mes em {tempo/dinheiro/oportunidade}?"
"O que acontece se nada mudar nos proximos 6 meses?"
```

**Fase 3 — Solution Awareness Questions (Visao):**
Perguntas que criam a visao do futuro ideal.
```
"Se voce pudesse resolver isso, como seria o cenario ideal?"
"Quanto valeria para voce ter {resultado especifico}?"
"O que mudaria no seu dia-a-dia se {problema} nao existisse mais?"
```

**Fase 4 — Consequence Questions (Urgencia):**
Perguntas que criam urgencia natural (sem pressao artificial).
```
"Quanto mais tempo sem resolver, o custo aumenta ou diminui?"
"Seus concorrentes ja estao fazendo algo sobre isso?"
"O que te impediria de comecar a resolver isso agora?"
```

### Step 3: Construir Scripts de Objecao (10 min)

Para cada objecao informada, criar tratamento usando framework:
1. **Acknowledge** — validar o sentimento ("Faz total sentido voce pensar assim...")
2. **Ask** — fazer pergunta que expoe a raiz ("So por curiosidade, quando voce diz X, o que especificamente...")
3. **Reframe** — reposicionar a percepcao ("Interessante, porque clientes que tinham essa mesma preocupacao descobriram que...")
4. **Advance** — mover para proximo passo ("Faria sentido entao a gente...")

Tratar no minimo as 5 objecoes fornecidas com scripts completos.

### Step 4: Criar Sequencias de Fechamento (10 min)

Desenhar 3 tecnicas de fechamento consultivo:

**Fechamento Natural:**
Resumir a conversa e fazer a transicao organica.
```
"Entao, resumindo: voce tem {problema}, que custa {valor}, e quer {resultado}.
A gente faz exatamente isso. Faz sentido comecarmos {proximo passo}?"
```

**Fechamento por Compromisso Gradual:**
Sequencia de micro-compromissos que levam ao sim.
```
"Isso faz sentido para voce?" → "Voce gostaria de ter esse resultado?" →
"Se a gente conseguir entregar isso, valeria o investimento?" →
"Otimo, entao vamos fazer o seguinte..."
```

**Fechamento por Alternativa:**
Oferecer opcoes em vez de sim/nao.
```
"Temos duas formas de comecar: {opcao A} ou {opcao B}.
Qual faz mais sentido para o seu momento?"
```

### Step 5: Definir Cadencia de Follow-up (5 min)

Estruturar follow-up pos-reuniao para leads que nao fecharam:
- **Dia 1:** Resumo da conversa + proximo passo claro
- **Dia 3:** Conteudo de valor (case, artigo, dado relevante)
- **Dia 5:** Check-in com pergunta aberta
- **Dia 7:** Mensagem de urgencia suave (vaga, preco, disponibilidade)
- **Dia 10:** Break-up message ("Imagino que nao e o momento...")
- **Dia 30:** Re-engagement ("Lembrei de voce quando...")

---

## Output

```yaml
file: "squads/squad-sales/data/{slug}-closing-framework.md"
format: "markdown"
conteudo:
  - mapa_psicologia_comprador
  - scripts_nepq_4_fases
  - scripts_objecao_completos
  - sequencias_fechamento
  - cadencia_followup
```

---

## Quality Gate: QG-SALES-002

- [ ] Psicologia do comprador mapeada com gatilhos emocionais
- [ ] Minimo 3 perguntas por fase NEPQ (12 perguntas total)
- [ ] Todas as objecoes informadas com scripts de tratamento
- [ ] Minimo 3 tecnicas de fechamento consultivo
- [ ] Cadencia de follow-up definida com templates
- [ ] Scripts escritos em linguagem natural (nao robotica)
- [ ] Framework adaptado ao produto/servico especifico do usuario

---

## Veto Conditions

- Se produto/servico nao definido → Definir oferta antes de criar scripts
- Se nenhuma objecao mapeada → Entrevistar equipe de vendas primeiro
- Se ciclo de venda > 90 dias → Adicionar nurturing sequence ao framework

---

**Task Status:** Ready for Production
