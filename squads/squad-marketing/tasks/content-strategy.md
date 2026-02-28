# Task: Estrategia de Conteudo + Calendario Editorial

**Task ID:** squad-marketing/content-strategy
**Version:** 1.0.0
**Execution Type:** Interativo (80% Human / 20% Agent)
**Duration:** 55 minutos
**Agent:** joe-pulizzi

---

## Proposito

Construir uma estrategia de conteudo completa com missao editorial, pilares tematicos, content tilt (diferencial unico), calendario editorial de 30 dias e plano de distribuicao. O output e um documento estrategico que transforma conteudo aleatorio em uma maquina de atracao previsivel.

---

## Inputs

```yaml
obrigatorios:
  negocio:
    field: "Descricao do negocio/marca"
    format: "string"
    required: true

  audiencia:
    field: "Quem e a audiencia ideal (persona)"
    format: "string"
    required: true

  plataformas:
    field: "Plataformas onde vai publicar (Instagram, YouTube, LinkedIn, etc.)"
    format: "list"
    required: true

  frequencia_meta:
    field: "Quantos conteudos por semana deseja publicar"
    format: "number"
    required: true

opcionais:
  conteudo_existente:
    field: "Ja produz conteudo? Que tipo?"
    format: "string"
    required: false

  referencias:
    field: "Criadores/marcas que admira como referencia"
    format: "list"
    required: false

  objetivo_negocio:
    field: "Objetivo de negocio principal (leads, vendas, autoridade)"
    format: "string"
    required: false

  tom_de_voz:
    field: "Tom de voz da marca"
    format: "string"
    required: false
```

---

## Steps

### Step 1: Content Mission Statement (8 min)

Criar a declaracao de missao editorial (modelo Joe Pulizzi):

```
"[Marca/Pessoa] existe para ajudar [audiencia]
 a [transformacao desejada]
 atraves de [tipo de conteudo]
 para que possam [resultado final]."
```

**Perguntas ao usuario:**
1. Se seu conteudo fosse uma revista, sobre o que seria?
2. Quem e a pessoa EXATA que voce quer atrair? (nome, idade, problema)
3. Qual transformacao voce promete? (de onde → para onde)
4. Por que VOCE e a pessoa certa para falar sobre isso?

A missao editorial e o filtro: se um conteudo nao se encaixa, nao publica.

### Step 2: Pilares Tematicos (10 min)

Definir 3-5 pilares de conteudo:

| Pilar | Descricao | % do Conteudo | Exemplo |
|-------|-----------|---------------|---------|
| Pilar 1 | {tema core} | 30% | {exemplo de post} |
| Pilar 2 | {tema suporte} | 25% | {exemplo de post} |
| Pilar 3 | {tema conexao} | 20% | {exemplo de post} |
| Pilar 4 | {tema autoridade} | 15% | {exemplo de post} |
| Pilar 5 | {tema pessoal} | 10% | {exemplo de post} |

**Perguntas ao usuario:**
1. Quais sao os 3 assuntos que voce NUNCA cansa de falar?
2. Quais perguntas seus clientes fazem repetidamente?
3. O que voce sabe que sua audiencia NAO sabe (e precisa saber)?
4. Voce se sente confortavel mostrando bastidores/vida pessoal?

**Regras dos pilares:**
- Pilar 1 deve ser o tema core do negocio
- Pelo menos 1 pilar deve ser "pessoal/bastidores" (conexao humana)
- Nenhum pilar deve ser < 10% do conteudo total
- Todos os pilares devem conectar ao Content Mission Statement

### Step 3: Content Tilt — Seu Diferencial Unico (8 min)

O Content Tilt e o angulo UNICO que ninguem mais usa:

**Perguntas ao usuario:**
1. O que voce faz de DIFERENTE de todo mundo no seu nicho?
2. Qual e sua opiniao mais controversa sobre seu mercado?
3. Voce tem um framework, metodo ou processo proprio?
4. Qual experiencia de vida unica voce traz para o tema?

**Formula do Content Tilt:**
```
[Tema do nicho] + [Angulo unico] + [Para quem especifico]

Exemplo: "Marketing digital" + "para quem odeia aparecer" + "introvertidos com negocio online"
```

Definir:
- **Area de intersecao:** O que eu sei + O que minha audiencia precisa + O que ninguem fala
- **Formato signature:** O formato que mais combina com seu estilo (threads, carrosseis, videos curtos, longform)
- **Serie recorrente:** Um formato que repete semanalmente (ex: "Segunda do Mindset", "Case da Semana")

### Step 4: Calendario Editorial 30 Dias (18 min)

Criar calendario completo:

```
SEMANA 1 (Dias 1-7)
| Dia | Plataforma | Pilar | Formato | Titulo/Tema | Horario |
|-----|-----------|-------|---------|-------------|---------|
| Seg | Instagram | P1 | Carrossel | {tema} | {hora} |
| Ter | LinkedIn | P2 | Post texto | {tema} | {hora} |
| Qua | Instagram | P3 | Reels | {tema} | {hora} |
| ...
```

**Regras do calendario:**
1. Nunca repetir o mesmo pilar 2 dias seguidos na mesma plataforma
2. Alternar formatos (nao fazer 3 carrosseis seguidos)
3. 1 conteudo "hero" por semana (maior esforco, maior impacto)
4. 1 conteudo "serie recorrente" por semana (formato signature)
5. Sexta ou sabado = conteudo mais leve/pessoal

**Perguntas ao usuario:**
1. Qual dia da semana voce tem mais tempo para criar conteudo?
2. Prefere gravar tudo em um dia (batch) ou um pouco por dia?
3. Tem alguma data especial nos proximos 30 dias? (lancamento, evento, feriado)

**Distribuicao por frequencia:**
| Posts/semana | Recomendacao |
|-------------|-------------|
| 3 | 2 pilares core + 1 pessoal |
| 5 | 3 pilares core + 1 autoridade + 1 pessoal |
| 7 | 4 pilares core + 2 autoridade + 1 pessoal |

### Step 5: Plano de Distribuicao (11 min)

Para cada plataforma, definir:

```
PLATAFORMA: {nome}
Frequencia: {X} posts/semana
Formatos principais: {formatos}
Melhor horario: {horario}
Hashtag strategy: {estrategia}
Objetivo na plataforma: {awareness | engajamento | conversao}

Repurpose plan:
  Post original em {plataforma A}
  → Adaptar para {plataforma B} como {formato}
  → Cortar para {plataforma C} como {formato}
```

**Cross-posting inteligente (nao copiar, adaptar):**
- Instagram Carrossel → LinkedIn Document Post
- YouTube Video → Instagram Reels (cortes)
- Twitter Thread → LinkedIn Post (expandido)
- Blog Post → Newsletter (resumo + link)

---

## Output

```yaml
file: "squads/squad-marketing/data/{slug}-content-strategy.yaml"
format: "yaml"
conteudo:
  content_strategy:
    cliente: "{nome}"
    data: "{data}"
    mission_statement: "{declaracao de missao editorial}"
    content_tilt: "{angulo unico}"
    formato_signature: "{formato principal}"
    serie_recorrente: "{nome da serie + frequencia}"
    pilares:
      - nome: "{pilar}"
        percentual: "{X}%"
        descricao: "{descricao}"
        exemplos: ["{exemplo 1}", "{exemplo 2}"]
    calendario_30_dias:
      semana_1:
        - dia: "{dia}"
          plataforma: "{plataforma}"
          pilar: "{pilar}"
          formato: "{formato}"
          tema: "{titulo/tema}"
          horario: "{HH:MM}"
      # semanas 2-4 seguem mesmo formato
    distribuicao:
      - plataforma: "{nome}"
        frequencia: "{X}/semana"
        formatos: ["{formato}"]
        horario: "{HH:MM}"
        repurpose_de: "{plataforma origem}"
    proximo_passo: "producao-de-conteudo"
```

---

## Quality Gate

- [ ] Content Mission Statement definido e aprovado
- [ ] 3-5 pilares tematicos com percentuais
- [ ] Content Tilt claro e unico
- [ ] Formato signature definido
- [ ] Calendario de 30 dias completo (todas as semanas)
- [ ] Cada dia tem plataforma, pilar, formato e tema
- [ ] Plano de distribuicao por plataforma
- [ ] Estrategia de repurpose documentada

---

## Veto Conditions

- Se frequencia meta > capacidade real → Reduzir e ser realista (consistencia > volume)
- Se nao consegue definir Content Tilt → Nao seguir sem diferencial, retornar ao Step 3
- Se todos os pilares sao iguais → Diversificar, precisa de variedade tematica
- Se audiencia muito generica → Refinar persona antes de criar estrategia

---

**Task Status:** Ready for Production
