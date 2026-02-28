# Task: Diagnostico de Cliente PME

**Task ID:** ia-agency-os/diagnostico-cliente
**Version:** 1.0.0
**Execution Type:** Interativo (80% Human / 20% Agent)
**Duration:** 30 minutos
**Agent:** estrategista-negocios

---

## Proposito

Conduzir um diagnostico completo do negocio de um cliente PME em 30 minutos. O output e um Mapa de Oportunidades IA que mostra EXATAMENTE onde IA vai gerar resultado no negocio, com ROI calculado para cada oportunidade.

---

## Inputs

```yaml
obrigatorios:
  nome_cliente:
    field: "Nome do cliente/empresa"
    format: "string"
    required: true

  segmento:
    field: "Segmento de atuacao"
    format: "string"
    required: true

opcionais:
  faturamento:
    field: "Faturamento mensal aproximado"
    format: "string"
    required: false

  site_instagram:
    field: "Site ou Instagram do negocio"
    format: "url"
    required: false
```

---

## Steps

### Step 1: Abertura (2 min)

```
Ola [nome]! Sou o Felipe, e nos proximos 30 minutos vou
mapear onde IA pode gerar resultado REAL no seu negocio.

Nao vou falar de tecnologia complicada — vou falar de
RESULTADO: tempo economizado, vendas aumentadas, custos cortados.

Vou te fazer algumas perguntas rapidas. Pode ser?
```

### Step 2: Revenue — Entendendo o Negocio (5 min)

Perguntas:
1. Quanto sua empresa fatura por mes? (aproximado)
2. Quantos clientes ativos voce tem?
3. Qual seu produto/servico principal?
4. De onde vem a maioria das vendas? (Instagram, WhatsApp, loja fisica, indicacao)
5. Quantas pessoas trabalham na empresa?

### Step 3: Atividades — Mapeando Processos (8 min)

Perguntas:
1. Me descreve como funciona desde o cliente entrar em contato ate receber o produto/servico
2. Qual processo consome MAIS tempo da sua equipe?
3. Qual processo voce mais gostaria de nao precisar fazer?
4. Tem algum processo que depende 100% de UMA pessoa? (se essa pessoa faltar, para tudo?)
5. Como e o atendimento ao cliente hoje? (WhatsApp manual? Email? Telefone?)

### Step 4: Problemas — Identificando Gargalos (8 min)

Perguntas:
1. Qual o MAIOR problema do seu negocio hoje?
2. Quanto voce estima que esse problema custa por mes? (em tempo OU dinheiro)
3. Voce ja tentou resolver isso antes? O que aconteceu?
4. Se voce pudesse resolver UMA coisa magicamente, o que seria?
5. Numa escala de 1-10, quao urgente e resolver isso?

### Step 5: IA Oportunidades — Prescricao (5 min)

Para cada gargalo identificado, o agente avalia:
- Pode ser automatizado com IA? (Sim/Parcial/Nao)
- Complexidade (Baixa/Media/Alta)
- Tempo ate resultado (7/30/90 dias)
- ROI estimado
- Prioridade (Quick Win / Medio Prazo / Longo Prazo)

### Step 6: Decisao — Apresentacao (2 min)

Apresentar o Mapa de Oportunidades:
```
[Nome], aqui esta o que encontrei no seu negocio:

GARGALO PRINCIPAL: [descricao]
Custo estimado: R$ [valor]/mes

TOP 3 OPORTUNIDADES COM IA:

#1 [solucao] — Quick Win (7 dias)
   Investimento: R$ [valor]/mes | Retorno: R$ [valor]/mes | ROI: [X]x

#2 [solucao] — Medio Prazo (30 dias)
   Investimento: R$ [valor]/mes | Retorno: R$ [valor]/mes | ROI: [X]x

#3 [solucao] — Longo Prazo (90 dias)
   Investimento: R$ [valor]/mes | Retorno: R$ [valor]/mes | ROI: [X]x

Proximo passo: Posso te enviar uma proposta detalhada
com cronograma e valores exatos. Posso mandar?
```

---

## Output

```yaml
file: "squads/ia-agency-os/data/clientes/{slug}-diagnostico.yaml"
format: "yaml"
conteudo:
  diagnostico:
    cliente: "{nome}"
    segmento: "{segmento}"
    faturamento_mensal: "R$ {valor}"
    data: "{data}"

    revenue:
      faturamento: "R$ {valor}"
      clientes_ativos: {numero}
      produto_principal: "{descricao}"
      canal_principal: "{canal}"
      equipe: {numero}

    processos:
      processo_mais_tempo: "{descricao}"
      processo_indesejado: "{descricao}"
      gargalo_pessoa: "{descricao}"
      atendimento_atual: "{descricao}"

    problemas:
      problema_principal: "{descricao}"
      custo_mensal: "R$ {valor}"
      tentativas_anteriores: "{descricao}"
      urgencia: {1-10}

    oportunidades:
      - rank: 1
        solucao: "{descricao}"
        tipo: "Quick Win"
        tempo: "7 dias"
        investimento: "R$ {valor}/mes"
        retorno: "R$ {valor}/mes"
        roi: "{X}x"
      - rank: 2
        # ...
      - rank: 3
        # ...

    quick_win: "{descricao do quick win de 7 dias}"
    proximo_passo: "proposta-comercial"
```

---

## Quality Gate: QG-IAOS-001

- [ ] Todas as perguntas de Revenue respondidas
- [ ] Pelo menos 3 processos mapeados
- [ ] Gargalo principal identificado com custo estimado
- [ ] Minimo 3 oportunidades de IA rankeadas por ROI
- [ ] Quick win de 7 dias definido
- [ ] Proximo passo claro para o cliente

---

## Veto Conditions

- Se cliente nao sabe o faturamento (nem aproximado) → Pedir estimativa antes de prosseguir
- Se nenhum processo pode ser automatizado → Ser honesto, nao forcar venda
- Se urgencia < 3 → Cliente nao esta pronto, agendar follow-up em 30 dias

---

**Task Status:** Ready for Production
