# Analytics Setup Checklist

**Objetivo:** Verificar configuracao completa de analytics e rastreamento
**Agente:** Avinash Kaushik (Web Analytics & Data-Driven Marketing)
**Padrao:** Dados confiaveis para decisoes baseadas em evidencia

---

## TRACKING BASICO

- [ ] Google Analytics 4 (GA4) instalado e coletando dados
- [ ] Pixel do Meta (Facebook) instalado e verificado
- [ ] Conversions API (CAPI) configurada para redundancia server-side
- [ ] Google Tag Manager (GTM) implementado como camada de gerenciamento
- [ ] Dominio verificado nas plataformas de anuncio
- [ ] Consent mode configurado (LGPD compliance)

**Risco:** Sem tracking basico, todo investimento em marketing e cego.

---

## EVENTOS E CONVERSOES

- [ ] Eventos padrao configurados (page_view, scroll, click)
- [ ] Eventos customizados definidos por objetivo de negocio
- [ ] Evento de lead/cadastro rastreando corretamente
- [ ] Evento de compra/transacao configurado com valor
- [ ] Funil de conversao completo mapeado no analytics
- [ ] Testes de disparo realizados em todos os eventos
- [ ] Eventos de micro-conversao configurados (add_to_cart, begin_checkout)

**Risco:** Eventos mal configurados = dados errados = decisoes erradas.

---

## ATRIBUICAO E UTMs

- [ ] Modelo de atribuicao escolhido e documentado
- [ ] Padrao de UTMs definido (source, medium, campaign, content, term)
- [ ] Planilha de controle de UTMs criada
- [ ] Links de campanhas gerados com UTMs corretas
- [ ] Cross-domain tracking configurado (se multiplos dominios)
- [ ] Atribuicao testada end-to-end (click → conversao)

**Risco:** Sem atribuicao correta, credito vai para o canal errado.

---

## DASHBOARDS E RELATORIOS

- [ ] Dashboard principal criado com KPIs do negocio
- [ ] Metricas-chave definidas (CAC, LTV, ROAS, CPL, taxa de conversao)
- [ ] Segmentacao por canal configurada
- [ ] Comparacao temporal habilitada (semana, mes, trimestre)
- [ ] Relatorio automatizado agendado (semanal/mensal)
- [ ] Acesso ao dashboard compartilhado com stakeholders

**Risco:** Dados sem dashboard = informacao inacessivel para decisao.

---

## METAS E ALERTAS

- [ ] Metas de conversao configuradas no GA4
- [ ] Alertas automaticos para anomalias (queda de trafego, pico de bounce)
- [ ] Benchmarks internos estabelecidos por canal
- [ ] Metas de receita conectadas com metas de marketing
- [ ] Revisao periodica de metas agendada (mensal)

**Risco:** Sem metas, nao existe sucesso ou fracasso — apenas numeros.

---

## SCORING

| Secao | Itens Marcados | Total Itens | Status |
|-------|----------------|-------------|--------|
| Tracking Basico | ___ | 6 | |
| Eventos e Conversoes | ___ | 7 | |
| Atribuicao e UTMs | ___ | 6 | |
| Dashboards e Relatorios | ___ | 6 | |
| Metas e Alertas | ___ | 5 | |
| **TOTAL** | ___ | **30** | |

### Interpretacao

- **27-30 (90%+):** PASS - Analytics configurado e confiavel
- **22-26 (75-89%):** ATENCAO - Gaps que podem comprometer dados
- **15-21 (50-74%):** ALERTA - Dados nao sao confiaveis para decisao
- **Abaixo de 15:** FAIL - Setup precisa ser refeito do zero

---

**Revisor:** ________ **Data:** ________

**Quality Gate:** [ ] PASS [ ] FAIL

**Acoes Prioritarias:**
1. ________________________________________
2. ________________________________________
3. ________________________________________
