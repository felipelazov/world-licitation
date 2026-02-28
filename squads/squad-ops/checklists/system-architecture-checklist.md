# Checklist de Arquitetura de Sistemas

**Objetivo:** Revisar design de sistemas antes da implementacao
**Agente:** architect
**Padrao:** Arquitetura escalavel, resiliente e sem pontos cegos

---

## 1. DOCUMENTACAO E REQUISITOS

- [ ] Diagrama de arquitetura de alto nivel criado
- [ ] Componentes principais identificados e nomeados
- [ ] Responsabilidade de cada componente descrita
- [ ] Fluxo de dados entre componentes documentado
- [ ] Tecnologias escolhidas com justificativa
- [ ] Todos os requisitos funcionais cobertos
- [ ] Requisitos nao-funcionais mapeados para componentes
- [ ] Trade-offs documentados com justificativa

**Criterio:** Dev novo entende o sistema em 15 minutos.

---

## 2. ESCALABILIDADE E PERFORMANCE

- [ ] Carga esperada definida (usuarios, requisicoes, dados)
- [ ] Limites de cada componente conhecidos
- [ ] Estrategia de escala (horizontal/vertical) definida
- [ ] Tempo de resposta alvo definido (p50, p95, p99)
- [ ] Gargalos de performance identificados
- [ ] Cache strategy definida onde aplicavel

**Criterio:** Sistema aguenta 2x a carga esperada sem redesign.

---

## 3. INTEGRACOES

- [ ] Todas as integracoes externas listadas
- [ ] Contratos de API definidos (request/response)
- [ ] Autenticacao entre sistemas documentada
- [ ] Rate limits conhecidos e respeitados
- [ ] Fluxo de dados entre sistemas mapeado
- [ ] Estrategia para dados inconsistentes definida
- [ ] Politica de retry e dead letter queue definida

**Criterio:** Falha em uma integracao nao corrompe dados.

---

## 4. RESILIENCIA

- [ ] Todos os SPOFs (pontos unicos de falha) identificados
- [ ] Redundancia aplicada onde SPOF e critico
- [ ] Failover automatico para componentes criticos
- [ ] RTO (Recovery Time Objective) definido
- [ ] Circuit breaker entre servicos
- [ ] Timeout em todas as chamadas externas
- [ ] Graceful degradation planejado
- [ ] Health checks para cada componente

**Criterio:** Sistema degrada graciosamente em vez de cair inteiro.

---

## 5. SEGURANCA E OBSERVABILIDADE

- [ ] Autenticacao e autorizacao definidas
- [ ] Dados sensiveis protegidos (criptografia)
- [ ] Principio de menor privilegio aplicado
- [ ] Logs estruturados em todos os componentes
- [ ] Metricas de negocio e tecnicas definidas
- [ ] Dashboard de monitoramento especificado
- [ ] Alertas para falhas criticas configurados

**Criterio:** Diagnosticar problemas sem acesso direto ao servidor.

---

## GATE DE QUALIDADE

| Secao | Status | Observacoes |
|-------|--------|-------------|
| 1. Documentacao | [ ] PASS [ ] FAIL | |
| 2. Escalabilidade | [ ] PASS [ ] FAIL | |
| 3. Integracoes | [ ] PASS [ ] FAIL | |
| 4. Resiliencia | [ ] PASS [ ] FAIL | |
| 5. Seguranca | [ ] PASS [ ] FAIL | |

**STATUS GERAL:** [ ] APROVADO [ ] PRECISA REVISAO [ ] BLOQUEADO

---

**Versao:** 1.0.0 | **Responsavel:** ops-chief
