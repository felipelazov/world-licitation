# MCP Strategy — Project World

## Objetivo

Adicionar **ferramentas externas específicas** ao projeto sem desperdício de tokens. Cada MCP é ativado **conscientemente** apenas quando necessário.

---

## MCPs Habilitados (4)

### 1. EXA — Web Search & Research
**Status:** Recomendado
**Custo:** ~500-1000 tokens por busca
**Quando usar:**
- ✅ Squad-advisor pesquisa mercado / competidores (máx 1x/mês)
- ✅ Análise de tendências para positioning
- ❌ NÃO para coisas já conhecidas
- ❌ NÃO sem objetivo específico ("vamos pesquisar sobre...")

**Regra:** Sempre perguntar "é vraimente necessário pesquisar agora?" antes de ativar.

### 2. GitHub — Version Control & Collaboration
**Status:** Essencial
**Custo:** ~300-500 tokens por operação
**Quando usar:**
- ✅ Clonar / referenciar repos de documentação
- ✅ Criar / atualizar issues
- ✅ PR operations quando pedido
- ❌ NÃO fetch de código em operação padrão

**Regra:** Usar quando explicitamente pedido ou para documentação versionada.

### 3. Context7 — Library Documentation
**Status:** Essencial
**Custo:** ~200-300 tokens por lookup
**Quando usar:**
- ✅ Referência rápida de API (React, Node, etc)
- ✅ Quando uncertain sobre sintaxe
- ❌ NÃO como primeira fonte (usar memory)

**Regra:** Usar apenas quando memória/contexto insuficientes.

### 4. ClaudeTalkToFigma — Figma Bidirectional Sync
**Status:** Essencial (para sync de organograma)
**Custo:** ~200-500 tokens por operacao
**Quando usar:**
- ✅ `/sync-organogram map` — Mapeamento inicial de nodes do Figma
- ✅ `/sync-organogram sync` — Sincronizar dados do projeto para o Figma
- ✅ `/sync-organogram status` — Verificar estado do mapeamento
- ❌ NÃO para operacoes genericas no Figma
- ❌ NÃO sem o plugin companion ativo no Figma Desktop

**Pre-requisitos:**
1. Figma Desktop aberto com o arquivo do organograma
2. Plugin companion importado e ativo (WebSocket porta 3055)
3. MCP habilitado: `claude mcp list` deve mostrar ClaudeTalkToFigma

**Regra:** Usar APENAS via comando `/sync-organogram`. Nao ativar diretamente em outros contextos.

**Arquivos relacionados:**
- `figma-organogram-map.yaml` — Mapeamento Figma nodes → dados do projeto
- `scripts/sync-organogram.js` — Data source (le project-state.yaml → JSON)

---

## MCPs NÃO Habilitados (Por Enquanto)

| MCP | Por quê | Quando adicionar |
|-----|---------|-----------------|
| **Docker** | Overhead alto, uso raro | Quando projeto precisar containers |
| **Slack** | Comunicação manual por enquanto | Quando integração for requisito |
| **Apify** | Overkill para estágio atual | Quando web scraping complexo for necessário |

---

## Checklist de Consciência

Antes de usar qualquer MCP, o **Chief** (agente orquestrador) deve:

- [ ] **Objetivo claro?** Sabe exatamente o que precisa do MCP?
- [ ] **Alternativa?** Há informação em memory / CLAUDE.md?
- [ ] **Custo-benefício?** Vale os tokens para esse resultado?
- [ ] **Escalado?** É informação que outros agentes precisarão reutilizar?

Se algum for **NÃO**, reconsidere usar o MCP.

---

## Exemplo: Quando NÃO Usar

```
❌ ERRADO: "Deixa eu pesquisar sobre IA"
✅ CORRETO: "Pesquisar participação de mercado de AI para PMEs em 2026"

❌ ERRADO: "Me traz a documentação do React"
✅ CORRETO: "Quanto é o limite de props em um componente React?"

❌ ERRADO: "Puxa o código do repo pra analisar"
✅ CORRETO: "Clone este README para referência"
```

---

## Responsabilidade dos Chiefs

Chiefs (orquestradores como @marty-cagan, squad leaders) **decidem** quando usar MCPs:

- Não é automático
- Não é "só porque pode"
- É **consciente** e **necessário**

---

## Setup Técnico

```bash
# Cada MCP pode ser instalado conforme necessário:

# EXA
npx @exa-labs/exa-mcp@latest

# GitHub (requer token)
npx @modelcontextprotocol/server-github@latest

# Context7
npx @context7/mcp@latest
```

Configurar em `~/.claude.json` no bloco `mcpServers`.

---

## Métricas de Sucesso

- **Sem desperdício:** <5% de MCP calls desnecessárias
- **Bem direcionado:** Cada call resolve uma questão específica
- **Escalável:** MCPs usados geram insights que múltiplos agentes reutilizam

---

## Próximo Passo

Quando um Chief realmente precisar de EXA/GitHub/Context7, ele sabe exatamente para quê.
Até lá, operamos com o que temos em memory/docs.

---

*Atualizado: 2026-02-25*
