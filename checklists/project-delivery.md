# Checklist de Entrega — Project Delivery

Executar antes de encerrar qualquer projeto clonado da matriz.
Cada item deve ser verificado. Itens nao aplicaveis marcam N/A.

---

## 1. Decisoes Registradas

- [ ] Todas as decisoes significativas estao em `project-state.yaml` (secao `decisoes`)
- [ ] Secao `negocio` do state esta completa (campos preenchidos pelas fases executadas)
- [ ] Nenhuma sinapse pendente (todas com status `entregue`)
- [ ] `ultima_sessao` reflete o estado final do projeto

## 2. Deliverables Organizados

- [ ] Pasta `deliverables/` tem outputs de todas as fases executadas
- [ ] Cada subpasta tem os arquivos listados no playbook da fase
- [ ] Nomes de arquivo seguem o padrao `{tipo}-{descricao}.{ext}`
- [ ] Nenhum deliverable faltando vs o que foi prometido

## 3. Estrategia (Advisor Squad)

- [ ] Posicionamento documentado (WHY, HOW, WHAT)
- [ ] Oferta principal definida e validada (preco, garantia, diferenciais)
- [ ] Visao de produto clara (features essenciais vs cortadas)
- [ ] N/A se fases de estrategia nao foram executadas

## 4. Identidade Visual (Design Squad)

- [ ] Logo entregue em formatos necessarios
- [ ] Paleta de cores documentada
- [ ] Tipografia definida
- [ ] Design tokens exportados (se aplicavel)
- [ ] N/A se fase de identidade nao foi executada

## 5. Conteudo (Content Distillery)

- [ ] Pilares de conteudo definidos
- [ ] Calendario ou frequencia estabelecida
- [ ] Templates de conteudo criados
- [ ] N/A se fase de conteudo nao foi executada

## 6. Operacao (Agency Squad)

- [ ] Servicos catalogados
- [ ] Automacoes configuradas ou documentadas
- [ ] Fluxo de onboarding definido
- [ ] N/A se fase de operacao nao foi executada

## 7. Escala (Franchise Squad)

- [ ] Avaliacao de franqueabilidade concluida
- [ ] Manual de operacoes criado
- [ ] Plano de expansao documentado
- [ ] N/A se fase de escala nao foi executada

## 8. Qualidade Final

- [ ] `project-state.yaml` progresso geral reflete realidade
- [ ] Fases ignoradas estao marcadas como `ignorado` com motivo
- [ ] Fases concluidas estao marcadas como `concluido`
- [ ] Nenhum arquivo temporario ou rascunho nos deliverables

## 9. Handoff

- [ ] Resumo executivo do projeto preparado
- [ ] Proximos passos documentados em `ultima_sessao.proximo_passo`
- [ ] Cliente sabe onde encontrar cada deliverable
- [ ] Feedback do cliente coletado (opcional)

---

## Resultado

- **ENTREGA APROVADA:** Todos os itens aplicaveis marcados
- **PENDENCIAS:** Listar itens faltando e responsavel

Data de entrega: ____________________
Responsavel: ____________________
