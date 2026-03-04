# Pipeline Licitatorio Completo — Fornecedor de Cesta Basica

> Fluxo de ponta a ponta: da prospeccao do edital ate o recebimento do pagamento.
> 7 fases sequenciais com gates de qualidade entre cada uma.
>
> Referencia: Lei 14.133/2021 | Decreto 10.024/2019 (Pregao Eletronico)

---

## Visao Geral do Pipeline

```
FASE 1          FASE 2         FASE 3           FASE 4          FASE 5          FASE 6           FASE 7
Prospeccao  →  Analise    →  Habilitacao  →  Proposta    →  Pregao      →  Contrato     →  Execucao
(encontrar)    (GO/NO-GO)    (documentos)    (preco)        (disputar)     (assinar)       (entregar)
   |              |              |               |              |              |               |
   v              v              v               v              v              v               v
 Editais      Decisao de    Docs prontos     Proposta      Adjudicacao    Contrato        Pagamento
 filtrados    participar    e validados      enviada       (ou nao)       assinado        recebido
```

---

## Fase 1 — Prospeccao de Editais

**Objetivo:** Encontrar editais de cesta basica compativeis com sua capacidade e regiao.

**Responsavel:** Licitacao Chief + @edital-analyst

**Frequencia:** Diaria (os editais tem prazo curto — perder 1 dia = perder oportunidade)

### Onde Buscar

| Portal | Abrangencia | URL | Observacao |
|---|---|---|---|
| **Compras.gov.br** | Federal | gov.br/compras | Principal portal. Pregoes federais. |
| **BEC-SP** | Estado de SP | bec.sp.gov.br | Bolsa Eletronica de Compras. Muito volume em SP. |
| **Licitacoes-e** | Nacional | licitacoes-e.com.br | Banco do Brasil. Muitos municipios usam. |
| **ComprasNET** | Federal | comprasnet.gov.br | Legado, migrando pra Compras.gov.br |
| **Portais municipais** | Municipio | Varia | Cada prefeitura tem o seu |
| **Diario Oficial** | Federal/Estadual/Municipal | Varia | Publicacao obrigatoria de todos os editais |

### Filtros de Busca

| Filtro | O que buscar |
|---|---|
| **Objeto** | "cesta basica", "kit alimentacao", "generos alimenticios", "cesta de alimentos" |
| **Modalidade** | Pregao eletronico (mais comum e rapido) |
| **Valor estimado** | Compativel com capacidade (3.000-9.000 cestas) |
| **Local de entrega** | Raio logistico viavel (considerar custo do frete) |
| **Prazo de entrega** | Viavel com sua operacao |
| **Data da sessao** | Minimo 5-8 dias uteis pra preparar proposta |

### Ferramentas de Monitoramento

| Ferramenta | Tipo | Custo |
|---|---|---|
| **Alerta Compras.gov.br** | Gratis, por email | Gratuito |
| **Portal de Licitacoes (licitacao.net)** | Agregador | Pago (~R$100-300/mes) |
| **Licitanet** | Agregador | Pago |
| **Licitar Digital** | Agregador | Pago |
| **Busca manual diaria** | Portal por portal | Gratuito (custa tempo) |

**Recomendacao inicial:** Comecar com alerta gratuito do Compras.gov.br + busca manual na BEC-SP. Quando o volume justificar, assinar um agregador.

### Gate: Edital Identificado

- [ ] Edital encontrado com objeto compativel
- [ ] Prazo permite preparacao (minimo 5 dias uteis)
- [ ] Primeira impressao: vale analisar

**Resultado:** Edital encaminhado para Fase 2 (Analise)

---

## Fase 2 — Analise de Edital (GO / NO-GO)

**Objetivo:** Decidir se vale participar. Rapido, objetivo, sem romantismo.

**Responsavel:** @edital-analyst

**Duracao:** 2-4 horas por edital

### Checklist de Analise (10 pontos)

| # | Criterio | Peso | Resultado |
|---|---|---|---|
| 1 | **Objeto bate?** Cesta basica / kit alimentacao / generos compativeis | Eliminatorio | GO / NO-GO |
| 2 | **Quantidade e viavel?** Capacidade de produzir e entregar no prazo | Eliminatorio | GO / NO-GO |
| 3 | **Local de entrega?** Raio logistico viavel, frete nao mata margem | Eliminatorio | GO / NO-GO |
| 4 | **Prazo de entrega?** Compativel com operacao | Eliminatorio | GO / NO-GO |
| 5 | **Habilitacao atingivel?** Exigencias documentais sao cumpridas | Eliminatorio | GO / NO-GO |
| 6 | **Valor estimado permite margem?** Preco referencia vs custo real | Classificatorio | Nota 1-5 |
| 7 | **Clausulas restritivas?** Tem algo direcionado ou abusivo | Classificatorio | Nota 1-5 |
| 8 | **Historico do orgao?** Paga em dia? Tem reclamacoes? | Classificatorio | Nota 1-5 |
| 9 | **Concorrencia?** Quantos fornecedores participaram antes | Classificatorio | Nota 1-5 |
| 10 | **Risco x Retorno?** Vale o esforco? | Classificatorio | Nota 1-5 |

### Regra de Decisao

| Resultado | Acao |
|---|---|
| Qualquer eliminatorio = NO-GO | Para aqui. Nao perde tempo. |
| Todos eliminatorios = GO + Media classificatoria >= 3 | **GO — Participar** |
| Todos eliminatorios = GO + Media classificatoria < 3 | GO com ressalvas (avaliar esforco) |

### O que Analisar no Edital

**Secoes criticas:**

| Secao | O que buscar |
|---|---|
| **Objeto** | Descricao exata dos itens, quantidades, unidades de medida |
| **Habilitacao** | Documentos exigidos (conferir se tem todos) |
| **Proposta** | Modelo exigido, formato, o que deve conter |
| **Julgamento** | Tipo (menor preco por item? Por lote? Global?) |
| **Prazo de entrega** | Dias corridos ou uteis? A partir de quando? |
| **Local de entrega** | Endereco(s) exato(s). Multiplos pontos = mais caro |
| **Pagamento** | Prazo (30 dias tipico). Condicoes pra faturar. |
| **Penalidades** | Multa por atraso, descredenciamento, suspensao |
| **Recursos** | Prazos pra impugnacao e recursos |

### Impugnacao de Edital

Se o edital tem clausula abusiva, restritiva ou ilegal:
- **Prazo:** Ate 3 dias uteis antes da sessao (pregao eletronico)
- **Como:** Peticao escrita ao pregoeiro, via portal
- **Quando usar:** Exigencia tecnica desproporcional, marca especifica exigida, prazo impossivel

### Gate: Decisao GO/NO-GO

- [ ] Analise completa dos 10 criterios
- [ ] Decisao documentada com justificativa
- [ ] Se GO: encaminhar para Fase 3

**Resultado:** GO (seguir) ou NO-GO (descartar e buscar proximo)

---

## Fase 3 — Preparacao de Habilitacao

**Objetivo:** Garantir que TODA documentacao esta pronta, valida e digitalizada ANTES da sessao.

**Responsavel:** @compliance-officer

**Duracao:** 1-3 dias (se ja tem tudo pronto) | 1-2 semanas (primeira vez)

### Conferencia por Categoria

**Pre-requisitos:**
- [ ] Certificado digital e-CNPJ ativo e nao vencido
- [ ] SICAF cadastrado, ativo, todos os niveis
- [ ] CNAE compativel com o objeto do edital

**Habilitacao Juridica:**
- [ ] Contrato social / ultima alteracao
- [ ] Documento identidade representante legal
- [ ] Procuracao (se representante nao e socio)

**Regularidade Fiscal e Trabalhista:**
- [ ] CND Federal (Receita + PGFN) — verificar validade
- [ ] CND Estadual (SEFAZ-SP) — verificar validade
- [ ] CND Municipal — verificar validade
- [ ] CRF/FGTS — **validade 30 dias!** Emitir perto da sessao
- [ ] CNDT Trabalhista — verificar validade

**Qualificacao Tecnica:**
- [ ] Alvara sanitario em dia
- [ ] Atestado de capacidade tecnica (volume compativel com edital)
- [ ] Documentos complementares exigidos no edital

**Qualificacao Economico-Financeira:**
- [ ] Balanco patrimonial do ultimo exercicio
- [ ] Indices financeiros calculados (ILC, ILG, SG >= 1)
- [ ] Certidao negativa de falencia (se exigida)

**Declaracoes (geralmente autodeclaratorias):**
- [ ] Declaracao de ME/EPP (se aplicavel — beneficio nos lances)
- [ ] Declaracao de inexistencia de trabalho infantil
- [ ] Declaracao de que cumpre requisitos de habilitacao
- [ ] Declaracao de parentesco (editais municipais)

### Beneficio ME/EPP

Se sua empresa e Micro Empresa (ME) ou Empresa de Pequeno Porte (EPP):

| Beneficio | Detalhe |
|---|---|
| **Empate ficto** | Se seu lance for ate 5% acima do menor, tem direito a cobrir |
| **Regularidade fiscal** | Pode vencer mesmo com certidao pendente (tem 5 dias pra regularizar) |
| **Itens exclusivos** | Editais ate R$80.000 sao exclusivos pra ME/EPP |
| **Cota reservada** | 25% do valor pode ser reservado pra ME/EPP |

**IMPORTANTE:** Se for ME/EPP, declarar no pregao. Nao declarar = perder o beneficio.

### Gate: Documentacao Completa

- [ ] Todos os documentos validos e digitalizados (PDF)
- [ ] Certidoes dentro da validade na data da sessao
- [ ] SICAF atualizado
- [ ] Declaracoes preenchidas

**Resultado:** Documentacao pronta → seguir para Fase 4

---

## Fase 4 — Elaboracao de Proposta

**Objetivo:** Montar proposta com preco competitivo e margem saudavel. Nao vender no prejuizo.

**Responsavel:** @bid-strategist

**Duracao:** 2-4 horas

### Planilha de Custo — Cesta Basica

| Componente | Descricao | Custo/Cesta |
|---|---|---|
| **Materia-prima** | Custo dos alimentos (arroz, feijao, oleo, etc.) | R$ _____ |
| **Embalagem** | Caixa/sacola + etiqueta + fita | R$ _____ |
| **Mao de obra** | Montagem, separacao, conferencia | R$ _____ |
| **Frete/entrega** | Transporte ate o local de entrega | R$ _____ |
| **Impostos** | ICMS, PIS, COFINS, IRPJ, CSLL (depende do regime) | R$ _____ |
| **Custos fixos rateados** | Aluguel, energia, agua, internet | R$ _____ |
| **Perdas/avarias** | Margem de seguranca (1-3%) | R$ _____ |
| **CUSTO TOTAL** | Soma de tudo | **R$ _____** |
| **Margem desejada** | % sobre o custo | ___% |
| **PRECO DE VENDA** | Custo total + margem | **R$ _____** |

### Estrategia de Preco

| Conceito | Definicao |
|---|---|
| **Preco de referencia** | Valor estimado pelo orgao (esta no edital ou ata anterior) |
| **Preco de abertura** | Seu preco inicial na proposta (NUNCA revelar o piso) |
| **Piso de margem** | Menor preco que voce aceita vender (abaixo = prejuizo) |
| **Preco competitivo** | Estimativa de onde os concorrentes vao chegar |

### Pesquisa de Mercado

Antes de precificar, verificar:

1. **Atas vigentes** do mesmo orgao (Compras.gov.br → pesquisar atas)
2. **Pregoes anteriores** do mesmo objeto (ver precos praticados)
3. **PNCP** (Portal Nacional de Contratacoes Publicas) — historico de precos
4. **Painel de Precos** do governo (paineldeprecos.planejamento.gov.br)

### Formatacao da Proposta

A proposta deve seguir EXATAMENTE o modelo do edital. Geralmente inclui:

- Razao social, CNPJ, endereco
- Descricao dos itens conforme edital (nao alterar descricao!)
- Preco unitario e preco total
- Marca dos produtos (quando exigido)
- Prazo de validade da proposta (minimo 60 dias)
- Declaracao de que o preco inclui todos os custos
- Assinatura do representante legal

### Erros que Desclassificam

| Erro | Consequencia |
|---|---|
| Preco unitario acima do referencia | Desclassificado |
| Descricao diferente do edital | Desclassificado |
| Proposta sem assinatura | Desclassificado |
| Marca nao informada (quando exigido) | Desclassificado |
| Prazo de validade menor que exigido | Desclassificado |
| Preco com mais de 2 casas decimais | Pode desclassificar |

### Gate: Proposta Validada

- [ ] Planilha de custo completa e realista
- [ ] Piso de margem definido (abaixo disso NAO desce)
- [ ] Proposta formatada conforme modelo do edital
- [ ] Precos conferidos (unitario x quantidade = total)
- [ ] Proposta enviada no portal antes do prazo

**Resultado:** Proposta enviada → aguardar sessao (Fase 5)

---

## Fase 5 — Sessao do Pregao Eletronico

**Objetivo:** Participar da disputa, dar lances estrategicos e buscar adjudicacao.

**Responsavel:** @bid-strategist

**Duracao:** 2-6 horas (dia da sessao)

### Antes da Sessao (D-1)

- [ ] Testar acesso ao portal com certificado digital
- [ ] Verificar horario exato da sessao
- [ ] Ter planilha de custo aberta (saber o piso de cabeca)
- [ ] Internet estavel (ter plano B — 4G como backup)
- [ ] Proposta ja enviada no sistema

### Fases do Pregao Eletronico

```
1. Abertura       → Propostas abertas pelo pregoeiro
2. Classificacao  → Propostas dentro do valor sao aceitas
3. Lances         → Disputa em tempo real (modo aberto, fechado ou aberto-fechado)
4. Negociacao     → Pregoeiro negocia com o melhor classificado
5. Habilitacao    → Documentos do vencedor sao conferidos
6. Recursos       → Prazo pra recursos (intenção: imediato)
7. Adjudicacao    → Pregoeiro adjudica ao vencedor
8. Homologacao    → Autoridade superior confirma
```

### Modos de Disputa (Lei 14.133/2021)

| Modo | Como funciona | Estrategia |
|---|---|---|
| **Aberto** | Lances publicos em tempo real. Todos veem os lances. | Comecar alto, descer gradual. Monitorar concorrentes. |
| **Fechado** | Lance unico e secreto. Sem disputa. | Preco agressivo mas com margem. Uma chance so. |
| **Aberto-fechado** | Fase aberta + lance final fechado. | Fase aberta pra sentir mercado + lance fechado decisivo. |

### Estrategia de Lances (Modo Aberto)

| Regra | Detalhe |
|---|---|
| **Abertura** | NUNCA comece no piso. Comece proximo ao preco de referencia. |
| **Descida** | Reduza em decrementos pequenos (R$0,50-2,00 por cesta). |
| **Monitoramento** | Observe quantos concorrentes estao dando lances. |
| **Piso** | Definido na Fase 4. NUNCA ultrapasse. Prejuizo nao e estrategia. |
| **Tempo** | Cada lance reinicia o cronometro. Nao tenha pressa. |
| **Final** | Se restou so voce e mais 1, reduza com cuidado. |

### Periodo de Iminencia (Modo Aberto)

- Quando o pregoeiro aciona o "modo iminencia", falta pouco pra fechar
- Periodo aleatorio de 1 a 30 minutos
- Voce NAO sabe quando vai fechar — de seu melhor lance antes

### Negociacao com Pregoeiro

Apos fase de lances, o pregoeiro pode negociar:
- Ele pede pra voce reduzir mais o preco
- **Voce NAO e obrigado a aceitar**
- Avalie se ainda tem margem. Se nao tem, recuse educadamente.
- "O preco ofertado ja contempla o menor custo possivel para esta entrega."

### Habilitacao (pos-lance)

Se voce for o melhor classificado:
1. Pregoeiro verifica SICAF automaticamente
2. Pode pedir documentos complementares (enviar em 2-24h, conforme edital)
3. Se documentacao OK: habilitado
4. Se documentacao com falha: pode ser dado prazo pra corrigir (ou nao)

### Inabilitacao — O que Fazer

Se for inabilitado:
- Verificar motivo exato
- Se for erro do pregoeiro: registrar intencao de recurso IMEDIATAMENTE
- Prazo: 30 minutos apos declaracao de vencedor (no chat do sistema)
- Prazo pra razoes do recurso: 3 dias uteis

### Resultados Possiveis

| Resultado | Proximo passo |
|---|---|
| **Adjudicado (1o lugar)** | Aguardar homologacao → Fase 6 |
| **2o-3o classificado** | Ficar na fila. Se o 1o falhar, voce e chamado. |
| **Nao classificado** | Analisar o que aconteceu, ajustar pra proximo pregao |
| **Desclassificado** | Entender motivo. Avaliar recurso. |
| **Pregao fracassado/deserto** | Orgao pode chamar novamente. Fique atento. |

### Gate: Sessao Concluida

- [ ] Participacao documentada (prints, ata)
- [ ] Resultado registrado (adjudicado / classificacao / nao classificado)
- [ ] Se adjudicado: aguardar homologacao

**Resultado:** Adjudicado → seguir para Fase 6

---

## Fase 6 — Contrato e Formalizacao

**Objetivo:** Assinar o contrato, entender as obrigacoes e preparar a operacao de entrega.

**Responsavel:** @contract-manager

**Duracao:** 5-15 dias uteis (da homologacao ate assinatura)

### Fluxo de Formalizacao

```
Adjudicacao → Homologacao → Convocacao → Conferencia → Assinatura → Inicio
  (pregoeiro)  (autoridade)   (5 dias)    (minuta)      (contrato)   (vigencia)
```

### Homologacao

- Apos adjudicacao, a autoridade superior (secretario, prefeito, diretor) homologa
- Pode levar 1-10 dias uteis
- So apos homologacao o resultado e definitivo
- Se houver recurso pendente, homologacao aguarda julgamento

### Convocacao para Assinatura

- Orgao envia convocacao (email, portal, diario oficial)
- **Prazo tipico:** 5 dias uteis pra comparecer e assinar
- **Se nao assinar no prazo:** Perde o direito. Proximo classificado e chamado. Pode levar penalidade.

### Conferencia da Minuta do Contrato

**ANTES de assinar, verificar:**

| Item | O que checar |
|---|---|
| **Objeto** | Descricao bate com a proposta? Quantidade correta? |
| **Preco** | Valor unitario e total conferem com o lance vencedor? |
| **Prazo de vigencia** | Quanto tempo dura o contrato? Renovavel? |
| **Prazo de entrega** | Cronograma definido? Entregas parceladas ou unicas? |
| **Local de entrega** | Endereco(s) correto(s)? |
| **Condicoes de pagamento** | Prazo (30 dias tipico). A partir de quando? |
| **Penalidades** | Multa por atraso (0,5-1% por dia). Suspensao. Impedimento. |
| **Garantia contratual** | Exigida? Quanto? (geralmente 5% do valor) |
| **Reajuste** | Previsto? Indice? Periodicidade? |
| **Rescisao** | Condicoes para rescindir. Suas e do orgao. |

### Garantia Contratual

Se exigida (geralmente em contratos > R$100.000):

| Tipo | Como funciona | Custo |
|---|---|---|
| **Caucao em dinheiro** | Deposita % do valor em conta do orgao | Imobiliza capital |
| **Seguro-garantia** | Apolice de seguradora | ~1-3% do valor garantido/ano |
| **Fianca bancaria** | Banco garante por voce | ~2-5% do valor/ano |

**Recomendacao:** Seguro-garantia (nao imobiliza capital, custo razoavel).

### Ata de Registro de Precos (ARP)

Muitos pregoes NAO geram contrato imediato, mas sim uma **Ata de Registro de Precos**:

| Ata de Registro de Precos | Contrato |
|---|---|
| Vigencia: 12 meses (nao renovavel) | Vigencia: 12 meses (renovavel ate 5 anos) |
| Orgao NAO e obrigado a comprar | Orgao e obrigado a cumprir |
| Compra conforme demanda (pedidos) | Entrega conforme cronograma |
| Pode ter "carona" (outros orgaos compram) | Sem carona |

**IMPORTANTE:** Na ARP, voce se compromete a manter o preco por 12 meses. Se o custo subir muito, pode pedir reequilibrio economico-financeiro.

### Gate: Contrato Assinado

- [ ] Homologacao confirmada
- [ ] Minuta conferida e aprovada
- [ ] Contrato/ata assinado dentro do prazo
- [ ] Garantia emitida (se exigida)
- [ ] Cronograma de entrega definido

**Resultado:** Contrato ativo → seguir para Fase 7

---

## Fase 7 — Execucao, Entrega e Pagamento

**Objetivo:** Entregar conforme contrato, faturar corretamente e receber o pagamento.

**Responsavel:** @contract-manager

**Duracao:** Vigencia do contrato (12 meses tipico)

### Ciclo de Entrega

```
Pedido/Ordem  →  Separacao  →  Transporte  →  Entrega  →  Conferencia  →  Recebimento
de Fornecimento  de cestas     ao local       fisica      pelo fiscal     definitivo
     |                                                        |               |
     v                                                        v               v
  Prazo comeca                                          Provisorio       NF pode ser
  a contar                                              (imediato)       emitida
```

### Recebimento pelo Orgao

| Tipo | Quando | O que acontece |
|---|---|---|
| **Provisorio** | No ato da entrega | Fiscal confere quantidade e aparencia |
| **Definitivo** | Ate 10 dias apos provisorio | Fiscal confere qualidade, validade, especificacoes |

**So emita nota fiscal apos recebimento definitivo** (ou conforme edital).

### Documentacao de Entrega

**A cada entrega, documentar:**

- [ ] Nota fiscal emitida corretamente
- [ ] Ordem de fornecimento / autorizacao de entrega
- [ ] Protocolo de recebimento assinado pelo fiscal
- [ ] Fotos da entrega (prova de cumprimento)
- [ ] Registro de temperatura (se produtos pereciveis)
- [ ] Canhoto da NF assinado

### Faturamento e Pagamento

| Etapa | Detalhe |
|---|---|
| **Emissao da NF** | Apos recebimento definitivo |
| **Ateste do fiscal** | Fiscal do contrato atesta que recebeu e conferiu |
| **Liquidacao** | Setor financeiro do orgao processa |
| **Pagamento** | Credito em conta. Prazo: 30 dias tipico (pode ser menos) |

### Atrasos de Pagamento do Orgao

Se o orgao atrasar o pagamento:

1. **Ate 30 dias de atraso:** Cobrar administrativamente (oficio)
2. **30-90 dias:** Notificacao formal com pedido de correcao monetaria
3. **Acima de 90 dias:** Pode suspender a entrega (art. 137 da Lei 14.133)
4. **Ultimo recurso:** Acao judicial

**Dica:** Manter registro de todas as entregas e notas fiscais com protocolo. Papel e sua defesa.

### Problemas Comuns na Execucao

| Problema | Solucao |
|---|---|
| Produto com validade curta | Negociar entrega parcelada |
| Orgao pede mais que o contratado | Acresimo ate 25% e obrigatorio aceitar. Acima: recusar. |
| Orgao pede entrega em local diferente | So aceitar se previsto no contrato |
| Aumento de custo dos insumos | Pedir reequilibrio economico-financeiro (com comprovacao) |
| Produto indisponivel no mercado | Comunicar IMEDIATAMENTE. Propor substituto equivalente. |
| Multa por atraso | Se o atraso nao foi sua culpa: contestar com provas |

### Reequilibrio Economico-Financeiro

Se o preco dos insumos subir significativamente apos assinatura:

1. Levantar comprovacao (notas fiscais de compra, indices de inflacao, cotacoes)
2. Calcular o impacto no custo
3. Enviar pedido formal ao orgao com documentacao
4. Orgao analisa e pode conceder reajuste
5. **Base legal:** Art. 124, II, "d" da Lei 14.133/2021

### Penalidades — O que Evitar

| Penalidade | Causa | Consequencia |
|---|---|---|
| **Advertencia** | Falha leve, primeiro descumprimento | Registro no SICAF |
| **Multa** | Atraso na entrega, produto fora da especificacao | 0,5-1% por dia de atraso (teto: 20-30%) |
| **Suspensao** | Falha grave, reincidencia | Impedido de licitar por 1-3 anos |
| **Impedimento** | Fraude, declaracao falsa | Impedido de licitar por ate 5 anos |
| **Declaracao de inidoneidade** | Fraude grave | Impedido de licitar em TODOS os niveis (ate 6 anos) |

### Gate: Execucao Concluida

- [ ] Todas as entregas realizadas conforme cronograma
- [ ] Todas as NFs emitidas e atestadas
- [ ] Todos os pagamentos recebidos
- [ ] Nenhuma penalidade pendente
- [ ] Contrato encerrado ou renovado

**Resultado:** Ciclo completo. Voltar para Fase 1 com proximo edital.

---

## Cronograma Tipico — Primeiro Pregao

| Semana | Acao | Fase |
|---|---|---|
| **1** | Comprar certificado digital + solicitar alvara sanitario | Fase 3 |
| **1-2** | Emitir certidoes + levantar documentacao | Fase 3 |
| **2** | Cadastrar no SICAF | Fase 3 |
| **2-3** | Monitorar editais + pedir atestado tecnico | Fase 1 |
| **3** | Analisar primeiro edital (GO/NO-GO) | Fase 2 |
| **3** | Montar planilha de custo e proposta | Fase 4 |
| **3-4** | Participar do primeiro pregao | Fase 5 |
| **4+** | Se adjudicado: contrato e entrega | Fases 6-7 |

**Meta: 3-4 semanas do zero ao primeiro pregao** (se alvara sanitario ja estiver em dia).

---

## Metricas de Acompanhamento

| Metrica | Como medir | Meta |
|---|---|---|
| **Editais analisados / mes** | Contagem de GO/NO-GO | >= 10 |
| **Taxa de participacao** | Pregoes participados / editais GO | >= 50% |
| **Taxa de adjudicacao** | Vitorias / participacoes | >= 20% (iniciante), >= 35% (experiente) |
| **Margem media** | Margem real / faturamento | >= 15% |
| **Prazo medio de pagamento** | Dias entre entrega e recebimento | <= 45 dias |
| **Penalidades** | Advertencias + multas | Zero |
| **Tempo de preparacao** | Dias entre GO e proposta enviada | <= 5 dias uteis |

---

## Glossario Rapido

| Termo | Significado |
|---|---|
| **Adjudicacao** | Pregoeiro declara voce como vencedor do item/lote |
| **Homologacao** | Autoridade superior confirma o resultado |
| **Pregoeiro** | Servidor que conduz a sessao do pregao |
| **Fiscal do contrato** | Servidor que acompanha a execucao |
| **ARP** | Ata de Registro de Precos (compromisso de preco por 12 meses) |
| **SRP** | Sistema de Registro de Precos (modalidade que gera ARP) |
| **Carona** | Outro orgao usa sua ata pra comprar |
| **UASG** | Codigo do orgao no Compras.gov.br |
| **Empenho** | Reserva de orcamento do orgao pra pagar voce |
| **Liquidacao** | Setor financeiro confirma que a entrega foi feita |
| **ME/EPP** | Micro Empresa / Empresa de Pequeno Porte (beneficios na licitacao) |
| **Lance** | Oferta de preco durante a disputa |
| **Decrementar** | Reduzir o lance |
| **Modo iminencia** | Periodo aleatorio antes de fechar a fase de lances |
| **Impugnacao** | Questionamento formal de clausula do edital |
| **Recurso** | Contestacao formal do resultado |

---

*Documento gerado pelo Squad Licitacao — Licitacao Chief*
*Referencia legal: Lei 14.133/2021 | Decreto 10.024/2019*
*Ultima atualizacao: 2026-03-04*
