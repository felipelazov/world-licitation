# Catalog Spec: {CatalogName}

> Version: {VERSION}
> Created: {DATE}
> Status: {Draft|Review|Final}

---

## 1. Briefing

| Campo | Valor |
|-------|-------|
| Publico | {publico_alvo} |
| Objetivo | {objetivo} |
| Tom | {tom_visual} |
| Produtos | {total_produtos} em {total_categorias} categorias |
| Formato | {formato} ({dimensoes}) |
| Paginas | ~{total_paginas} |

---

## 2. Arquitetura de Informacao

### Hierarquia por Produto
- **Primario:** {campos_primarios}
- **Secundario:** {campos_secundarios}
- **Terciario:** {campos_terciarios}

### Agrupamento
{categorias_com_contagem}

### Fluxo de Leitura
{fluxo}

### Eliminado (Data-Ink)
{itens_eliminados}

---

## 3. Design System

### Tipografia
| Familia | Uso |
|---------|-----|
| {font_primary} | Titulos, subtitulos, precos |
| {font_secondary} | Corpo, captions (opcional) |

### Paleta de Cores
| Funcao | Cor | Hex |
|--------|-----|-----|
| Primaria | {swatch} | {hex_primary} |
| Secundaria | {swatch} | {hex_secondary} |
| Neutro | {swatch} | {hex_neutral} |
| Accent | {swatch} | {hex_accent} |

### Espacamento (base {spacing_unit}pt)
| Token | Valor | Uso |
|-------|-------|-----|
| xs | {xs}pt | Padding interno |
| sm | {sm}pt | Entre elementos |
| md | {md}pt | Entre blocos |
| lg | {lg}pt | Entre secoes |
| xl | {xl}pt | Entre grupos |

---

## 4. Grid System

| Propriedade | Valor |
|-------------|-------|
| Colunas | {columns} |
| Gutter | {gutter}mm |
| Margens | top {mt}mm, bottom {mb}mm, inner {mi}mm, outer {mo}mm |
| Baseline | {baseline}pt |
| Area util | {area_width} x {area_height}mm |

### Page Types

#### Capa
```
{ascii_wireframe_cover}
```

#### Product Page
```
{ascii_wireframe_product}
```

#### Closing
```
{ascii_wireframe_closing}
```

---

## 5. Specs Tipograficos

| Nivel | Tamanho | Peso | Leading | Tracking | Cor |
|-------|---------|------|---------|----------|-----|
| Display | {display_size}pt | {display_weight} | {display_leading}pt | {display_tracking} | {display_color} |
| H1 | {h1_size}pt | {h1_weight} | {h1_leading}pt | {h1_tracking} | {h1_color} |
| H2 | {h2_size}pt | {h2_weight} | {h2_leading}pt | {h2_tracking} | {h2_color} |
| Body | {body_size}pt | {body_weight} | {body_leading}pt | {body_tracking} | {body_color} |
| Caption | {caption_size}pt | {caption_weight} | {caption_leading}pt | {caption_tracking} | {caption_color} |
| Price | {price_size}pt | {price_weight} | {price_leading}pt | {price_tracking} | {price_color} |

---

## 6. Componentes

### Product Card
```
{ascii_product_card}
```

### Category Header
```
{ascii_category_header}
```

### Page Footer
```
{ascii_page_footer}
```

---

## 7. Checklist de Qualidade

- [ ] Data-ink ratio > 80%
- [ ] Baseline alignment 100%
- [ ] Measure 45-75 chars
- [ ] 4+ niveis hierarquicos
- [ ] Consistencia entre paginas
- [ ] Aspas tipograficas
- [ ] Ritmo vertical verificado
- [ ] Escala tipografica harmonica
- [ ] Sem orfas/viuvas

---

*Spec gerado por squad-publisher | {DATE}*
