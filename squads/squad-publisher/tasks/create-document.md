# Task: create-document

> **Command:** `*document`
> **Agent:** doc-chief (routes to pipeline)
> **Purpose:** Criar documento profissional generico

---

## Overview

Cria qualquer documento profissional (relatorio, proposta, manual, material de treinamento).
Pipeline adaptado: Tufte → Vignelli → Lupton.

## Input

| Parameter | Required | Description |
|-----------|----------|-------------|
| `type` | Yes | Tipo: relatorio, proposta, manual, treinamento |
| `audience` | Yes | Publico-alvo |
| `content` | Yes | Conteudo a ser formatado |

## Execution

1. **Briefing** (doc-chief): tipo, publico, objetivo, tom
2. **Arquitetura** (Tufte): hierarquia, fluxo, eliminacao
3. **Design System** (Vignelli): tipo, cor, grid, componentes
4. **Tipografia** (Lupton): hierarquia tipografica, composicao

Para documentos longos (10+ paginas), adicionar:
5. **Grid** (Muller-Brockmann): layout multi-pagina
6. **Refinamento** (Bringhurst): polish final

## Output

Spec completo do documento.

## Veto Conditions

- Sem conteudo fonte = nao comeca
- Sem publico definido = nao comeca
