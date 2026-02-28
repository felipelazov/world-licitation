# Task: Proposta Comercial Personalizada

**Task ID:** ia-agency-os/proposta-comercial
**Version:** 1.0.0
**Execution Type:** Hibrido (Agent gera, Felipe revisa)
**Duration:** 15 minutos (geracao) + 10 minutos (revisao)
**Agent:** ia-agency-chief

---

## Proposito

Gerar proposta comercial personalizada baseada no diagnostico do cliente. A proposta segue o framework Grand Slam Offer do Hormozi: resultado dos sonhos claro, solucoes empilhadas, preco justificado com ratio valor:preco, e garantia que reduz risco.

---

## Inputs

```yaml
obrigatorios:
  diagnostico_path:
    field: "Path do arquivo de diagnostico do cliente"
    format: "string (path para YAML)"
    required: true
    example: "squads/ia-agency-os/data/clientes/{slug}-diagnostico.yaml"
```

---

## Steps

### Step 1: Carregar Diagnostico

Ler o arquivo de diagnostico do cliente e extrair:
- Dados do negocio (faturamento, segmento, equipe)
- Gargalo principal e custo
- Top 3 oportunidades com ROI
- Quick win proposto

### Step 2: Construir Proposta (Grand Slam Offer)

```markdown
# PROPOSTA COMERCIAL
## IA Agency OS — Solucoes de IA para {nome_empresa}

---

### Resultado

{Resultado especifico do cliente baseado no diagnostico}

Exemplo: "Seu atendimento WhatsApp rodando com IA em 7 dias —
respondendo clientes 24/7, qualificando leads, e gerando vendas
enquanto voce foca no que importa."

---

### O Problema

{Descricao do gargalo identificado no diagnostico}

**Custo atual:** R$ {custo}/mes
(= R$ {custo_anual}/ano que voce esta perdendo)

---

### A Solucao

**Pacote: {nome do pacote}**

| Entregavel | Descricao | Valor Real |
|------------|-----------|------------|
| {solucao 1} | {descricao} | R$ {valor} |
| {solucao 2} | {descricao} | R$ {valor} |
| {solucao 3} | {descricao} | R$ {valor} |
| Bonus: Treinamento equipe | 1h de treinamento presencial/online | R$ {valor} |
| Bonus: Suporte 30 dias | WhatsApp direto para duvidas | R$ {valor} |
| **TOTAL VALOR REAL** | | **R$ {soma}** |

---

### Investimento

| Item | Valor |
|------|-------|
| Setup (unico) | R$ {valor} |
| Mensalidade | R$ {valor}/mes |
| **Valor real:** | **R$ {soma_valor_real}** |
| **Voce paga:** | **R$ {preco_cobrado}** |
| **Ratio:** | **{X}:1 (voce paga R$1 para cada R${X} de valor)** |

---

### Garantia

**Garantia de Resultado 30 Dias:**
Se em 30 dias voce nao ver {resultado mensuravel especifico},
devolvemos 100% do seu investimento. Sem perguntas.

---

### Cronograma

| Semana | Entrega | Resultado |
|--------|---------|-----------|
| Semana 1 | {quick win} | {resultado imediato} |
| Semana 2 | {entrega 2} | {resultado} |
| Semana 3 | {entrega 3} | {resultado} |
| Semana 4 | {entrega final + treinamento} | {resultado completo} |

---

### Proximo Passo

Para comecar, basta:
1. Confirmar esta proposta
2. Assinar o contrato (envio digital)
3. Realizar o primeiro pagamento
4. Kickoff em ate 48h

**Validade:** Esta proposta e valida por 7 dias.

---

*Felipe Lazov | IA Agency OS*
*Empresario que usa IA — nao guru de IA.*
```

### Step 3: Felipe Revisa

Apresentar proposta para Felipe revisar:
- Valores estao corretos?
- Cronograma e realista?
- Garantia e entregavel?
- Algo a ajustar?

### Step 4: Enviar ao Cliente

Formato de envio:
- PDF via WhatsApp (preferido)
- Email com PDF anexo (alternativo)

---

## Output

```yaml
file: "squads/ia-agency-os/data/clientes/{slug}-proposta.md"
format: "markdown"
```

---

## Quality Gate: QG-IAOS-002

- [ ] Proposta baseada em dados reais do diagnostico
- [ ] Resultado especifico e mensuravel
- [ ] Ratio valor:preco >= 3:1
- [ ] Garantia definida com criterio mensuravel
- [ ] Cronograma com entregas semanais
- [ ] Preco alinhado com ticket medio (R$2.000-3.000/mes)
- [ ] Felipe revisou e aprovou

---

## Veto Conditions

- Se diagnostico incompleto → Voltar para diagnostico-cliente
- Se ROI < 2x → Nao propor (nao vale para o cliente)
- Se prazo > 30 dias para quick win → Simplificar escopo

---

**Task Status:** Ready for Production
