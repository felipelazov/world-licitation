# Task: Auditoria de Ferramentas e SaaS

**Task ID:** squad-adm/tools-audit
**Version:** 1.0.0
**Execution Type:** Interativo (70% Human / 30% Agent)
**Duration:** 35 minutos
**Agent:** marie-kondo-facilities

---

## Proposito

Auditoria completa de ferramentas e assinaturas SaaS usando o metodo KonMari Corporativo. Identifica redundancias, acessos descontrolados e oportunidades de economia. Cada ferramenta deve ter proposito claro — se nao agrega valor, eliminar. Ordem gera eficiencia.

---

## Inputs

```yaml
obrigatorios:
  lista_ferramentas:
    field: "Lista de ferramentas atuais (ou permissao para levantar)"
    format: "string"
    required: true
  orcamento_mensal_tools:
    field: "Orcamento mensal com ferramentas/SaaS (R$)"
    format: "number"
    required: true
opcionais:
  num_colaboradores:
    field: "Numero de colaboradores que usam ferramentas"
    format: "number"
    required: false
  ultima_auditoria:
    field: "Data da ultima auditoria (se houve)"
    format: "string"
    required: false
  problemas_conhecidos:
    field: "Problemas ja conhecidos (lenta, ninguem usa, etc.)"
    format: "string"
    required: false
```

---

## Steps

### Step 1: Inventariar Todas as Ferramentas (8 min)
Levantar CADA ferramenta: nome, categoria (Comunicacao/Produtividade/Dev/Financeiro/Marketing/Seguranca), custo mensal, seats contratados vs em uso, owner responsavel, data renovacao. Se usuario nao tem lista, conduzir levantamento por categoria.

### Step 2: Classificar por Essencial/Util/Redundante (7 min)
Filtro KonMari: **Essencial** (uso diario, operacao para sem ela), **Util** (uso regular, tem alternativa), **Redundante** (outra ferramenta faz o mesmo), **Orfao** (ninguem usou nos ultimos 30 dias). Perguntas: "Agrega valor?", "Existe duplicidade?", "Custo justifica?"

### Step 3: Calcular Custo Total e Desperdicio (5 min)
Consolidar: custo total mensal, custo por colaborador, percentual do faturamento, custo de licencas nao utilizadas, custo de ferramentas redundantes. Desperdicio total = ociosas + orfas + redundancias.

### Step 4: Identificar Sobreposicoes (5 min)
Mapear funcionalidades cruzadas: quais fazem a MESMA coisa? Qual o time prefere? Qual tem melhor custo-beneficio? Uma pode substituir duas? Custo de migracao vs economia anual?

### Step 5: Mapear Acessos por Pessoa (5 min)
Para cada colaborador: quais ferramentas, qual nivel de permissao (viewer/editor/admin), acessos nao usados, permissoes excessivas, ex-colaboradores com acesso ativo. Aplicar Principio do Menor Privilegio.

### Step 6: Recomendar Cortes e Substituicoes (5 min)
Acoes: **Eliminar** (orfao), **Consolidar** (redundante), **Downgrade** (plano caro sem uso das features), **Substituir** (alternativa mais barata), **Revogar** (acessos ociosos). Calcular economia total mensal e anual.

---

## Output

Inventario de Ferramentas contendo: lista completa com custos e classificacao, dashboard de custos com desperdicio identificado, mapa de sobreposicoes, matriz de acessos com anomalias, e recomendacoes de otimizacao com economia projetada (mensal e anual).

Arquivo: `deliverables/adm/tools-audit-{YYYY-MM}.yaml`

---

## Quality Gate

- [ ] Todas as ferramentas inventariadas com custo e owner
- [ ] Cada ferramenta classificada (essencial/util/redundante/orfao)
- [ ] Custo total e desperdicio calculados
- [ ] Sobreposicoes mapeadas com recomendacao de consolidacao
- [ ] Acessos auditados com anomalias identificadas
- [ ] Minimo 3 recomendacoes de otimizacao com economia projetada
- [ ] Economia total projetada (mensal e anual)
- [ ] Proxima auditoria agendada (trimestral)
