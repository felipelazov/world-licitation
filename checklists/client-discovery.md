# Checklist de Discovery — Client Discovery

Executar na PRIMEIRA sessao com o cliente, ANTES de iniciar qualquer fase.
Garante que o sistema tem contexto real — nao suposicoes — para trabalhar.
Garbage in = garbage out em todas as 8 fases.

---

## 1. Intake Basico

- [ ] `client-intake.yaml` > `projeto` completo (nome, cliente, data, responsavel)
- [ ] `client-intake.yaml` > `ideia.descricao` preenchida (1-3 frases do cliente)
- [ ] `client-intake.yaml` > `ideia.problema` articulado na linguagem do cliente
- [ ] `client-intake.yaml` > `ideia.publico` definido (quem o cliente atende)
- [ ] `client-intake.yaml` > `tipo` selecionado (franchise, agency, personal, etc.)

## 2. Contexto do Negocio

- [ ] Status atual mapeado: tem empresa? produto? clientes? marca? conteudo? equipe?
- [ ] `client-intake.yaml` > `negocio_existente` preenchido com respostas reais
- [ ] Faturamento e tempo de mercado registrados (mesmo que aproximado)
- [ ] Se negocio existente: pontos fortes e fracos identificados
- [ ] Se comecando do zero: isso esta claro no intake (campos vazios intencionais)

## 3. Objetivos e Expectativas

- [ ] Objetivo principal do projeto claro e registrado
- [ ] Expectativas do cliente alinhadas com o que o sistema entrega
- [ ] Prazo e orcamento documentados (ou explicitamente "sem restricao")
- [ ] `client-intake.yaml` > `prioridades` ordenadas pelo cliente (nao por nos)
- [ ] Cliente entende que as fases sao progressivas (nao tudo de uma vez)

## 4. Diferencial e Referencia

- [ ] `client-intake.yaml` > `ideia.diferencial` preenchido
- [ ] Se o cliente nao sabe o diferencial: marcado para resolver na fase de proposito
- [ ] Referencias/inspiracoes registradas (se existirem)
- [ ] Concorrentes conhecidos mencionados (se aplicavel)

## 5. Validacao de Escopo

- [ ] Fases necessarias identificadas com base no tipo de projeto e prioridades
- [ ] Fases que NAO se aplicam identificadas e justificadas
- [ ] Sequencia de fases faz sentido para este cliente especifico
- [ ] Nenhuma fase critica faltando (ex: proposito antes de design)
- [ ] Cliente concorda com o escopo planejado

## 6. Riscos e Restricoes

- [ ] Restricoes tecnicas conhecidas documentadas
- [ ] Restricoes de tempo ou disponibilidade registradas
- [ ] Dependencias externas identificadas (parceiros, aprovacoes, materiais)
- [ ] Se ha riscos obvios: registrados em `client-intake.yaml` > `notas`

## 7. Pronto para Iniciar

- [ ] `project-state.yaml` > `projeto` sincronizado com `client-intake.yaml`
- [ ] `project-state.yaml` > `progresso.fase_atual` definida
- [ ] `project-state.yaml` > `negocio.publico_alvo` preenchido (se conhecido)
- [ ] `project-state.yaml` > `negocio.problema_principal` preenchido (se conhecido)
- [ ] Primeiro squad/agente a ser ativado esta definido

---

## Resultado

- **DISCOVERY COMPLETO:** Todos os itens aplicaveis marcados. Pode iniciar fase 1.
- **DISCOVERY PARCIAL:** Itens faltando listados. Resolver antes de avancar.
- **DISCOVERY INSUFICIENTE:** Menos de 60% preenchido. Reagendar sessao com cliente.

Data da discovery: ____________________
Responsavel: ____________________
