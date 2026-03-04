# Squad Licitacao ⚖️

Squad especializado em licitacoes publicas para fornecedores de alimentos e cesta basica.

## Visao Geral

Cobre todo o ciclo licitatorio: prospeccao de editais, analise, habilitacao, estrategia de lance, gestao de contrato e entrega. Foco em pregao eletronico (Compras.gov, BEC, portais estaduais/municipais).

## Agentes

| Agente | Tier | Papel | Baseado em |
|--------|------|-------|------------|
| `licitacao-chief` | Orchestrator | Coordenacao do ciclo completo | Funcional |
| `edital-analyst` | Tier 1 | Analise juridica e tecnica de editais | Joel Niebuhr + Herbert Almeida |
| `bid-strategist` | Tier 1 | Precificacao e estrategia de lance | Henrique Serra / Magna Licitacoes |
| `compliance-officer` | Tier 1 | Habilitacao e documentacao | Carlos Nascimento / Licitacursos |
| `contract-manager` | Tier 2 | Gestao pos-adjudicacao | Rodrigo Pironti |
| `pnae-specialist` | Tier 2 | Alimentacao escolar (PNAE) | FNDE + CFN |

## Pipeline

```
Edital Identificado
    → @edital-analyst (GO/NO-GO)
    → @compliance-officer (habilitacao)
    → @bid-strategist (preco + lance)
    → SESSAO DO PREGAO
    → @contract-manager (contrato + entrega)
```

## Ativacao

```
/squad-licitacao:agents:licitacao-chief    # Orchestrador
/squad-licitacao:agents:edital-analyst     # Analise de editais
/squad-licitacao:agents:bid-strategist     # Preco e lance
/squad-licitacao:agents:compliance-officer # Documentacao
/squad-licitacao:agents:contract-manager   # Contratos
/squad-licitacao:agents:pnae-specialist    # Alimentacao escolar
```

## Base Legal

- Lei 14.133/2021 — Nova Lei de Licitacoes
- Lei 11.947/2009 — PNAE
- Resolucao CD/FNDE 6/2020 — Execucao do PNAE
- Decreto 11.462/2023 — Regulamento da Lei 14.133

## Fontes de Conhecimento

| Expert/Fonte | Contribuicao |
|---|---|
| Joel Niebuhr (Zenite) | Pregao eletronico, registro de precos |
| Herbert Almeida | Lei 14.133 esquematizada |
| Henrique Serra / Magna Licitacoes | Estrategia de fornecedor |
| Carlos Nascimento / Licitacursos | Habilitacao (visao ex-pregoeiro) |
| Rodrigo Pironti | Matriz de riscos em contratos |
| FNDE / CFN | Regras PNAE e nutricionais |
