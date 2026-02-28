# positioning

> Task da April Dunford (Positioning) — Definir Posicionamento de Produto

**Task ID:** positioning
**Owner:** april-dunford
**Squad:** squad-product
**Pattern:** PD-PO-001

---

## Task Anatomy

| Campo | Valor |
|-------|-------|
| **Input** | Produto / oferta definida |
| **Output** | Positioning canvas completo (5 componentes) |
| **Pre-conditions** | Produto existe ou esta em desenvolvimento com features claras |
| **Trigger** | Lancamento de produto, repositionamento, ou feedback de "mercado nao entende" |

---

## Overview

"Positioning is the act of deliberately defining how you are the best at something that a defined market cares a lot about." A maioria dos produtos NAO e posicionada — e apenas lancada. Dunford aplica seu processo de 10 passos para definir os 5 componentes de positioning que fazem o valor do produto ser OBVIO para quem mais importa.

---

## Action Items

### Step 1: Identificar Best-Fit Customers
- Quem sao os clientes que AMAM o produto? (nao os que "usam", os que AMAM)
- O que esses clientes tem em comum?
- Por que eles escolheram voce vs alternativas?
- Documentar: perfil, dor, contexto de compra

### Step 2: Listar Competitive Alternatives
- Se o produto nao existisse, o que esses clientes fariam?
- NAO apenas concorrentes diretos — inclui: planilha, estagiario, nao fazer nada, processo manual
- Listar TODAS as alternativas reais

### Step 3: Mapear Unique Attributes
- Que features/capabilities o produto tem que as alternativas NAO tem?
- Ser honesto — se a alternativa tambem tem, nao e unique
- Listar apenas diferenciais REAIS e verificaveis

### Step 4: Traduzir Attributes em Value
- Para cada unique attribute: "E dai?" — qual valor isso gera para o cliente?
- Value = benefit que o cliente experimenta, nao feature tecnica
- Agrupar em 1-3 value themes

### Step 5: Escolher Market Category
- Que contexto torna o valor OBVIO?
- Opcoes: categoria existente (lider), subcategoria, nova categoria
- "Category is context. It tells customers what to expect and how to evaluate you."
- Testar: quando digo "somos [categoria]", o cliente entende imediatamente o valor?

### Step 6: Montar Positioning Canvas
- Compilar os 5 componentes em um canvas unico
- Validar: o canvas e claro para alguem de fora?
- Se confuso → voltar ao Step que falhou

---

## Acceptance Criteria

1. 5 componentes definidos com clareza (alternatives, attributes, value, customers, category)
2. Best-fit customers baseados em dados reais (nao idealizacao)
3. Competitive alternatives incluem opcoes nao-obvias (planilha, manual, nada)
4. Value themes conectam attributes a beneficios do cliente
5. Market category testada ("quando digo X, o cliente entende?")

---

## Veto Conditions

- NAO posicionar para "todo mundo" — positioning para todos e positioning para ninguem
- NAO copiar positioning de competidor — voce nao e eles
- NAO confundir features com value — "temos IA" nao e value, "economiza 10h/semana" e value
- NAO escolher categoria aspiracional — posicione para onde voce ESTA, nao onde quer ESTAR

---

## Output Example

```yaml
positioning_canvas:
  data: "2026-02-25"
  produto: "Plataforma IA para PMEs"

  competitive_alternatives:
    - "Contratar consultor de tecnologia (caro, lento)"
    - "Usar ChatGPT direto (generico, sem integracao)"
    - "Planilha Excel com macros (fragil, manual)"
    - "Nao fazer nada (status quo)"

  unique_attributes:
    - "Setup guiado em 30 minutos (vs semanas com consultor)"
    - "Templates pre-prontos por industria (vs generico)"
    - "Integracao com ferramentas que PME ja usa (WhatsApp, Google Sheets)"
    - "IA que aprende com os dados do negocio (vs one-size-fits-all)"

  value_themes:
    - tema: "Velocidade"
      descricao: "De zero a IA funcionando em 1 dia, nao 1 mes"
    - tema: "Simplicidade"
      descricao: "Nao precisa saber programar ou ter equipe tech"
    - tema: "Resultado Pratico"
      descricao: "Economia de 10-15h/semana em tarefas repetitivas"

  best_fit_customers:
    perfil: "PMEs com 5-50 funcionarios"
    dor: "Perdem tempo com processos manuais mas nao tem budget para tech team"
    contexto_compra: "Dono do negocio que ouviu falar de IA e quer implementar mas nao sabe como"

  market_category: "Plataforma de Automacao Inteligente para Pequenas Empresas"

  teste_category: "Quando digo 'automacao inteligente para pequenas empresas', o dono de PME entende que resolve o problema dele"
```

---

## Handoff

- Positioning definido → sales-pitch (proxima task Dunford)
- Positioning definido → squad-marketing (sinapse: messaging pronto)
- Positioning definido → squad-content-distillery (sinapse: narrativa core)
- Positioning definido → squad-sales (sinapse: contexto para pitch)
