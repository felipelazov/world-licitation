# Task: Estudo Biblico Tematico

**Task ID:** reino/estudo-tematico
**Version:** 1.0.0
**Execution Type:** Interativo (90% Human / 10% Agent)
**Duration:** 20-40 minutos
**Agent:** jesus-cristo

---

## Proposito
Conduzir um estudo biblico aprofundado sobre um tema especifico, percorrendo o Antigo e Novo Testamento para construir uma visao completa do que as Escrituras ensinam. O estudo conecta o significado original das passagens com aplicacao pratica para a vida moderna, finalizando com um roteiro de reflexao pessoal.

> **REGRA CRITICA:** TODAS as respostas DEVEM ser exclusivamente baseadas nas Escrituras (Biblia NVI). Cada afirmacao deve citar referencia biblica (Livro Capitulo:Versiculo). Nunca usar teologia de terceiros, tradicoes denominacionais ou opiniao pessoal. A Biblia e a unica fonte de autoridade.

---

## Inputs
```yaml
obrigatorios:
  tema:
    field: "Tema do estudo (ex: lideranca, proposito, prosperidade, sabedoria)"
    format: "string"
    required: true
  nivel_profundidade:
    field: "Nivel de profundidade do estudo"
    format: "string (introducao/intermediario/profundo)"
    required: true
opcionais:
  foco_aplicacao:
    field: "Area de aplicacao desejada (vida pessoal, negocios, familia)"
    format: "string"
    required: false
  tempo_disponivel:
    field: "Tempo disponivel para o estudo"
    format: "string"
    required: false
```

---

## Steps

### Step 1: Contextualizacao do Tema (3-5 min)
Apresentar o tema dentro do panorama biblico geral. Mostrar onde e como o tema aparece nas Escrituras, desde Genesis ate Apocalipse quando aplicavel. Definir termos-chave usando o proprio texto biblico como referencia. Ajustar a profundidade conforme o nivel escolhido (introducao, intermediario ou profundo).

### Step 2: Passagens-Chave do Antigo Testamento (5-10 min)
Selecionar e apresentar as passagens fundamentais do Antigo Testamento sobre o tema. Citar no formato Livro Capitulo:Versiculo (NVI). Explicar o contexto historico e cultural de cada passagem. Para nivel profundo, incluir conexoes entre diferentes livros e autores. Minimo de 3 passagens do AT.

### Step 3: Passagens-Chave do Novo Testamento (5-10 min)
Selecionar e apresentar as passagens fundamentais do Novo Testamento sobre o tema. Priorizar ensinamentos diretos de Jesus quando existirem. Incluir epistolas e narrativas dos apostolos que complementam o tema. Mostrar como o NT amplia ou cumpre o que o AT estabeleceu. Minimo de 3 passagens do NT.

### Step 4: Conexao com Aplicacao Pratica Moderna (3-5 min)
Construir pontes entre o significado original das passagens e a realidade atual. Cada aplicacao deve estar ancorada em um principio biblico especifico com referencia. Oferecer exemplos concretos de como viver o principio no dia a dia. Quando o foco de aplicacao for informado, direcionar para essa area.

### Step 5: Roteiro de Reflexao Pessoal (3-5 min)
Criar um roteiro estruturado para reflexao individual pos-estudo. Incluir perguntas que levem a meditacao nas passagens estudadas. Sugerir versiculos para memorizacao relacionados ao tema. Propor um desafio pratico semanal baseado no estudo. Indicar passagens complementares para leitura adicional.

---

## Output
Estudo Biblico Tematico completo contendo:
- Introducao e contextualizacao do tema nas Escrituras
- Passagens-chave do Antigo Testamento (minimo 3, com explicacao)
- Passagens-chave do Novo Testamento (minimo 3, com explicacao)
- Aplicacao pratica moderna conectada as passagens
- Roteiro de reflexao pessoal com perguntas, versiculos e desafio

---

## Quality Gate
- [ ] Todas as afirmacoes possuem referencia biblica (Livro Capitulo:Versiculo)
- [ ] Versao utilizada e exclusivamente NVI
- [ ] Nenhuma opiniao pessoal ou teologia de terceiros foi incluida
- [ ] Minimo de 3 passagens do Antigo Testamento citadas e explicadas
- [ ] Minimo de 3 passagens do Novo Testamento citadas e explicadas
- [ ] Profundidade compativel com o nivel solicitado
- [ ] Roteiro de reflexao pessoal inclui perguntas, versiculos e desafio pratico
- [ ] Output entregue no formato especificado
