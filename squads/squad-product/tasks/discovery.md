# discovery

> Task da Melissa Perri (PM) — Sessao de Product Discovery

**Task ID:** discovery
**Owner:** melissa-perri
**Squad:** squad-product
**Pattern:** PD-DI-001

---

## Task Anatomy

| Campo | Valor |
|-------|-------|
| **Input** | Problema ou oportunidade identificada |
| **Output** | Evidencias coletadas + hipoteses validadas/invalidadas |
| **Pre-conditions** | Problema claro ou oportunidade mapeada |
| **Trigger** | Nova oportunidade identificada, feedback recorrente, ou decisao do product-review |

---

## Overview

Discovery e o processo de separar boas ideias de mas ideias ANTES de construir. "The purpose of product discovery is to quickly separate the good ideas from the bad" (Cagan). Melissa Perri conduz discovery usando o Product Kata: entender direcao → estado atual → proximo target → experimentar → decidir.

---

## Action Items

### Step 1: Definir o Problema
- Articular o problema em 1-2 frases claras
- Identificar quem tem esse problema (persona/segmento)
- Quantificar o impacto (quantos usuarios, quanto revenue afetado)
- Validar que e um problema real (dados, nao opiniao)

### Step 2: Formular Hipoteses
- Hipotese de valor: "Acreditamos que [solucao] vai resolver [problema] para [persona]"
- Hipotese de usabilidade: "Usuarios vao conseguir usar [solucao] sem [barreira]"
- Hipotese de viabilidade: "E tecnicamente possivel construir [solucao] em [prazo]"
- Hipotese de negocio: "[Solucao] vai gerar [metrica] de impacto"

### Step 3: Projetar Experimentos
- Escolher metodo de validacao (entrevista, prototipo, A/B test, concierge, Wizard of Oz)
- Definir criterio de sucesso ANTES do experimento
- Estimar tempo e recursos necessarios
- Priorizar: experimento mais rapido que invalida a hipotese mais arriscada primeiro

### Step 4: Executar e Documentar
- Conduzir experimentos
- Documentar evidencias (quotes, dados, observacoes)
- Classificar: hipotese validada / invalidada / inconclusiva
- Decidir: pivotar / perseverar / abandonar

### Step 5: Comunicar Resultado
- Compartilhar findings com o squad
- Atualizar opportunity map se necessario
- Criar sinapse se discovery impacta outros squads

---

## Acceptance Criteria

1. Problema articulado com dados (nao opiniao)
2. Pelo menos 1 hipotese formulada e testada
3. Experimento tem criterio de sucesso definido a priori
4. Evidencias documentadas (nao "achamos que funcionou")
5. Decisao clara: pivotar, perseverar ou abandonar

---

## Veto Conditions

- NAO pular discovery para ir direto para construcao — isso e build trap
- NAO validar hipotese perguntando "voce usaria isso?" — perguntar sobre comportamento passado, nao futuro
- NAO considerar uma unica entrevista como validacao — minimo 5 data points

---

## Output Example

```yaml
discovery_session:
  problema: "60% dos novos usuarios abandonam antes de completar setup"
  hipoteses:
    - tipo: "valor"
      statement: "Setup guiado com IA reduz abandono em 40%"
      metodo: "Prototipo concierge com 10 usuarios"
      criterio_sucesso: "7 de 10 completam setup"
      resultado: "VALIDADA — 8 de 10 completaram"
      evidencias:
        - "3 usuarios mencionaram que o guia 'fez parecer facil'"
        - "Tempo medio de setup caiu de 45min para 12min"
    - tipo: "viabilidade"
      statement: "IA pode guiar setup em tempo real"
      metodo: "Spike tecnico de 2 dias"
      criterio_sucesso: "Prototipo funcional em 2 dias"
      resultado: "VALIDADA — prototipo funcional criado"
  decisao: "PERSEVERAR — mover para roadmap como prioridade alta"
  impacto_estimado: "Reducao de 60% para ~25% de abandono no setup"
```

---

## Handoff

- Discovery validado → opportunity-mapping (mapear no Opportunity Solution Tree)
- Discovery com impacto em positioning → april-dunford
- Discovery com impacto em retention → nir-eyal
