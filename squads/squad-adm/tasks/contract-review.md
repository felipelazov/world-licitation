# Task: Revisao e Elaboracao de Contratos

**Task ID:** squad-adm/contract-review
**Version:** 1.0.0
**Execution Type:** Interativo (70% Human / 30% Agent)
**Duration:** 50 minutos
**Agent:** ken-adams-juridico

---

## Proposito

Redigir ou revisar contratos seguindo o MSCD (A Manual of Style for Contract Drafting). Garante clareza, elimina ambiguidade, verifica compliance LGPD, mapeia riscos e define SLAs. O resultado e um contrato que PESSOAS conseguem ler — sem legalese desnecessario.

---

## Inputs

```yaml
obrigatorios:
  tipo_contrato:
    field: "Tipo (cliente/fornecedor/parceiro/funcionario/NDA)"
    format: "string"
    required: true
  partes_envolvidas:
    field: "Partes (nomes, CNPJs/CPFs, funcao no contrato)"
    format: "string"
    required: true
  termos_principais:
    field: "Termos essenciais (objeto, valor, prazo, condicoes)"
    format: "string"
    required: true
opcionais:
  contrato_existente:
    field: "Contrato recebido para revisao (colar texto)"
    format: "string"
    required: false
  urgencia:
    field: "Nivel de urgencia (baixa/media/alta)"
    format: "string"
    required: false
```

---

## Steps

### Step 1: Identificar Tipo Contratual (5 min)
Classificar: Prestacao de Servicos, Fornecimento/SaaS, CLT, PJ/Freelancer, NDA, SLA ou Parceria. Definir se e ELABORACAO (do zero) ou REVISAO (contrato recebido).

### Step 2: Revisar/Redigir Clausulas MSCD (15 min)
Clausulas obrigatorias: Partes, Objeto, Vigencia, Valor/Pagamento, Obrigacoes, Rescisao, Confidencialidade, Foro. Regras MSCD: voz ativa, enumeracoes tabuladas, termos definidos, zero legalese, cada clausula com UMA interpretacao possivel.

### Step 3: Verificar Compliance LGPD (8 min)
Se envolve dados pessoais: base legal (Art. 7), clausula de protecao, controlador/operador definidos, obrigacoes de seguranca, procedimento para incidentes, direitos do titular, prazo de retencao. Se nao envolve, registrar N/A.

### Step 4: Mapear Riscos (10 min)
Risk Assessment em 6 dimensoes (score 1-5 cada): valor financeiro, duracao, exclusividade, penalidades, propriedade intelectual, dados pessoais. Classificar: Baixo (6-12), Medio (13-20), Alto (21-30). Verificar red flags: foro distante, multa desproporcional, renovacao automatica sem opt-out, transferencia irrevogavel de PI.

### Step 5: Definir SLAs e Penalidades (7 min)
Para contratos de servico: SLAs de entrega (prazos, qualidade), metricas de medicao, penalidades proporcionais ao impacto, processo de escalonamento antes de judicializar.

### Step 6: Compilar Contrato Final (5 min)
Montar: secao de definicoes, clausulas revisadas, anexos (SLA, LGPD), checklist de riscos, recomendacao de aprovacao (CLO / ADM Chief / CEO + advogado conforme risco).

---

## Output

Contrato revisado/redigido contendo: clausulas MSCD completas, checklist LGPD (se aplicavel), matriz de risco com classificacao e red flags, tabela de SLAs com penalidades, e recomendacao de aprovacao com justificativa.

Arquivo: `deliverables/adm/contract-review-{slug}-{YYYY-MM-DD}.yaml`

---

## Quality Gate

- [ ] Tipo contratual classificado corretamente
- [ ] Todas as clausulas obrigatorias presentes e claras
- [ ] Principios MSCD aplicados (voz ativa, sem ambiguidade)
- [ ] Checklist LGPD preenchido (se aplicavel)
- [ ] Risk Assessment nas 6 dimensoes completo
- [ ] Red flags identificados e documentados
- [ ] SLAs definidos com penalidades proporcionais (se aplicavel)
- [ ] Recomendacao de aprovacao com justificativa
