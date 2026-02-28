# Especificacao de Automacao: {nome_da_automacao}

## Metadados

| Campo | Valor |
|-------|-------|
| **Automacao** | {nome_da_automacao} |
| **Processo Origem** | {nome_do_processo} |
| **Responsavel** | {automation_architect} |
| **Data** | {YYYY-MM-DD} |
| **Status** | {especificacao | desenvolvimento | producao} |

---

## Resumo

{2-3 frases: o que faz, por que e necessaria, qual ganho entrega.}

### ROI Estimado

| Metrica | Manual | Automatizado |
|---------|--------|--------------|
| Tempo por execucao | {tempo} | {tempo} |
| Execucoes por semana | {qtd} | {qtd} |
| Taxa de erro | {taxa}% | {taxa}% |

**Payback:** {meses ate ROI positivo}

---

## Trigger

| Tipo | Configuracao |
|------|-------------|
| **Agendado** | {cron ou descricao: "todo dia as 08:00"} |
| **Evento** | {ex: "novo registro no CRM"} |
| **Manual** | {quem pode disparar e como} |

**Pre-condicoes:** {o que precisa ser verdade para executar}
**Validacao de entrada:** {regras de validacao dos inputs}

---

## Logica de Execucao

```
[Trigger] -> [Validar] -> [Etapa 1] -> [Decisao] -> [Etapa 2] -> [Output]
```

### Etapa 1: {nome}
- **Input:** {dados}
- **Logica:** {regras de negocio}
- **Output:** {resultado}
- **Servico:** {API ou ferramenta}

### [DECISAO] {pergunta}
- **Se SIM:** {acao}
- **Se NAO:** {acao}

### Etapa 2: {nome}
- **Input:** {dados}
- **Logica:** {regras de negocio}
- **Output:** {resultado}
- **Servico:** {API ou ferramenta}

---

## Outputs

| Saida | Formato | Destino |
|-------|---------|---------|
| {saida_1} | {JSON | CSV | email} | {para onde vai} |
| {saida_2} | {JSON | CSV | email} | {para onde vai} |

### Notificacoes

| Evento | Canal | Destinatario |
|--------|-------|-------------|
| Sucesso | {Slack | email} | {quem} |
| Falha | {Slack | email} | {quem} |

---

## Tratamento de Erros

| Tipo de Erro | Retry? | Tentativas | Acao Final |
|-------------|--------|------------|------------|
| Timeout | Sim | 3 | Notificar + fallback |
| Dados invalidos | Nao | - | Rejeitar + notificar |
| Servico fora | Sim | 5 | Notificar + fila |

### Fallback Manual
- **Responsavel:** {pessoa}
- **Procedimento:** {passos para executar manualmente}

---

## Integracoes

| Sistema | Tipo | Auth | Rate Limit |
|---------|------|------|------------|
| {sistema} | {REST | Webhook} | {tipo} | {req/min} |

---

## Monitoramento

| Metrica | Alvo | Warning | Critical |
|---------|------|---------|----------|
| Taxa de sucesso | > {X}% | < {Y}% | < {Z}% |
| Tempo de execucao | < {X}s | > {Y}s | > {Z}s |
