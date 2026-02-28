# Modelo de Arquitetura de Receita

**Negocio:** {nome_negocio}
**Data:** {data}
**Autor:** Jacco van der Kooij
**Versao:** {versao}

---

## 1. Canais de Receita

> "Receita previsivel vem de canais previsveis."

| # | Canal | Tipo | Contribuicao Esperada | Status |
|---|-------|------|----------------------|--------|
| 1 | {canal_ex_vendas_diretas} | {inbound/outbound/partner/self-service} | {percentual_da_receita}% | {ativo/planejado/teste} |
| 2 | {canal} | {tipo} | {%} | {status} |
| 3 | {canal} | {tipo} | {%} | {status} |
| 4 | {canal} | {tipo} | {%} | {status} |

---

## 2. Estrutura de Pricing

> "Preco e comunicacao de valor, nao cobertura de custo."

| Tier | Nome | Preco | Publico-Alvo | Inclui |
|------|------|-------|-------------|--------|
| Free/Freemium | {nome_tier} | R$ 0 | {quem_usa} | {o_que_inclui} |
| Entrada | {nome} | R$ {valor}/mes | {quem} | {inclui} |
| Principal | {nome} | R$ {valor}/mes | {quem} | {inclui} |
| Premium | {nome} | R$ {valor}/mes | {quem} | {inclui} |
| Enterprise | {nome} | {sob_consulta} | {quem} | {inclui} |

**Modelo de cobranca:** {recorrente/unico/hibrido/usage-based}
**Ciclo:** {mensal/anual/ambos}
**Desconto anual:** {percentual}%

---

## 3. Metricas Unitarias

> "Conheca seus numeros ou seus numeros vao te destruir."

| Metrica | Definicao | Valor Atual | Meta |
|---------|-----------|-------------|------|
| **CAC** | Custo de Aquisicao de Cliente | R$ {valor} | R$ {meta} |
| **LTV** | Lifetime Value do Cliente | R$ {valor} | R$ {meta} |
| **LTV:CAC** | Razao valor/custo (saudavel >= 3:1) | {ratio} | >= 3:1 |
| **Payback** | Meses para recuperar CAC | {meses} | < {meta} meses |
| **Ticket Medio** | Valor medio por cliente/mes | R$ {valor} | R$ {meta} |
| **Churn Mensal** | Taxa de cancelamento | {%} | < {meta}% |
| **MRR** | Receita Recorrente Mensal | R$ {valor} | R$ {meta} |
| **ARR** | Receita Recorrente Anual | R$ {valor} | R$ {meta} |

---

## 4. Funil de Receita

> "Cada estagio do funil tem uma taxa de conversao. Otimize o estagio que mais perde."

| Estagio | Volume/Mes | Conversao | Saida |
|---------|------------|-----------|-------|
| Visitantes/Leads | {volume} | {%} | {volume_proximo_estagio} |
| MQL (Marketing Qualified) | {volume} | {%} | {saida} |
| SQL (Sales Qualified) | {volume} | {%} | {saida} |
| Proposta Enviada | {volume} | {%} | {saida} |
| Negociacao | {volume} | {%} | {saida} |
| Cliente Fechado | {volume} | — | — |

**Receita Nova/Mes:** R$ {clientes_novos x ticket_medio}

---

## 5. Projecao de Receita (12 Meses)

| Mes | Clientes Novos | Churn | Base Ativa | MRR | ARR Projetado |
|-----|---------------|-------|------------|-----|---------------|
| M1 | {novos} | {churn} | {base} | R$ {mrr} | R$ {arr} |
| M2 | {novos} | {churn} | {base} | R$ {mrr} | R$ {arr} |
| M3 | {novos} | {churn} | {base} | R$ {mrr} | R$ {arr} |
| M6 | {novos} | {churn} | {base} | R$ {mrr} | R$ {arr} |
| M9 | {novos} | {churn} | {base} | R$ {mrr} | R$ {arr} |
| M12 | {novos} | {churn} | {base} | R$ {mrr} | R$ {arr} |

---

## 6. Alavancas de Crescimento

| Alavanca | Descricao | Impacto Estimado | Prioridade |
|----------|-----------|-----------------|------------|
| **Expansao** | {upsell_cross_sell_na_base} | {impacto_em_receita} | {alta/media/baixa} |
| **Retencao** | {reducao_de_churn} | {impacto} | {prioridade} |
| **Aquisicao** | {novos_canais_ou_volume} | {impacto} | {prioridade} |
| **Pricing** | {ajuste_de_precos_ou_tiers} | {impacto} | {prioridade} |
| **Referral** | {programa_de_indicacao} | {impacto} | {prioridade} |

---

## Change Log

| Data | Mudanca | Motivo |
|------|---------|--------|
| {data} | {o_que_mudou} | {por_que} |
