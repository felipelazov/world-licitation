# vision-alignment

> Task do Marty Cagan (Chief) — Alinhamento de Visao de Produto

**Task ID:** vision-alignment
**Owner:** marty-cagan
**Squad:** squad-product
**Pattern:** PD-VS-002

---

## Task Anatomy

| Campo | Valor |
|-------|-------|
| **Input** | Contexto de negocio + feedback squads + mudancas de mercado |
| **Output** | Product vision atualizada + alinhamento com estrategia de negocio |
| **Pre-conditions** | Contexto de negocio definido (squad-advisor) ou mudanca significativa detectada |
| **Trigger** | Trimestral ou quando decisao estrategica do squad-advisor impacta produto |

---

## Overview

O Vision Alignment garante que a visao de produto esta sincronizada com a estrategia de negocio. Quando o squad-advisor define posicionamento, pricing, ou estrategia, o Cagan traduz isso em product vision e comunica para o time. "Product vision is the North Star for the product organization."

---

## Action Items

### Step 1: Ler Contexto Estrategico
- Ler project-state.yaml para decisoes recentes do squad-advisor
- Consumir sinapses pendentes de outros squads
- Identificar mudancas de mercado ou competidores

### Step 2: Revisar Product Vision Atual
- A vision atual ainda reflete o negocio?
- Os problemas que resolvemos ainda sao os mais importantes?
- O publico-alvo mudou?
- Novas oportunidades surgiram?

### Step 3: Atualizar Product Vision
- Reescrever/ajustar product vision se necessario
- Definir/atualizar product principles (3-5 principios que guiam decisoes)
- Validar com o time (melissa-perri, april-dunford, nir-eyal)

### Step 4: Comunicar e Alinhar
- Documentar nova vision com contexto
- Criar sinapses para squads impactados
- Garantir que roadmap (Perri) e positioning (Dunford) vao se ajustar

---

## Acceptance Criteria

1. Product vision documentada e clara (1-2 paragrafos, testavel)
2. Product principles definidos (3-5 principios)
3. Alinhamento confirmado com estrategia de negocio
4. Time interno do squad alinhado
5. Sinapses criadas para squads que precisam saber

---

## Veto Conditions

- NAO criar vision sem input de negocio — vision desconectada do negocio e fantasia
- NAO mudar vision sem comunicar para o time — mudanca silenciosa e caos
- NAO definir vision como lista de features — vision e sobre o futuro do cliente, nao do produto

---

## Output Example

```yaml
product_vision:
  data: "2026-02-25"
  vision: >-
    Criar a plataforma que permite a qualquer PME implementar IA de forma
    pratica em 30 dias, sem precisar de equipe tecnica, transformando
    processos manuais em fluxos inteligentes que aprendem com o negocio.
  principles:
    - "Simplicidade sobre completude — PMEs nao querem 100 features, querem 3 que funcionam"
    - "Valor em 7 dias — se o cliente nao viu resultado em 1 semana, falhamos"
    - "IA invisivel — o cliente usa IA sem saber que esta usando IA"
    - "Dados do cliente sao sagrados — privacidade como feature, nao como compliance"
  contexto_mudanca: "Squad-advisor redefiniu publico para PMEs 5-50 funcionarios"
  impacto_squads:
    - squad: "squad-marketing"
      impacto: "Messaging deve refletir simplicidade e velocidade"
    - squad: "squad-content-distillery"
      impacto: "Conteudo deve focar em casos de uso PME, nao enterprise"
```

---

## Handoff

- Vision atualizada → melissa-perri (ajustar roadmap)
- Vision atualizada → april-dunford (ajustar positioning)
- Vision atualizada → nir-eyal (ajustar hooks para novo contexto)
- Sinapses → squads externos via project-state.yaml
