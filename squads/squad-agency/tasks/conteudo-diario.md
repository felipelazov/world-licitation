# Task: Conteudo Diario — Posicionamento IA para PMEs

**Task ID:** ia-agency-os/conteudo-diario
**Version:** 1.0.0
**Execution Type:** Autonomo (Agent gera, Felipe publica)
**Duration:** 15 minutos
**Agent:** gestor-conteudo

---

## Proposito

Gerar 1 conteudo por dia para posicionar Felipe como autoridade em IA para PMEs. O conteudo segue pilares definidos, usa templates comprovados, e sempre termina com CTA. Meta: 15 min de producao por post.

---

## Inputs

```yaml
obrigatorios:
  dia_semana:
    field: "Dia da semana (segunda a domingo)"
    format: "string"
    required: true

opcionais:
  tema_especifico:
    field: "Tema que o Felipe quer abordar hoje"
    format: "string"
    required: false

  case_cliente:
    field: "Case de cliente para usar como exemplo"
    format: "string"
    required: false

  formato_override:
    field: "Formato especifico (carrossel, reels, stories, post, linkedin)"
    format: "string"
    required: false
```

---

## Steps

### Step 1: Determinar Formato e Pilar

Baseado no calendario semanal:

| Dia | Formato | Pilar |
|-----|---------|-------|
| Segunda | Carrossel | Educacao (40%) |
| Terca | Reels | Cases (30%) |
| Quarta | Post | Bastidores (20%) |
| Quinta | Carrossel | Educacao (40%) |
| Sexta | Reels | Cases/CTA (30%+10%) |
| Sabado | Stories | Bastidores (20%) |
| Domingo | LinkedIn | Autoridade |

Se `formato_override` fornecido, usar ele no lugar.

### Step 2: Selecionar Tema

Se `tema_especifico` fornecido, usar.
Se nao, sugerir 3 temas baseados no pilar do dia:

**Banco de Temas por Pilar:**

Educacao:
- "5 processos que toda PME pode automatizar com IA hoje"
- "Quanto custa NAO usar IA no seu negocio?"
- "Agente WhatsApp: o funcionario que trabalha 24/7"
- "IA nao substitui pessoas. IA potencializa pessoas."
- "Como saber se IA vale a pena pro seu negocio (teste rapido)"

Cases:
- "Como [cliente] economizou R$X mil/mes com um agente WhatsApp"
- "[Segmento]: antes vs depois de IA"
- "De 200 mensagens manuais para 0: o case de [cliente]"
- "R$ [valor] de ROI em 30 dias: como [cliente] fez"

Bastidores:
- "Hoje estou construindo [solucao] para [tipo empresa]"
- "Erro que eu cometi e que voce pode evitar com IA"
- "Como eu uso IA no meu proprio negocio"
- "5 ferramentas de IA que uso todo dia"

CTA:
- "Diagnostico gratuito: descubra onde IA pode gerar resultado no seu negocio"
- "Vagas: estou selecionando [X] empresas para implementar IA"

### Step 3: Aplicar Template

Aplicar o template correspondente ao formato:

**Carrossel (7 slides):**
```
Slide 1: [GANCHO FORTE — pergunta ou dado chocante]
Slide 2: [PROBLEMA — dor que o empresario reconhece]
Slide 3: [DADO — numero que valida o problema]
Slide 4: [SOLUCAO — como IA resolve]
Slide 5: [COMO FUNCIONA — 3 passos simples]
Slide 6: [RESULTADO — numero concreto ou case]
Slide 7: [CTA — "Salva", "Comenta IA", "Link na bio"]
```

**Reels (45s):**
```
[0-5s]   GANCHO: Frase impactante + texto na tela
[5-15s]  PROBLEMA: Mostrar o caos (manual, lento, erro)
[15-30s] SOLUCAO: Mostrar IA funcionando (demo, screenshot)
[30-40s] RESULTADO: Numero concreto
[40-45s] CTA: "Comenta IA que eu te explico"
```

**Post Estatico:**
```
[IMAGEM: Screenshot, antes/depois, ou quote]

LEGENDA:
[Gancho — primeira linha forte]
[3-5 paragrafos curtos contando a historia]
[Insight ou aprendizado]
[CTA]

HASHTAGS: #IAparaPMEs #AutomacaoComercial #AgenciaIA
#EmpreendedorDigital #InteligenciaArtificial
```

**LinkedIn:**
```
[Gancho — frase provocativa]

[Historia de 3-5 paragrafos]

[Insight / Framework]

[CTA: "Se voce quer [resultado], me manda mensagem."]
```

### Step 4: Gerar Conteudo

Gerar o conteudo completo seguindo:
- Tom: empresario para empresario
- Linguagem: simples, sem jargao tecnico
- Exemplos: reais ou realistas
- CTA: sempre presente

### Step 5: Entregar para Felipe

Output formatado pronto para copiar e postar:
- Texto da legenda
- Sugestao de visual (descricao da imagem/video)
- Hashtags
- Melhor horario para postar

---

## Output

Conteudo pronto para publicar no formato escolhido.

---

## Quality Gate

- [ ] Conteudo segue o pilar do dia
- [ ] Template aplicado corretamente
- [ ] CTA presente
- [ ] Linguagem de empresario (sem jargao tecnico)
- [ ] Tempo de producao <= 15 minutos
- [ ] Pronto para copiar e colar

---

**Task Status:** Ready for Production
