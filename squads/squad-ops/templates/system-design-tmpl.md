# Design de Arquitetura: {nome_do_sistema}

## Metadados

| Campo | Valor |
|-------|-------|
| **Sistema** | {nome_do_sistema} |
| **Arquiteto** | {responsavel} |
| **Data** | {YYYY-MM-DD} |
| **Status** | {proposta | aprovado | implementado} |

---

## Contexto

### Problema a Resolver
{Qual problema essa arquitetura resolve. Seja especifico.}

### Restricoes
- **Orcamento:** {limite}
- **Prazo:** {deadline}
- **Tecnologia:** {restricoes de stack}
- **Compliance:** {regulacoes aplicaveis}

---

## Requisitos

| ID | Requisito | Tipo | Prioridade |
|----|-----------|------|------------|
| RF-01 | {descricao} | Funcional | {alta | media | baixa} |
| RNF-01 | {descricao} | Nao-Funcional | {alta | media | baixa} |

---

## Arquitetura

### Diagrama

```
[Cliente] --> [API Gateway] --> [Servico A]
                            --> [Servico B] --> [Banco de Dados]
```

### Componentes

#### {Nome do Componente 1}
- **Responsabilidade:** {o que faz}
- **Tecnologia:** {stack}
- **Escalabilidade:** {como escala}
- **Dependencias:** {de quem depende}

#### {Nome do Componente 2}
- **Responsabilidade:** {o que faz}
- **Tecnologia:** {stack}
- **Escalabilidade:** {como escala}
- **Dependencias:** {de quem depende}

---

## Integracoes

| Sistema | Protocolo | Direcao | Auth | SLA |
|---------|-----------|---------|------|-----|
| {sistema_1} | {REST | gRPC | Webhook} | {entrada | saida} | {tipo} | {uptime} |

---

## Resiliencia

| Componente | SPOF? | Mitigacao | RTO |
|------------|-------|-----------|-----|
| {componente} | {sim | nao} | {failover, redundancia} | {tempo} |

---

## Seguranca

- **Auth:** {OAuth2 | JWT | API Key}
- **Secrets:** {vault | KMS | env vars}
- **Dados sensiveis:** {criptografia em transito e repouso}

---

## Observabilidade

| Pilar | Ferramenta | Retencao |
|-------|------------|----------|
| Logs | {ferramenta} | {periodo} |
| Metricas | {ferramenta} | {periodo} |
| Alertas | {ferramenta} | N/A |

---

## Trade-offs

| Decisao | Escolha | Alternativa | Justificativa |
|---------|---------|-------------|---------------|
| {decisao} | {escolha} | {alternativa} | {por que} |

---

## Plano de Implementacao

| Fase | Escopo | Duracao | Dependencias |
|------|--------|---------|--------------|
| 1 | {escopo} | {tempo} | {deps} |
| 2 | {escopo} | {tempo} | {deps} |
