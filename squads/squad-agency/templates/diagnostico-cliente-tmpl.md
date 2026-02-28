# Diagnostico de Cliente — Mapa de Oportunidades IA

**Projeto:** {nome_projeto}
**Cliente:** {nome_cliente}
**Empresa:** {nome_empresa}
**Data:** {YYYY-MM-DD}
**Agente:** estrategista-negocios
**Duracao:** {XX} minutos
**Versao:** {1.0}

---

## Dados de Receita

| Dado | Valor |
|------|-------|
| Faturamento mensal | R$ {faturamento} |
| Numero de clientes ativos | {num_clientes} |
| Ticket medio | R$ {ticket_medio} |
| Produto/servico principal | {produto_principal} |
| Canal de aquisicao principal | {canal_principal} |
| Margem estimada | {margem}% |

---

## Mapeamento de Processos

### Processo 1: {nome_processo_1}

| Campo | Detalhe |
|-------|---------|
| Descricao | {O que e esse processo} |
| Frequencia | {Diario / Semanal / Mensal / Por demanda} |
| Quem executa | {Pessoa / Cargo / Equipe} |
| Tempo medio | {XX} horas/semana |
| Manual ou automatizado | {Manual / Parcial / Automatizado} |
| Gargalo identificado | {SIM/NAO — descricao} |

### Processo 2: {nome_processo_2}

| Campo | Detalhe |
|-------|---------|
| Descricao | {O que e esse processo} |
| Frequencia | {Diario / Semanal / Mensal / Por demanda} |
| Quem executa | {Pessoa / Cargo / Equipe} |
| Tempo medio | {XX} horas/semana |
| Manual ou automatizado | {Manual / Parcial / Automatizado} |
| Gargalo identificado | {SIM/NAO — descricao} |

### Processo 3: {nome_processo_3}

| Campo | Detalhe |
|-------|---------|
| Descricao | {O que e esse processo} |
| Frequencia | {Diario / Semanal / Mensal / Por demanda} |
| Quem executa | {Pessoa / Cargo / Equipe} |
| Tempo medio | {XX} horas/semana |
| Manual ou automatizado | {Manual / Parcial / Automatizado} |
| Gargalo identificado | {SIM/NAO — descricao} |

> Adicionar mais processos conforme necessario.

---

## Problemas e Dores

### Principal Gargalo

> **{Descricao do gargalo principal — na voz do cliente}**

| Campo | Detalhe |
|-------|---------|
| Custo estimado | R$ {custo}/mes OU {horas} horas/semana desperdicadas |
| Urgencia (1-10, pelo cliente) | {nota} |
| Impacto no faturamento | {Direto / Indireto — como afeta?} |
| Tentativas anteriores | {O que ja tentaram pra resolver?} |
| Por que nao resolveu | {O que faltou nas tentativas anteriores?} |

### Dores Secundarias

| # | Dor | Impacto | Urgencia |
|---|-----|---------|----------|
| 1 | {dor_1} | {como afeta} | {1-10} |
| 2 | {dor_2} | {como afeta} | {1-10} |
| 3 | {dor_3} | {como afeta} | {1-10} |

---

## Oportunidades de IA (Rankeadas por Impacto)

### Oportunidade #1: {nome_oportunidade} — QUICK WIN

| Campo | Detalhe |
|-------|---------|
| Descricao | {O que a IA faria aqui} |
| Processo impactado | {Qual processo da Secao 2} |
| Tipo de solucao | {WhatsApp Bot / Automacao / Dashboard / Custom} |
| ROI estimado | {economia ou ganho em R$ ou horas/mes} |
| Prazo de entrega | **7 dias** |
| Complexidade | {Baixa / Media / Alta} |
| Investimento estimado | R$ {valor} |

### Oportunidade #2: {nome_oportunidade}

| Campo | Detalhe |
|-------|---------|
| Descricao | {O que a IA faria aqui} |
| Processo impactado | {Qual processo} |
| Tipo de solucao | {WhatsApp Bot / Automacao / Dashboard / Custom} |
| ROI estimado | {economia ou ganho} |
| Prazo de entrega | {14-30 dias} |
| Complexidade | {Baixa / Media / Alta} |
| Investimento estimado | R$ {valor} |

### Oportunidade #3: {nome_oportunidade}

| Campo | Detalhe |
|-------|---------|
| Descricao | {O que a IA faria aqui} |
| Processo impactado | {Qual processo} |
| Tipo de solucao | {WhatsApp Bot / Automacao / Dashboard / Custom} |
| ROI estimado | {economia ou ganho} |
| Prazo de entrega | {14-30 dias} |
| Complexidade | {Baixa / Media / Alta} |
| Investimento estimado | R$ {valor} |

---

## Resumo Executivo

> {2-3 frases resumindo: "O cliente [nome] fatura R$X/mes com [produto]. Principal gargalo e [gargalo] que custa R$Y/mes. A oportunidade mais impactante e [oportunidade #1] com ROI de [ROI] e entrega em 7 dias."}

---

## Recomendacao

| Acao | Detalhe |
|------|---------|
| Proximo passo recomendado | {Gerar proposta focada na Oportunidade #1} |
| Quick win (7 dias) | {Descricao do entregavel rapido} |
| Pacote completo (30 dias) | {Descricao do escopo total} |
| Decisao do cliente | {Aceitar diagnostico / Pedir tempo / Recusar} |

---

## Output YAML (para pipeline)

```yaml
diagnostico:
  cliente: "{nome_cliente}"
  empresa: "{nome_empresa}"
  data: "{YYYY-MM-DD}"
  receita:
    faturamento_mensal: {valor}
    clientes_ativos: {num}
    ticket_medio: {valor}
    produto_principal: "{produto}"
    canal_principal: "{canal}"
  processos:
    - nome: "{processo_1}"
      frequencia: "{freq}"
      executor: "{quem}"
      tempo_semanal: {horas}
      manual: {true/false}
      gargalo: {true/false}
    - nome: "{processo_2}"
      frequencia: "{freq}"
      executor: "{quem}"
      tempo_semanal: {horas}
      manual: {true/false}
      gargalo: {true/false}
    - nome: "{processo_3}"
      frequencia: "{freq}"
      executor: "{quem}"
      tempo_semanal: {horas}
      manual: {true/false}
      gargalo: {true/false}
  gargalo_principal:
    descricao: "{descricao}"
    custo_mensal: {valor}
    urgencia: {1-10}
  oportunidades:
    - nome: "{opp_1}"
      tipo: "{tipo_solucao}"
      roi_estimado: {valor}
      prazo_dias: 7
      quick_win: true
      ranking: 1
    - nome: "{opp_2}"
      tipo: "{tipo_solucao}"
      roi_estimado: {valor}
      prazo_dias: {dias}
      quick_win: false
      ranking: 2
    - nome: "{opp_3}"
      tipo: "{tipo_solucao}"
      roi_estimado: {valor}
      prazo_dias: {dias}
      quick_win: false
      ranking: 3
  quality_gate: "QG-IAOS-001"
  status: "{APROVADO/ATENCAO/ALERTA/REPROVADO}"
```

---

## Conexao com Pipeline

| Campo em project-state.yaml | Valor |
|------------------------------|-------|
| (registrado via ia-agency-chief) | Diagnostico concluido pra {cliente} |

### Sinapses a Criar

| Para | Decisao | Acao esperada |
|------|---------|---------------|
| squad-agency (proposta) | Diagnostico aprovado | Gerar proposta comercial com dados do diagnostico |

---

## Change Log

| Data | Alteracao | Autor |
|------|-----------|-------|
| {YYYY-MM-DD} | Diagnostico realizado | estrategista-negocios |
