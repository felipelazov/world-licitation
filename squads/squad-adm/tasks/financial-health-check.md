# Task: Checkup de Saude Financeira

**Task ID:** squad-adm/financial-health-check
**Version:** 1.0.0
**Execution Type:** Interativo (70% Human / 30% Agent)
**Duration:** 45 minutos
**Agent:** dave-ramsey-financeiro

---

## Proposito

Avaliar a saude financeira da empresa com analise de fluxo de caixa, burn rate, runway e DRE simplificado. Gera fotografia financeira honesta com plano de acao para os proximos 3 meses. Sem rodeios — numeros nao mentem.

---

## Inputs

```yaml
obrigatorios:
  faturamento_mensal:
    field: "Faturamento mensal bruto (R$)"
    format: "number"
    required: true
  custos_fixos:
    field: "Custos fixos mensais (salarios, aluguel, SaaS)"
    format: "string"
    required: true
  custos_variaveis:
    field: "Custos variaveis mensais (marketing, freelancers)"
    format: "string"
    required: true
  dividas:
    field: "Dividas ativas (valor, credor, parcelas restantes)"
    format: "string"
    required: true
opcionais:
  saldo_atual:
    field: "Saldo em caixa atual (R$)"
    format: "number"
    required: false
```

---

## Steps

### Step 1: Mapear Entradas e Saidas (10 min)
Categorizar cada receita por fonte e cada despesa como fixa/variavel. Identificar custos ocultos (ferramentas esquecidas, taxas, impostos). Validar gaps com o usuario.

### Step 2: Calcular Burn Rate e Runway (5 min)
- **Burn Rate Bruto** = Total despesas mensais
- **Burn Rate Liquido** = Despesas - Receitas
- **Runway** = Saldo caixa / Burn Rate Liquido
- Classificar: Verde (>6 meses), Amarelo (3-6), Vermelho (<3)

### Step 3: Analisar DRE Simplificado (10 min)
Montar: Receita Bruta → (-) Impostos → Receita Liquida → (-) Custos Fixos → (-) Custos Variaveis → Lucro Operacional. Calcular margem operacional (%).

### Step 4: Identificar Cortes Possiveis (8 min)
Filtro Dave Ramsey para cada despesa: "E necessario?", "Gera retorno mensuravel?", "Existe alternativa mais barata?". Priorizar por maior economia.

### Step 5: Definir Budget por Area (7 min)
Zero-Based Budgeting: alocar cada real. Seguir Cash Flow Waterfall (folha > impostos > fornecedores criticos). Reservar 10-15% para emergencias.

### Step 6: Criar Projecao 3 Meses (5 min)
Tres cenarios: Otimista (+10% receita), Realista (estavel), Pessimista (-20% receita). Para cada: saldo projetado, runway e acoes necessarias.

---

## Output

Relatorio de Saude Financeira contendo: DRE simplificado com margem operacional, burn rate e runway com classificacao de risco, lista de cortes recomendados com economia projetada, budget por area (ZBB), projecao 3 meses em 3 cenarios, e plano de acao com responsaveis e prazos.

Arquivo: `deliverables/adm/financial-health-check-{YYYY-MM}.yaml`

---

## Quality Gate

- [ ] Receitas e despesas categorizadas sem lacunas
- [ ] Burn rate e runway calculados com classificacao de risco
- [ ] DRE simplificado com margem operacional
- [ ] Minimo 3 oportunidades de corte identificadas
- [ ] Budget por area com zero-based budgeting
- [ ] Projecao em 3 cenarios (otimista, realista, pessimista)
- [ ] Plano de acao com responsaveis e prazos
- [ ] Numeros conferidos e consistentes entre si
