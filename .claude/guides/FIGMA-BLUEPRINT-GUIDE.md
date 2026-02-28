# 🎨 Figma Blueprint — Guia de Estrutura

> Como estruturar seu Figma para sincronização automática com o World OS

---

## PASSO 1: Criar o arquivo Figma

1. Abra [figma.com](https://figma.com)
2. Crie um novo arquivo: **"World OS — Blueprint"**
3. Crie **uma página para cada nível:**
   - `01-Overview` (visão geral)
   - `02-Squads` (estrutura dos squads)
   - `03-Agents` (agentes individuais)
   - `04-Tasks` (tasks e workflows)
   - `05-Tools` (ferramentas/MCPs)

---

## PASSO 2: Página "01-Overview" — Visão Geral

Crie um **organograma visual** mostrando:

```
┌─────────────────────────────────────────────┐
│          WORLD OS MATRIX                    │
│          (Felipe Ventures)                  │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │ Squad    │  │ Squad    │  │ Squad    │ │
│  │ Product  │  │ Sales    │  │ Customer │ │
│  └──────────┘  └──────────┘  └──────────┘ │
│                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │ Squad    │  │ Squad    │  │ Squad    │ │
│  │ Design   │  │ Content  │  │ Agency   │ │
│  └──────────┘  └──────────┘  └──────────┘ │
│                                             │
│  ┌──────────┐  ┌──────────┐                │
│  │ Squad    │  │ Squad    │                │
│  │ Franchise│  │ Zona Gen │                │
│  └──────────┘  └──────────┘                │
│                                             │
│        ┌────────────────────┐              │
│        │  Conselho Executor │              │
│        │  (3 Advisors)      │              │
│        └────────────────────┘              │
│                                             │
└─────────────────────────────────────────────┘
```

**Como fazer:**
- Use Frames do Figma (rectangles com labels)
- Cada squad = 1 frame
- Colore diferente (ex: produto=azul, sales=verde, etc)
- Use conectores/linhas para mostrar sinapses

---

## PASSO 3: Página "02-Squads" — Detalhe de Cada Squad

Para **CADA squad**, crie uma seção assim:

```
┌──────────────────────────────────────────┐
│ SQUAD-PRODUCT                            │
├──────────────────────────────────────────┤
│                                          │
│ Chief: marty-cagan                       │
│                                          │
│ Agentes:                                 │
│  ├─ marty-cagan (AI Head de Produto)    │
│  ├─ melissa-perri (Product Manager)     │
│  ├─ april-dunford (Positioning)         │
│  └─ nir-eyal (Retention Architect)      │
│                                          │
│ Tasks: 14 (product-review, vision...)   │
│ Templates: 4 (vision-doc, canvas...)    │
│                                          │
│ Conecta Com:                             │
│  ├─ squad-design (posicionamento)       │
│  ├─ squad-sales (oferta)                │
│  └─ squad-content (narrativa)           │
│                                          │
└──────────────────────────────────────────┘
```

**Estrutura no Figma:**
- Crie um **componente reutilizável** chamado "Squad Card"
- Campos:
  - `squad_id` (texto)
  - `squad_name` (texto)
  - `chief_agent` (texto)
  - `agents_list` (texto/lista)
  - `num_tasks` (número)
  - `num_templates` (número)
  - `connects_to` (texto/lista)
  - `color_code` (para sincronização)

**Exemplo de dados para squad-product:**

| Campo | Valor |
|-------|-------|
| squad_id | `squad-product` |
| squad_name | `Squad Produto` |
| chief_agent | `marty-cagan` |
| agents_list | `marty-cagan, melissa-perri, april-dunford, nir-eyal` |
| num_tasks | `14` |
| num_templates | `4` |
| connects_to | `squad-design, squad-sales, squad-content-distillery` |
| color_code | `#0066FF` |

---

## PASSO 4: Página "03-Agents" — Agentes Individuais

Para **CADA agente**, crie um card:

```
┌─────────────────────────────────────┐
│ MARTY CAGAN                         │
├─────────────────────────────────────┤
│                                     │
│ Squad: squad-product                │
│ Função: AI Head de Produto          │
│                                     │
│ Expertise:                          │
│  ├─ Empowered Teams                │
│  ├─ Product Vision                 │
│  ├─ Discovery                      │
│  └─ Operating Model                │
│                                     │
│ Input: Briefing, contexto          │
│ Output: Visão de produto, strategy │
│                                     │
│ Conecta Com:                        │
│  ├─ melissa-perri (colaboração)    │
│  └─ april-dunford (positioning)    │
│                                     │
└─────────────────────────────────────┘
```

**Componente "Agent Card":**
- `agent_id`
- `agent_name`
- `squad_id`
- `function` (descrição da função)
- `expertise` (lista de skills)
- `input` (tipo de dados que recebe)
- `output` (tipo de dados que gera)
- `connects_to` (outros agentes)

---

## PASSO 5: Página "04-Tasks" — Workflows

Crie cards para **tasks principais de cada squad**:

```
┌──────────────────────────────────────┐
│ TASK: Product Vision Alignment       │
├──────────────────────────────────────┤
│                                      │
│ Squad: squad-product                 │
│ Lead Agent: marty-cagan              │
│                                      │
│ Tipo: Strategy                       │
│ Frequência: Por projeto              │
│                                      │
│ Input:                               │
│  └─ Market brief, company context    │
│                                      │
│ Process:                             │
│  1. Analisa posicionamento           │
│  2. Define visão de 5 anos           │
│  3. Alinha com Golden Circle         │
│                                      │
│ Output:                              │
│  └─ Product vision document          │
│                                      │
│ Sinapse Para:                        │
│  ├─ squad-design (identidade visual) │
│  └─ squad-content (narrativa)        │
│                                      │
└──────────────────────────────────────┘
```

---

## PASSO 6: Página "05-Tools" — Ferramentas & MCPs

```
┌──────────────────────────────────────┐
│ TOOL: Context7 (MCP)                 │
├──────────────────────────────────────┤
│                                      │
│ Tipo: MCP (Model Context Protocol)   │
│ Usado Por: squad-content-distillery  │
│                                      │
│ Função:                              │
│  └─ Buscar docs de bibliotecas       │
│                                      │
│ Input:                               │
│  └─ Nome da lib, tópico              │
│                                      │
│ Output:                              │
│  └─ Documentação formatada           │
│                                      │
│ Status: ✅ Ativo                     │
│                                      │
└──────────────────────────────────────┘
```

---

## PASSO 7: Adicionar Componentes Reutilizáveis

No Figma, crie **componentes** (Assets → Components):

1. **SquadCard** — Template para cada squad
2. **AgentCard** — Template para cada agente
3. **TaskCard** — Template para cada task
4. **ToolCard** — Template para cada ferramenta
5. **ConnectionLine** — Linhas de conexão entre elements

**Isso permite:**
- Reutilizar templates
- Manter consistência
- Fazer mudanças que afetam tudo

---

## PASSO 8: Variáveis no Figma (para sincronização)

No Figma, use **variables** (Variables panel) para dados que mudam:

```
squad-product/
├─ squad_id = "squad-product"
├─ squad_name = "Squad Produto"
├─ chief_agent = "marty-cagan"
├─ num_agents = 4
├─ num_tasks = 14
└─ status = "active"
```

Isso permite sincronização automática!

---

## Próximo Passo

Depois de estruturar no Figma, vou criar um **script** que:
1. Lê os dados do Figma via API
2. Valida a estrutura
3. **Atualiza automaticamente o projeto** quando você muda algo no Figma

---

## Dicas Importantes

✅ Use **cores consistentes** para cada squad
✅ Mantenha **fontes legíveis**
✅ Use **componentes reutilizáveis**
✅ Organize em **páginas temáticas**
✅ Documente **variáveis e campos**

---

**Comece pela Página 01 (Overview), depois va para os detalhes!**

Avisa quando terminar a estrutura que criamos o script de sincronização! 🚀
