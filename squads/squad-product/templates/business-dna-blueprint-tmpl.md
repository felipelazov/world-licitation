# Business DNA Blueprint — {projeto.nome}

**Cliente:** {projeto.cliente}
**Data:** {data}
**Tipo:** {projeto.tipo}
**Gerado por:** Marty Cagan (squad-product)

---

## 1. Narrativa Estrategica

> Esta secao traduz o Golden Circle (WHY/HOW/WHAT) em storytelling coeso.
> NAO use bullets — escreva em formato narrativo que qualquer pessoa consiga ler e entender.

### Por que existimos (WHY)

{Narrativa do proposito. 2-3 paragrafos que conectam a causa do fundador ao problema do mercado. Deve emocionar e convencer.}

### Como entregamos valor (HOW)

{Narrativa dos diferenciais de entrega. O que torna unica a forma como este negocio opera. 1-2 paragrafos.}

### O que oferecemos (WHAT)

{Narrativa do que concretamente e oferecido. Claro, direto, sem jargao. 1 paragrafo.}

**Decisoes de referencia:** {listar IDs das decisoes do state que sustentam esta secao}

---

## 2. Oferta Irrecusavel

> Grand Slam Offer formatada para uso por qualquer squad.

| Componente | Descricao |
|-----------|-----------|
| **Dream Outcome** | {O resultado dos sonhos que o cliente quer} |
| **Likelihood of Achievement** | {Por que o cliente acredita que vai conseguir} |
| **Time Delay** | {Quanto tempo ate o resultado} |
| **Effort & Sacrifice** | {O que o cliente precisa fazer/abrir mao} |
| **Preco** | {Preco definido} |
| **Garantia** | {Tipo de garantia oferecida} |

### Diferenciais

1. {Diferencial 1}
2. {Diferencial 2}
3. {Diferencial 3}

**Decisoes de referencia:** {listar IDs das decisoes do state}

---

## 3. Produto Essencial

### Features que ficaram (IN)

| Feature | Rationale |
|---------|-----------|
| {Feature 1} | {Por que ficou} |
| {Feature 2} | {Por que ficou} |
| {Feature 3} | {Por que ficou} |

### Features cortadas (OUT)

| Feature | Rationale do corte |
|---------|-------------------|
| {Feature cortada 1} | {Por que foi cortada} |
| {Feature cortada 2} | {Por que foi cortada} |

### Simplicity Statement

> {Descricao do produto em 1 frase}

**Decisoes de referencia:** {listar IDs das decisoes do state}

---

## 4. Anti-Briefing

> O que este negocio NAO e. Cada item ajuda squads a evitar decisoes erradas.

1. **NAO somos** {item 1} — {justificativa}
2. **NAO somos** {item 2} — {justificativa}
3. **NAO somos** {item 3} — {justificativa}
4. **NAO somos** {item 4} — {justificativa}
5. **NAO somos** {item 5} — {justificativa}

---

## 5. Mapa de Decisoes

> Todas as decisoes dos 3 advisors consolidadas com impacto mapeado.

| # | Advisor | Decisao | Impacto | Squads Afetados |
|---|---------|---------|---------|-----------------|
| 1 | Sinek | {decisao} | {impacto no negocio} | {squad-ids} |
| 2 | Hormozi | {decisao} | {impacto no negocio} | {squad-ids} |
| 3 | Jobs | {decisao} | {impacto no negocio} | {squad-ids} |

---

## 6. Briefs por Squad

> Um brief acionavel para cada squad ativo. Briefs detalhados salvos em `deliverables/business-dna/squad-briefs/`.

| Squad | Direcao Principal | Brief |
|-------|-------------------|-------|
| {squad-id} | {1 frase de direcao} | `squad-briefs/{squad-id}-brief.md` |

---

## 7. Scorecard

> KPIs com baseline e target 90 dias. Cada metrica tem um squad responsavel.

| KPI | Baseline | Target 90d | Squad Responsavel |
|-----|----------|------------|-------------------|
| {metrica 1} | {valor atual} | {meta} | {squad-id} |
| {metrica 2} | {valor atual} | {meta} | {squad-id} |
| {metrica 3} | {valor atual} | {meta} | {squad-id} |

---

## 8. Validacao

> Auto-avaliacao do blueprint. Cada secao OK = 1 ponto.

| Secao | OK? | Observacao |
|-------|-----|-----------|
| 1. Narrativa Estrategica | [ ] | |
| 2. Oferta Irrecusavel | [ ] | |
| 3. Produto Essencial | [ ] | |
| 4. Anti-Briefing | [ ] | |
| 5. Mapa de Decisoes | [ ] | |
| 6. Briefs por Squad | [ ] | |
| 7. Scorecard | [ ] | |
| 8. PRD Bridge (se aplicavel) | [ ] | |

**Score:** ___/8
**Checklist formal:** Executar `*dna-validate` para validacao completa.
