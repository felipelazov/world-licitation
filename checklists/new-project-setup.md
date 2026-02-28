# Checklist de Setup — New Project Setup

Executar IMEDIATAMENTE apos clonar a matriz para um novo cliente.
Este checklist garante que o projeto nasce com contexto completo.
Sem isso, todos os squads trabalham no vazio.

---

## 1. Identidade do Projeto

- [ ] `project-state.yaml` > `projeto.nome` preenchido
- [ ] `project-state.yaml` > `projeto.cliente` preenchido
- [ ] `project-state.yaml` > `projeto.inicio` com data de inicio (YYYY-MM-DD)
- [ ] `project-state.yaml` > `projeto.matriz_versao` confere com versao atual da matriz

## 2. Intake do Cliente

- [ ] `client-intake.yaml` existe e esta preenchido
- [ ] Segmento/nicho do cliente definido
- [ ] Problema principal articulado em linguagem do cliente
- [ ] Publico-alvo descrito (quem o cliente atende)
- [ ] Expectativas alinhadas (o que espera do projeto)

## 3. Escopo de Fases

- [ ] Fases aplicaveis marcadas como `pendente` no `project-state.yaml`
- [ ] Fases nao aplicaveis marcadas como `ignorado` com motivo
- [ ] Primeira fase identificada (qual squad comeca)
- [ ] Ordem das fases faz sentido para o contexto do cliente
- [ ] `progresso.fase_atual` aponta para a primeira fase

## 4. Squads Necessarios

- [ ] Squads que serao usados estao listados em `project-state.yaml` > `squads`
- [ ] Chiefs dos squads necessarios estao acessiveis (skills funcionando)
- [ ] Nenhum squad critico faltando para as fases planejadas

## 5. Estrutura de Pastas

- [ ] Pasta `deliverables/` existe e esta limpa
- [ ] Pasta `checklists/` existe com checklists da matriz
- [ ] Pasta `playbooks/` existe com playbooks relevantes
- [ ] Nenhum arquivo temporario ou de teste da matriz permaneceu

## 6. Configuracao Tecnica

- [ ] `.mcp.json` configurado (se MCPs necessarios)
- [ ] Skills dos squads necessarios funcionando (`/squad-*`)
- [ ] `project-state.yaml` parseia sem erros YAML

## 7. Primeiro Passo Definido

- [ ] Squad inicial identificado e comunicado
- [ ] Agente inicial definido (ex: sinek para fase proposito)
- [ ] `ultima_sessao.proximo_passo` descreve a primeira acao
- [ ] Cliente sabe o que esperar da primeira sessao

---

## Resultado

- **SETUP APROVADO:** Todos os itens aplicaveis marcados
- **PENDENCIAS:** Listar itens faltando e resolver ANTES de comecar qualquer fase

Data do setup: ____________________
Responsavel: ____________________
