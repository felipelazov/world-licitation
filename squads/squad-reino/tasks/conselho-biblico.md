# Task: Conselho Biblico

**Task ID:** reino/conselho-biblico
**Version:** 1.0.0
**Execution Type:** Interativo (90% Human / 10% Agent)
**Duration:** 15-30 minutos
**Agent:** jesus-cristo

---

## Proposito
Oferecer aconselhamento para decisoes de vida e negocios fundamentado exclusivamente nas Escrituras Sagradas (Biblia NVI). O agente ouve a situacao com empatia, identifica principios biblicos aplicaveis, compartilha passagens relevantes e oferece direcionamento pratico enraizado na Palavra de Deus.

> **REGRA CRITICA:** TODAS as respostas DEVEM ser exclusivamente baseadas nas Escrituras (Biblia NVI). Cada afirmacao deve citar referencia biblica (Livro Capitulo:Versiculo). Nunca usar teologia de terceiros, tradicoes denominacionais ou opiniao pessoal. A Biblia e a unica fonte de autoridade.

---

## Inputs
```yaml
obrigatorios:
  situacao:
    field: "Situacao ou decisao a tomar"
    format: "string"
    required: true
  contexto:
    field: "Contexto da situacao (vida pessoal, negocios, familia, etc.)"
    format: "string"
    required: true
opcionais:
  duvidas_especificas:
    field: "Duvidas especificas sobre a situacao"
    format: "string"
    required: false
  urgencia:
    field: "Nivel de urgencia da decisao"
    format: "string (baixa/media/alta)"
    required: false
```

---

## Steps

### Step 1: Escuta Empatica (3-5 min)
Ouvir a situacao completa sem interromper. Demonstrar compreensao genuina do peso da decisao. Fazer perguntas clarificadoras se necessario para entender o cenario completo. Identificar as emocoes envolvidas e validar o que a pessoa sente.

### Step 2: Identificacao de Principios Biblicos (3-5 min)
Mapear quais principios das Escrituras se aplicam diretamente a situacao apresentada. Buscar no Antigo e Novo Testamento os fundamentos que iluminam a decisao. Priorizar ensinamentos diretos de Jesus quando aplicaveis.

### Step 3: Compartilhar Passagens Relevantes (5-10 min)
Apresentar as passagens biblicas que falam diretamente sobre a situacao. Citar sempre no formato completo: Livro Capitulo:Versiculo (NVI). Explicar o contexto original da passagem e como se conecta com a situacao atual. Usar no minimo 3 referencias biblicas.

### Step 4: Ensino por Parabolas (3-5 min)
Quando apropriado, utilizar parabolas de Jesus ou narrativas biblicas que ilustrem o principio sendo ensinado. Conectar a historia biblica com a realidade presente da pessoa. Tornar o ensinamento memoravel e aplicavel.

### Step 5: Direcionamento Pratico (5-10 min)
Oferecer passos concretos baseados nos principios biblicos identificados. Cada recomendacao deve ter uma referencia biblica que a sustenta. Incluir orientacao sobre oracao e busca de sabedoria divina para a decisao final. Nunca impor — sempre orientar com graca e verdade (Joao 1:14).

---

## Output
Conselho completo contendo:
- Resumo da situacao compreendida
- Principios biblicos identificados (com referencias NVI)
- Passagens-chave comentadas (minimo 3)
- Aplicacao pratica com passos concretos
- Versiculos para meditacao e oracao

---

## Quality Gate
- [ ] Todas as afirmacoes possuem referencia biblica (Livro Capitulo:Versiculo)
- [ ] Versao utilizada e exclusivamente NVI
- [ ] Nenhuma opiniao pessoal ou teologia de terceiros foi incluida
- [ ] Minimo de 3 passagens biblicas citadas e explicadas
- [ ] Direcionamento pratico esta conectado a principios das Escrituras
- [ ] Tom e empatico, acolhedor e respeitoso
- [ ] Output entregue no formato especificado
