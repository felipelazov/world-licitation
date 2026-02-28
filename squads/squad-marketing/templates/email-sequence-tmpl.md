# Email Sequence — {tipo_sequencia}

**Produto/Servico:** {nome_produto}
**Data:** {data}
**Autor:** Andre Chaperon
**Versao:** {versao}

---

## 1. Estrategia da Sequencia

| Campo | Valor |
|-------|-------|
| **Tipo** | {boas-vindas / nurture / venda / pos-compra / reengajamento} |
| **Objetivo** | {o que a sequencia deve alcancar} |
| **Gatilho de Entrada** | {opt-in / compra / tag / evento} |
| **Publico** | {segmento especifico} |
| **Numero de Emails** | {quantidade} |
| **Intervalo Medio** | {dias entre emails} |
| **Criterio de Saida** | {conversao / fim da sequencia / unsubscribe} |

---

## 2. Arco Narrativo

> "Emails sao episodios de uma serie. Cada um deve deixar o leitor querendo o proximo."

| Fase | Emails | Objetivo da Fase |
|------|--------|-----------------|
| **Conexao** | {email 1-2} | Criar rapport, estabelecer confianca |
| **Educacao** | {email 3-5} | Ensinar, mostrar autoridade, mudar crencas |
| **Transicao** | {email 6-7} | Conectar problema com solucao |
| **Oferta** | {email 8-10} | Apresentar solucao, lidar com objecoes, fechar |

---

## 3. Sequencia Detalhada

### Email 1 — {titulo_email}

| Campo | Valor |
|-------|-------|
| **Dia** | Dia {numero} apos gatilho |
| **Subject Line** | {subject line} |
| **Preview Text** | {texto de preview} |
| **Objetivo** | {objetivo deste email especifico} |
| **Angulo** | {historia / dor / curiosidade / prova social} |
| **CTA** | {acao desejada} |

**Estrutura do Conteudo:**
- Hook: {primeira frase que prende atencao}
- Corpo: {resumo do conteudo principal}
- Transicao para CTA: {como conecta ao proximo passo}

---

### Email 2 — {titulo_email}

| Campo | Valor |
|-------|-------|
| **Dia** | Dia {numero} |
| **Subject Line** | {subject line} |
| **Preview Text** | {preview text} |
| **Objetivo** | {objetivo} |
| **Angulo** | {angulo} |
| **CTA** | {CTA} |

**Estrutura do Conteudo:**
- Hook: {hook}
- Corpo: {resumo}
- Transicao para CTA: {transicao}

---

### Email 3 — {titulo_email}

| Campo | Valor |
|-------|-------|
| **Dia** | Dia {numero} |
| **Subject Line** | {subject line} |
| **Preview Text** | {preview text} |
| **Objetivo** | {objetivo} |
| **Angulo** | {angulo} |
| **CTA** | {CTA} |

**Estrutura do Conteudo:**
- Hook: {hook}
- Corpo: {resumo}
- Transicao para CTA: {transicao}

---

### Email {N} — {titulo_email}

> Replicar esta estrutura para cada email adicional da sequencia.

---

## 4. Logica Condicional

```
SE leitor abriu Email 1 E clicou:
  → Enviar Email 2 (dia {x})
SE leitor abriu Email 1 E NAO clicou:
  → Enviar Email 2-alt com subject diferente (dia {x})
SE leitor NAO abriu Email 1:
  → Reenviar Email 1 com novo subject (dia {x})
  → SE nao abriu novamente: mover para sequencia de reengajamento
```

---

## 5. Metricas Esperadas

| Metrica | Meta | Benchmark Setor |
|---------|------|-----------------|
| Taxa de Abertura | {percentual}% | {referencia do setor} |
| Taxa de Clique | {percentual}% | {referencia} |
| Taxa de Conversao | {percentual}% | {referencia} |
| Taxa de Unsubscribe | < {percentual}% | {referencia} |
| Receita por Email | R$ {valor} | {referencia} |

---

## 6. Segmentacao Pos-Sequencia

| Comportamento | Acao Seguinte |
|---------------|--------------|
| Converteu durante a sequencia | {mover para sequencia pos-compra} |
| Engajou mas nao converteu | {mover para nurture longo prazo} |
| Nao engajou (nao abriu) | {mover para reengajamento ou sunset} |

---

## Change Log

| Data | Mudanca | Motivo |
|------|---------|--------|
| {data} | {o que mudou} | {por que} |
