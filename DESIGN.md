---
name: "Legasint — La línea de expedición"
description: "Sistema visual dispatch de la home, servicios y ERP: hero inmersivo con línea 3D y retículas editoriales de expedición."
colors:
  paper: "#F5F7FA"
  heading: "#F5F7FA"
  ink: "#111831"
  surface: "#1B2540"
  surface-hover: "#253354"
  steel: "#DDE5F2"
  blue: "#2563EB"
  blue-light: "#60A5FA"
  blue-deep: "#1D4ED8"
  violet: "#7C3AED"
  violet-light: "#8B5CF6"
  violet-deep: "#6D28D9"
  cyan: "#22D3EE"
  indigo-light: "#818CF8"
  secondary-text: "#46536B"
  body: "#C3CBDD"
  dark-section-body: "#D5DEE2"
  process-body: "#DBEAFE"
  hero-mid: "#162044"
  hero-violet: "#241347"
  white: "#FFFFFF"
  success: "#146C43"
  success-light: "#86EFAC"
  error: "#A32121"
typography:
  display:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(3.75rem, 5.6vw, 5.4rem)"
    fontWeight: 600
    lineHeight: 0.94
    letterSpacing: "-0.025em"
  display-mobile:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(3.25rem, 13vw, 4.75rem)"
    fontWeight: 600
    lineHeight: 0.94
    letterSpacing: "-0.025em"
  section:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(3rem, 5.4vw, 4.75rem)"
    fontWeight: 600
    lineHeight: 0.94
    letterSpacing: "-0.025em"
  sector-title:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "42px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.02em"
  fit-title:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "34px"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "0em"
  diagnostic-title:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "46px"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.02em"
  service-title:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "40px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.02em"
  pricing-title:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "38px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.02em"
  module-title:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "28px"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "0em"
  service-body:
    fontFamily: "Barlow, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0em"
  service-small:
    fontFamily: "Barlow, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0em"
  service-label:
    fontFamily: "Barlow, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "0em"
  service-meta:
    fontFamily: "Barlow, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0em"
  service-step-label:
    fontFamily: "Barlow, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0em"
  title:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "30px"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.015em"
  lede:
    fontFamily: "Barlow, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0em"
  body:
    fontFamily: "Barlow, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0em"
  label:
    fontFamily: "Barlow, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0em"
rounded:
  sheet: "0px"
  control: "2px"
spacing:
  hero-desktop: "132px 48px 38px"
  hero-mobile: "104px 18px 28px"
  section-desktop: "96px 24px"
  section-mobile: "72px 18px"
---

# Design System: Legasint — La línea de expedición

## Overview

**Creative North Star: "La línea de expedición"**

La home final abre con una línea de expedición inmersiva: Excel, correo, WhatsApp, documentos y datos atraviesan una máquina Legasint y salen convertidos en trabajo ordenado. El hero es una escena oscura a todo viewport construida con React Three Fiber; conveyor, documentos y máquina explican la transformación real del producto. El texto y las acciones ocupan la izquierda, mientras la escena atraviesa el centro y la derecha con controles en el margen inferior.

Fuera del hero, la metáfora se vuelve editorial: retículas de albarán, líneas de registro, etiquetas, listas de definición y bloques corporativos. Las nuevas secciones responden qué puede mejorar cada sector, cuándo una herramienta estándar es suficiente y qué recibe la persona en el diagnóstico. La prueba sigue siendo contenido concreto y proyectos reales, sin métricas ni testimonios inventados.

La adaptación final extiende el mismo sistema a servicios y ERP con dos variantes explícitas de `ServiceHero`. Servicios presenta un catálogo interactivo de cuatro áreas, sin máquina ni conveyor; ERP muestra un núcleo con seis módulos radiales conectados, también sin conveyor. La home conserva su animación original de documentos. Navegación, detalles, prueba, CTA final, módulos ERP, proceso de cinco pasos, pricing y formularios comparten las retículas editoriales dispatch en español e inglés.

El blog adopta una variante editorial propia dentro de dispatch: índices y tags combinan hero oscuro con `circuit-dark`, filtros claros y cards; los artículos usan hero/meta/imagen, lectura en papel, TOC, share, prev/next y related. `BlogPostView` y `MDXContent` renderizan en servidor con `post.content`; las interacciones quedan aisladas en componentes client.

**Alcance y separación de sistemas**

| Alcance | Rutas / mecanismo | Sistema aplicable |
|---|---|---|
| Home | `/` y `/en`; `main.dispatch-home` | Línea de expedición y animación original de documentos |
| Servicios | `/servicios` y `/services`; `main.dispatch-home.services-page` | `ServiceHero variant="services"` con `ServicesHeroVisual`, navegación, detalle, prueba, proceso, FAQ, CTA final y formulario |
| ERP | `/erp-a-medida` y `/custom-erp`; `main.dispatch-home.erp-page` | `ServiceHero variant="erp"` con `ErpHeroVisual` + `ErpNetworkScene`, módulos, proceso de cinco pasos, pricing, FAQ y formulario |
| Blog editorial | `/blog`, `/blog/en`, índices de tags y artículos; `main.dispatch-home.blog-index-page` / `blog-article-page` | Hero oscuro con `circuit-dark`, filtros/cards editoriales y lectura en papel con TOC e interacciones |
| Chrome dispatch | `dispatch-header`, `dispatch-mobile-menu`, `dispatch-cookie`, activados en home, servicios, ERP y todo `/blog` | Variantes corporativas compartidas |
| Resto del sitio | Contacto, QR y demás rutas | Se conserva el sistema anterior basado en `brand-*`, tokens Tailwind y Montserrat |

`RootShell` carga Montserrat como base global y expone Barlow y Barlow Condensed como variables; solo el contexto `dispatch-*` adopta estas dos últimas. No se debe mover `dispatch-home` al layout ni reemplazar globalmente los tokens `brand-*`.

**Fuente de verdad y cascada.** Los bloques `dispatch-*` de `src/app/globals.css` contienen primero la base editorial y después los overrides finales. Desde `.dispatch-hero--machine` prevalecen el hero oscuro, la escena y el header oscuro; los bloques finales `services-page` / `erp-page`, `dispatch-service-*`, `dispatch-catalog`, `dispatch-erp-*`, `dispatch-blog-*` y `dispatch-article-*` definen servicios, ERP y blog.

**Key Characteristics:**
- Hero oscuro inmersivo con una línea 3D de documentos y máquina.
- Secuencia guiada de cuatro estados y ~4,9s, sin loops ambientales.
- Retículas de albarán y bloques corporativos fuera del hero.
- Adaptación dispatch compartida en home, servicios, ERP y blog editorial.
- Barlow Condensed para titulares; Barlow para lectura y controles.
- CTA con degradado azul/morado; proceso como banda independiente en variante profunda.
- Contenido por sector, criterio de encaje y entregables claros del diagnóstico.

## Colors

La home combina un hero oscuro y material con secciones claras de lectura. Azul y morado identifican acciones y estados; sus variantes claras mejoran la lectura sobre tinta. El cian es exclusivamente un detalle de la escena y sus anotaciones.

Servicios y ERP reutilizan los mismos tokens: `hero-mid` (#162044) para footer y estados compactos, `surface-hover` (#253354) para hover y material, `surface` (#1B2540) para navegación y controles, `blue-light` (#60A5FA) para enlaces/bordes sobre oscuro, `violet-light` (#8B5CF6) para acentos, `body` (#C3CBDD) para lectura oscura y `heading` (#F5F7FA) para titulares y texto principal. No se crean rampas paralelas para estas páginas.

### Primary

- **Azul corporativo** (`blue`): inicio del degradado de acción, rodillos del conveyor, pantalla de la máquina, checks y estados activos.
- **Morado corporativo** (`violet`): final del degradado, rodillos, marcas de registro y acentos editoriales.
- **Azul claro** (`blue-light`): texto de controles sobre superficie, foco perceptible, bordes, iconos, checks y luces de escena.
- **Morado claro** (`violet-light`): aristas de la máquina, entradas/salidas, sello visual y luz direccional.
- **Cian** (`cyan`): tercera entrada y detalles puntuales de la visualización; nunca color de párrafos ni CTA.
- **Índigo claro** (`indigo-light`): variación de una entrada en el proceso de expedientes dentro de la escena.

### Surfaces and text

- **Tinta** (`ink`): fondo inicial del hero, texto principal sobre papel y secciones oscuras editoriales.
- **Superficie** (`surface`): controles del hero, CTA secundario oscuro, fallback, nota de encaje e idioma activo.
- **Superficie hover** (`surface-hover`): hover de controles oscuros y material principal del conveyor y la máquina.
- **Heading** (`heading`): titulares y texto principal sobre fondos oscuros; comparte valor con papel por decisión corporativa.
- **Body** (`body`): descripción del hero, controles inactivos y lectura sobre superficies oscuras.
- **Papel** (`paper`): sectores, casos, FAQ, formulario, cookies y fondo editorial claro.
- **Texto secundario** (`secondary-text`): lectura secundaria sobre papel y acero.
- **Acero azulado** (`steel`): servicios y estados claros fuera del hero.
- **Cuerpo sobre tinta** (`dark-section-body`) y **cuerpo sobre proceso** (`process-body`): variantes de lectura ya asignadas a sus superficies concretas.
- **Blanco** (`white`): texto sobre los degradados de acción y proceso.

### Gradients and functional color

- **Fondo del hero:** `linear-gradient(135deg, #111831 0%, #162044 58%, #241347 100%)`; usa `hero-mid` y `hero-violet` para dar profundidad espacial.
- **Acción normal:** `linear-gradient(120deg, #2563EB, #7C3AED)`, con texto blanco.
- **Acción hover:** `linear-gradient(120deg, #1D4ED8, #6D28D9)`, con texto blanco.
- **Proceso:** banda independiente con `linear-gradient(120deg, #1D4ED8, #6D28D9)` y texto blanco. No es la misma superficie visual que el hero ni una extensión del CTA.
- **Verde funcional** (`success`) y **verde claro** (`success-light`): WhatsApp en contextos claros y oscuros, y mensajes de éxito.
- **Rojo funcional** (`error`): validación y alertas del formulario.

**The Corporate Palette Rule.** La home usa el sistema azul/morado corporativo y sus variantes claras sobre oscuro. El cian queda confinado a detalles de la escena; no se introducen nuevos degradados ni acentos decorativos ajenos.

## Typography

**Display Font:** Barlow Condensed, pesos 500–700, cargada como `--font-barlow-condensed`.
**Body Font:** Barlow, pesos 400–700, cargada como `--font-barlow`.
**Fallback:** `sans-serif`; ambas usan `display: swap` mediante `next/font/google`.

La condensada da escala de titular industrial y editorial; Barlow normal mantiene lectura y controles directos. El logotipo de home no usa mono ni sintaxis de código.

### Hierarchy

- **Hero desktop** (600, `clamp(3.75rem, 5.6vw, 5.4rem)`, 0.94, −0.025em): H1 sobre un máximo de 14ch, con `text-wrap: balance` y sombra de lectura discreta.
- **Hero móvil** (600, `clamp(3.25rem, 13vw, 4.75rem)`, 0.94): máximo de 12ch; el mensaje aparece antes de la escena.
- **Sección** (600, `clamp(3rem, 5.4vw, 4.75rem)`, 0.94, −0.025em): H2 principales; en móvil baja a `clamp(2.8rem, 11vw, 4rem)`.
- **Título de sector** (600, 42px, 1.0, −0.02em; 36px bajo 768px): nombres de Industria y logística / Despachos profesionales.
- **Título de encaje** (600, 34px, 1.05): comparación entre herramienta estándar y desarrollo a medida.
- **Título del aside de diagnóstico** (600, 46px, 0.98, −0.02em): “Lo que te llevas en 30 minutos”, máximo de 12ch y 16ch al apilarse.
- **Detalle de servicio** (600, 40px, 1.0, −0.02em): H2 de las retículas de `/servicios` y `/services`.
- **Pricing ERP** (600, 38px, 1.0, −0.02em): importes orientativos; **módulos ERP** (600, 28px, 1.05).
- **Texto funcional de servicios y ERP** (400–600, 17px para problema/formulario, 15px para descripciones y prueba, 13px para navegación, 12px para metadatos y 11px para guía compacta).
- **Título de caso** (600, 44px destacado y 38px rejilla, 1.0); **servicio** (600, 30px, 1.05); **problema / causa social** (600, 28px).
- **Número de proceso** (500, 56px, 1.0): secuencia real con cifras tabulares.
- **Lede de hero** (400, 18px, 1.55; 17px en móvil): máximo de 50ch. Otras introducciones de sección usan 18px, o 17px en móvil.
- **Cuerpo** (400, 16px, 1.5–1.55): lectura general; sectores usa 17px en introducción y títulos de ítem, y 15px en descripciones.
- **Controles y anotaciones** (600–700, 10–15px): tabs 14px, replay y texto de fase 12px, guía numerada 11px con números de 10px; tabs bajan a 12px, footer a 11px y guía/anotaciones a 10px en móvil.

**The Two Voices Rule.** Barlow Condensed pertenece a titulares y números de proceso; Barlow pertenece a lectura, navegación, anotaciones y controles. Montserrat no se introduce dentro de `dispatch-home`.

## Layout

### Contenedores y ritmo

| Elemento | Medida implementada |
|---|---|
| Hero desktop | `min-height: 100svh`; padding 132/48/38px; contenido distribuido entre parte superior e inferior |
| Copy del hero | Máximo 760px; H1 de 14ch; descripción de 50ch |
| Acciones del hero | Izquierda inferior; `width: min(610px, 48%)` |
| Escena desktop | Absoluta a todo el hero; viewport 3D desde 24% hacia la derecha |
| Controles de escena | Derecha inferior; `width: min(550px, 43vw)` |
| Contenido de secciones | `max-width: 1240px`, centrado; 96/24px en desktop y 72/18px en móvil |
| Diagnóstico | `max-width: 1240px`; aside/formulario `0.7fr / 1.3fr`, gap 48px |
| FAQ dividida / header | `max-w-6xl` |

### Composición y orden final

1. **Hero inmersivo.** Fondo corporativo degradado, H1 y descripción arriba a la izquierda, CTA y WhatsApp abajo a la izquierda. La escena R3F ocupa el espacio central/derecho; selector de proceso, guía de cuatro pasos, progreso y una única línea compacta de estado + replay se sitúan abajo a la derecha.
2. **Problemas.** Superficie de tinta y tres registros sin tarjetas, con marcas de registro violetas.
3. **Sectores.** Papel y dos artículos a dos columnas, gap 56px. Cada sector combina introducción y tres flujos con flechas; el segundo artículo se diferencia por borde e iconos morados.
4. **Casos.** Un caso destacado a dos columnas y los demás en rejilla de dos, con imágenes reales y listas de definición.
5. **Servicios.** Acero y filas enlazadas icono / título y CTA / descripción y ejemplos.
6. **Encaje.** Tinta y comparación a dos columnas entre herramienta estándar y desarrollo a medida; la nota final usa superficie y borde azul claro.
7. **Proceso.** Banda propia de degradado profundo con cuatro pasos en columnas.
8. **FAQ.** Papel, encabezado y acordeón en composición dividida desde `lg`.
9. **Diagnóstico.** Aside con tres entregables y WhatsApp junto al formulario de papel. El orden de lectura coloca primero el valor de la llamada y después el formulario.
10. **Compromiso social.** Cierre sobre papel con tres registros de iconos y texto.

### Retículas de servicios y ERP

- **ServiceHero compartido.** Las cuatro páginas conservan H1, descripción, dos acciones, microcopy y altura `min(860px, 100svh)`. La prop `variant` añade una clase `dispatch-service-hero--services` o `--erp` y selecciona el visual; no reutiliza la máquina de la home.
- **Catálogo de servicios.** En desktop ocupa `min(610px, 44vw)` arriba a la derecha, con tabs de 195px y detalle sobre `surface`. En móvil pasa a flujo, margen 26/−18px, tabs en dos columnas y detalle apilado.
- **Red radial ERP.** El Canvas ocupa el área central/derecha y la lista accesible de seis módulos forma tres columnas abajo a la derecha. En móvil la red tiene 500px de alto, viewport con 145px reservados y lista a 14px de los bordes.
- **Navegación de servicios.** Barra de `surface` con cuatro anclas —software, integraciones, automatización/IA y CTO—, padding 24px y enlaces de 42px/13px con borde azul claro y hover `surface-hover`.
- **Detalle editorial.** `services-page` presenta cuatro artículos en dos columnas, gap 52/44px, línea superior de tinta o morado, H2 de 40px, features, entregable, proyecto relacionado y acción. La prueba usa tinta, dos proyectos reales en dos columnas y texto de 15px.
- **Proceso, FAQ y CTA final de servicios.** Se reutilizan el proceso de cuatro pasos y la FAQ dividida. El CTA final ocupa una banda azul/morado normal con H2 `clamp(3rem, 5vw, 4.75rem)`, texto `process-body` y botón de tinta cuyo hover pasa a `surface`; el formulario conserva aside, WhatsApp, email y `ContactForm` de diagnóstico.
- **Problema y módulos ERP.** El problema se divide en dos columnas con texto de 17px. Seis módulos forman tres columnas con bordes azul/morado y H3 de 28px.
- **Proceso ERP de cinco pasos.** La banda profunda usa cinco columnas: Análisis, Propuesta, Desarrollo, Implantación y Evolución.
- **Pricing y formulario ERP.** Tres niveles en columnas, importes de 38px y descripciones de 14px. Tras FAQ dividida, el formulario combina aside de 46px y subtítulo de 17px con `ContactForm` default bajo `#presupuesto` o `#quote`.

### Blog editorial

- **Índices y tags.** `blog-index-page` abre con hero oscuro de 128/24/68px, H1 condensado y `circuit-dark`. La zona de filtros vuelve a papel: búsqueda de 48px, tags con `aria-pressed`, contador y estado vacío. Las cards se ordenan en tres columnas; la primera sin filtros es destacada a dos columnas con H2 de 42px. Hay seis entradas por página y carga incremental.
- **Artículos.** `blog-article-page` combina breadcrumbs, tags, H1, descripción, autor/fecha/lectura e imagen 21:9. La lectura se apoya en papel #F5F7FA: contenido de máximo 760px y 72ch, Barlow a 18px/1.75 y TOC lateral de 240px. El área útil separa contenido y sidebar con 64px de gap.
- **Cierre editorial.** TOC inline/sidebar, share/copy, navegación anterior/siguiente en dos columnas, related en tres y enlace de retorno al blog. La imagen principal y las cards comparten `BlogImage` con fallback a `/og-image.png` en `onError`.

### Escena 3D y cámara responsive

- Canvas ortográfico con cámara inicial en `[7, 5, 8]`, near 0.1 y far 100.
- Zoom 38 cuando el viewport mide menos de 600px, 54 entre 600–899px y 72 desde 900px. El Canvas se carga solo en cliente, sin SSR.
- DPR limitado a `[1, 1.5]`, antialias, alpha y `powerPreference: high-performance`.
- El viewport 3D permite gesto vertical de página con `touch-action: pan-y`; la escena es decorativa para tecnologías de asistencia.

### Responsive

| Umbral | Transformación |
|---|---|
| `≤1100px` | Copy máximo 620px; acciones `min(540px, 50%)`; controles `min(500px, 45vw)`; viewport 3D desde 16%; anotaciones recolocadas. El TOC de artículo pasa de sidebar sticky a variante inline. |
| `≤900px` | Encabezados editoriales y caso destacado se apilan; proceso a dos columnas; diagnóstico a una columna con gap 40px. La cámara usa zoom 54 por debajo de este ancho. |
| `≤1000px` | Módulos ERP pasan a dos columnas y el proceso ERP de cinco pasos a tres; la rejilla del blog pasa a dos columnas. |
| `<768px` | Hero de altura automática y padding 104/18/28px; copy y CTA preceden a la escena. Escena relativa de 520px de alto para acomodar la guía y el footer compacto, sin shade; controles a 14px de los bordes y fases en columna de 50px/10px. Sectores y encaje pasan a una columna con gap 42px; sectores usa títulos de 36px. Detalle, prueba, problema ERP, módulos y pricing pasan a una columna; CTA final usa 56/18px y botón a ancho completo. Blog/cards destacadas, prev/next y related pasan a una columna; lectura a 17px e imagen de artículo a 16:10. |
| `<600px` | Cámara ortográfica con zoom 38 para conservar la línea completa en cuadro. |
| `≤480px` | Se mantienen los ajustes compactos editoriales; CTA a ancho completo, detalles de caso y proceso apilados; el proceso ERP de cinco pasos pasa a una columna. |

Puntos de comprobación: 390×844, 1366×768, 1440×900 y 1920×1080. EN puede necesitar más altura: se permite flujo vertical, nunca recorte de texto, solapamiento de controles ni overflow horizontal.

**The Narrative Sequence Rule.** La escena demuestra primero la transformación; las secciones siguientes responden reconocimiento, prueba, encaje, proceso y conversión en ese orden. No se reordena el diagnóstico antes de explicar qué recibe la persona.

## Elevation & Depth

El hero tiene profundidad real: geometría ortográfica, materiales metálicos y rugosos, aristas, iluminación azul/morada y una sombra de contacto calculada una sola vez. Una máscara lateral oscura protege la lectura sin convertir la escena en fondo ambiental. Fuera del hero se vuelve a profundidad plana mediante tono y líneas.

### Shadow Vocabulary

- **Sombra de contacto 3D:** opacidad 0.5, escala 13, blur 2.2, far 6, resolución 256 y `frames={1}`, color `#050816`; ancla la máquina sin animación ambiental.
- **Sombra de controles del hero** (`0 24px 60px -30px rgb(2 6 23 / 85%)`): separa el panel interactivo de la escena.
- **Sombra de anotaciones** (`0 12px 30px -18px rgb(2 6 23 / 90%)`): mantiene etiquetas flotantes legibles.
- **Sombra tipográfica del H1** (`0 12px 42px rgb(5 8 22 / 35%)`): protege el titular sobre la escena, sin glow de color.
- **Sombra de consentimiento** (`0 20px 50px -24px rgb(16 24 32 / 55%)`): elevación funcional del banner de cookies.

### Texturas estáticas

Las tres texturas de `public/textures/` derivan de los recursos preexistentes `public/bg.svg`, `public/circuit.svg` y `public/network.svg`, conservan sus trazas blancas y se limitan a los héroes oscuros. No contienen etiquetas `animate` ni estilos de animación y no generan nuevas formas de marca. Cada SVG tiene su sidecar de procedencia `.svg.json`.

| Superficie | Textura |
|---|---|
| Hero de home | `bg-dark.svg` |
| Héroes de servicios y de índices/tags/artículos del blog | `circuit-dark.svg` |
| Hero de ERP | `network-dark.svg` |

En el hero, un pseudo-elemento independiente cubre la superficie con `mix-blend-mode: screen`, opacidad 0.18 en desktop y 0.13 en móvil, posición central y desplazamiento a 58% en móvil. Es decorativo, no captura puntero y no participa en la animación 3D. El override final establece `background-image: none` en `.dispatch-sectors`, `.dispatch-services-detail`, `.dispatch-pricing` y `.dispatch-erp-problem`: las secciones editoriales claras no llevan textura.

Los héroes de índices, tags y artículos del blog componen `circuit-dark` bajo un degradado de tinta y violeta, sin extender la textura a filtros, cards ni lectura en papel.

**The Purposeful Depth Rule.** La profundidad 3D pertenece al mecanismo del hero y las sombras a la legibilidad o elevación funcional. Las secciones editoriales no adoptan tilt, parallax ni tarjetas flotantes por imitación.

## Shapes

Dentro de la escena, los mismos tres documentos son bloques finos con bordes suaves durante toda la secuencia; cambian posición, escala, orientación y apilado al atravesar la máquina. La máquina es un volumen redondeado de `surface-hover`, aristas moradas, pantalla azul emisiva y tapa morada. El conveyor tiene una base rectangular y nueve rodillos que alternan azul y morado. Los documentos conservan lectura de piezas físicas, no iconos flotantes abstractos ni grupos independientes de entrada y salida.

Fuera de la escena, la silueta sigue siendo rectangular y afilada: hojas, imágenes, registros y etiquetas usan esquinas rectas; botones, inputs, formulario y cookies usan radio de 2px. Las anotaciones son etiquetas rectangulares oscuras con puntos de 7px azul, morado o cian. La salida usa etiqueta con degradado y check.

## Components

### Buttons

- **Primario:** altura mínima de 52px en hero y formulario, borde de tinta, radio de 2px, degradado normal y texto blanco; hover con degradado profundo.
- **Secundario de hero:** fondo `surface`, texto `heading` y borde azul claro al 55%; hover `surface-hover`. Mantiene la misma altura mínima y no finge el fondo transparente de la variante editorial clara.
- **Selector de proceso:** tres botones de al menos 50px sobre `surface`; activo con degradado normal y texto blanco, hover con `surface-hover`.
- **Guía de fases:** cuatro botones en columnas, mínimo 54px y texto de 11px con número tabular de 10px. El estado `aria-current="step"` usa `surface-hover`, texto blanco, subrayado interior morado y número cian. En móvil, número y etiqueta se apilan en 50px.
- **Progreso:** barra decorativa de 3px con relleno azul/morado a 90° y transición de 400ms.
- **Estado + replay:** un único footer compacto de 44px, `space-between`, fondo `hero-mid` y borde superior azul claro. El texto de fase usa 12px y `process-body`; replay comparte la misma línea con ancho automático, mínimo 36px y 12px, sin borde superior propio. En móvil ambos usan 11px. Replay solo existe si `getGpuTier()` no devuelve `off`; no hay segunda fila de estado ni meta de proyecto.
- **Enlaces de texto / WhatsApp:** azul claro sobre superficies oscuras, azul profundo sobre papel y verde funcional según contexto; objetivos mínimos de 44px cuando son acciones independientes.

### Header y navegación

En la home, el header final es oscuro: tinta al 94%, borde `surface`, texto `heading` y subrayado activo azul claro. El idioma activo usa `surface`. El menú móvil también usa tinta, texto claro y divisiones de `body` al 22%. Mantiene CTA, navegación por teclado, foco inicial, contención de Tab, Escape y restauración de foco.

En todas las páginas, el enlace de inicio combina `public/legasint-logo.png` con el nombre visible Legasint; ya no usa el cuadrado morado genérico. La imagen se renderiza a 36×34px con `alt=""` y `aria-hidden="true"` porque es decorativa y el texto aporta el nombre accesible. El PNG es un recorte de 448×424px del JPEG corporativo de 1024×1024px confirmado por el usuario en `/Users/artuleg/Documents/Empresa/LegaSint/[LS] Docs/Docs/logo.jpeg`, con fondo gris eliminado y bordes suavizados. Su nueva máscara alfa elimina el halo blanco de 1px mediante umbral de distancia al fondo, erosión mínima de 1px y eliminación de componentes aislados menores de 30px, sin alterar forma ni colores. La procedencia está embebida en un chunk PNG `tEXt` (`impeccable:prompt`).

### Favicons, manifest y Open Graph

Los favicons se regeneraron desde el mismo isotipo corporativo sobre fondo claro #F5F7FA. La serie incluye `favicon-16x16.png`, `favicon-32x32.png`, `favicon-48x48.png`, `favicon/apple-touch-icon.png` (180×180), `favicon/android-chrome-192x192.png`, `favicon/android-chrome-512x512.png` y `public/favicon.ico`. Los manifests `src/app/manifest.json` y `public/site.webmanifest` referencian los iconos Android de 192 y 512px.

Open Graph usa dos composiciones de 1200×630px con isotipo real, gradiente corporativo azul/morado y patrón de circuito. ES y EN fueron regeneradas con la misma máscara alfa limpia del logo, sin halo blanco:

- **ES — `public/og-image.png`:** “Software a medida y automatización para pymes”, con CTA “Diagnóstico gratuito de 30 minutos” y `legasint.com`.
- **EN — `public/og-image-en.png`:** “Custom software & automation for SMEs”, con CTA “Free 30-minute assessment” y `legasint.com`.

Los PNG conservan la procedencia en `tEXt` (`impeccable:prompt`): isotipo proporcionado por el usuario, favicons escalados con LANCZOS y composiciones OG con copy comercial real, sin contenido generado por IA. `public/favicon.ico` dispone además de `public/favicon.ico.json`.

### HeroMachineScene

La escena React Three Fiber contiene:

1. Conveyor de `surface-hover` con nueve rodillos azul/morado.
2. Un único grupo `documents` con los mismos tres bloques durante 01–04, con colores corporativos y cian/índigo solo como detalles. No existen grupos separados de entrada y salida: el grupo cambia de posición y escala, y cada documento ajusta altura, profundidad, rotación y apilado.
3. Máquina central de `surface-hover`, aristas `violet-light`, pantalla `blue` emisiva y tres barras de lectura.
4. Iluminación ambiental y direccional corporativa, luz puntual azul y sombra de contacto estática.

La escena se importa dinámicamente sin SSR y solo cuando existe WebGL y no hay movimiento reducido. `frameloop` cambia de `always` a `demand` fuera del viewport, detectado con margen de 160px. El puntero produce parallax limitado en la rotación del grupo; no existe rotación o desplazamiento ambiental permanente.

### HeroProcessVisual, estados, controles y fallback

El selector permite alternar Pedidos, Expedientes e Integraciones y reinicia la secuencia desde 01. La guía numerada ofrece cuatro estados seleccionables: **01 Trabajo disperso**, **02 Fuentes conectadas**, **03 Proceso organizado** y **04 Sistema en marcha**. Cada botón usa `aria-current="step"` en el estado activo; elegir un paso manualmente detiene el avance automático. Una barra de progreso de 3px representa `step / 3` y transiciona su anchura durante 400ms. Después aparece una sola línea compacta de estado + replay; no hay fila de estado duplicada ni meta “Pedido confirmado / Cronos”.

La secuencia automática dura aproximadamente 4,9s: 1500ms en 01 y 1700ms en cada transición posterior hasta 04, donde se detiene. Replay comparte el footer con el texto de fase, restaura 01 y reactiva el autoplay solo con WebGL activo.

Las anotaciones visuales identifican las tres fuentes y evolucionan con la fase: “Organizando…” en 03 y el primer resultado en 04; las fuentes se ocultan al completar. Son `aria-hidden` para no duplicar información. Un `role="status"` solo para lectores de pantalla expresa fase, proceso, fuentes y resultados completos. El `figure` tiene etiqueta y `figcaption` accesible; Canvas, viewport, progreso y anotaciones no compiten con los controles en el árbol de accesibilidad.

Si WebGL no está disponible, falla o `prefers-reduced-motion` está activo, `getGpuTier()` devuelve `off`, se selecciona 04 y se desactiva el autoplay. El fallback conserva la guía y los mismos cuatro estados estáticos: entradas dispersas, convergencia, procesado parcial y sistema completo. No monta Canvas ni muestra replay. El mismo fallback representa el estado en curso mientras carga la escena y, en móvil, reorganiza entradas/salidas en filas envolventes.

### ServiceHero y páginas de servicio

`ServiceHero` comparte copy y acciones, pero exige `variant="services"` o `variant="erp"`. Renderiza `ServicesHeroVisual` en el primer caso y `ErpHeroVisual` en el segundo; no utiliza `HeroProcessVisual`, máquina ni conveyor.

**ServicesHeroVisual.** Catálogo interactivo de cuatro áreas con botones numerados en `role="group"`, estado `aria-pressed`, detalle con H2 de 38px, descripción de 15px, features de 13px y enlace a cada ancla de servicio. Todo el contenido es HTML accesible y no necesita WebGL ni fallback de Canvas. El detalle entra con opacidad y desplazamiento de 300ms al cambiar de área; movimiento reducido elimina esa animación.

**ErpHeroVisual + ErpNetworkScene.** Red con núcleo ERP de `surface-hover`, pantalla azul, seis nodos radiales azul/morado/cian y conexiones cilíndricas al centro. La animación de despliegue dura 2,2s: los nodos salen del núcleo, alcanzan su posición radial y escalan de 0.35 a 1 con easing de cuarto orden. Cámara ortográfica con zoom 42 bajo 600px y 60 desde ese ancho, DPR 1–1.5, parallax limitado y pausa por demanda fuera de viewport.

El Canvas ERP se carga dinámicamente sin SSR y es `aria-hidden`. La lista visible de seis módulos, numerada y traducida, permanece disponible con o sin escena. Mientras carga, o si `getGpuTier()` devuelve `off` por movimiento reducido o ausencia de WebGL, se muestra un núcleo ERP estático junto a esa lista; no se pierden módulos ni relaciones semánticas.

`ServicesPageContent` usa `main.dispatch-home.services-page` y estructura navegación por anclas, artículos de detalle, prueba real, proceso, FAQ, CTA final y formulario. `ErpPageContent` usa `main.dispatch-home.erp-page` y organiza problema, seis módulos, proceso de cinco pasos, tres niveles de pricing, FAQ y formulario. Los formularios conservan etiquetas, validación y conversiones existentes; en servicios el aside añade contacto directo por WhatsApp y email.

### Componentes del blog

- **BlogList y BlogCard.** `BlogList` es client y gestiona búsqueda, tag activo, contador, limpieza, seis posts por página y estado vacío. `BlogCard` mantiene variantes `default`, `featured` y `compact`, con borde editorial, meta, título condensado, descripción, tags y enlace. `BlogImage` es client y cambia a `/og-image.png` cuando falla el recurso original, conservando `alt`, `fill` y `priority` cuando corresponde.
- **BlogPostView y MDXContent.** Son server components. Las páginas de artículo extraen TOC de `post.content` y pasan ese mismo contenido a `MDXContent`, que usa `next-mdx-remote/rsc` con componentes MDX propios. La estructura server incluye hero/meta/imagen, artículo, TOC, share, prev/next, related y footer; no se convierte toda la lectura en una aplicación client.
- **TableOfContents.** Client, con sidebar sticky y variante inline plegable. Se muestra a partir de tres encabezados, sigue la sección visible con `IntersectionObserver` y marca `aria-current="location"`; el botón inline expone `aria-expanded`.
- **BlogPostInteractions.** Client, calcula progreso de lectura sobre `#article-content`, abre compartidos X/LinkedIn/Facebook y copia la URL actual con confirmación de dos segundos. La barra `reading-progress` es visual y no altera el contenido server.

### Sectores y encaje

- **SectorUseCasesSection:** `section#sectores`, dos artículos con H3 de 42/36px y tres ítems por sector. Cada ítem usa flecha, H4 de 17px y descripción de 15px. Industria/logística enfatiza azul; despachos, morado.
- **FitSection:** comparación oscura con H3 de 34px. La columna estándar es texto deliberadamente neutro; la columna a medida incorpora checks azul claro. La nota final declara que se recomendará una solución existente cuando sea suficiente.

### Casos, servicios, proceso y FAQ

Los casos conservan `article`, imágenes reales, etiquetas y `dl` para reto/solución/resultado. Servicios mantiene filas enlazadas con icono, CTA y ejemplos. Proceso es una lista ordenada de cuatro pasos sobre su propia banda profunda. FAQ conserva primer elemento abierto, `aria-expanded`, `aria-controls`, regiones etiquetadas y apertura de 200ms, o 0ms con movimiento reducido.

### Diagnóstico, formulario y cookies

`DiagnosticAside` aporta un H2 de 46px, tres entregables con checks y un enlace directo de WhatsApp. Su evento usa `home_diagnostic_aside`. A `≤900px` se apila antes del formulario.

El formulario reutiliza `ContactForm` en variante `diagnostic`: superficie de papel, campos blancos, etiquetas visibles, `autoComplete`, `aria-invalid`, `aria-describedby`, foco al primer error, spinner, `aria-busy` y estados anunciados. Cookies mantiene su diálogo de papel, acciones Aceptar/Rechazar y `safe-area-inset-bottom`.

### Motion

- **Cuatro estados explícitos:** 01 Trabajo disperso, 02 Fuentes conectadas, 03 Proceso organizado y 04 Sistema en marcha. La guía numerada y el texto de fase mantienen visible el estado; `aria-current="step"` lo comunica programáticamente.
- **Avance automático:** aproximadamente 4,9s en total —1500ms + 1700ms + 1700ms— y parada en 04. La selección de proceso reinicia desde 01; la selección manual de fase detiene el autoplay; replay vuelve a 01 y lo reanuda.
- **Interpolación de escena:** un único grupo conserva los mismos tres documentos. Su posición X sigue 3.8 / 1.75 / 0.55 / −3.3 y su escala 1 / 1 / 0.45 / 1; posición, escala, rotaciones y apilado se interpolan con `THREE.MathUtils.damp` (3.8 para el desplazamiento del grupo y 4.5 para escala y documentos). La pantalla pasa por intensidades 0.16 / 0.35 / 0.9 / 0.48; en 03 las barras oscilan como indicador de procesado y en 04 quedan completas.
- **Entrada del hero (CSS puro):** header cae desde −10px (0.6s, delay 0.05s) y el copy/acciones/escena suben desde 26px —H1 0.85s en 0.15s, descripción 0.30s, acciones 0.45s, máquina 1.0s en 0.55s— con `cubic-bezier(0.22,1,0.36,1)` y `backwards`. Funciona sin JS y el bloque `prefers-reduced-motion` del CSS la anula con estado final visible.
- **Reveals de secciones (framer-motion):** `Reveal` y las primitivas `StaggerGroup`/`StaggerItem` de `landing/motion.tsx` usan `whileInView` con `once:true` y margen −64px; easing `cubic-bezier(0.22,1,0.36,1)`; bloque 0.7s/28px e ítems 0.6s/24px con `staggerChildren` 0.09–0.14s. Todo está gateado por hidratación y `prefers-reduced-motion`: sin JS o con movimiento reducido el contenido se renderiza estático y visible.
- **Scroll suave:** Lenis (`SmoothScroll` en `RootShell`, lerp 0.1) en todo el sitio; desmontado con movimiento reducido. Los anchors conservan su `scroll-mt`.
- **Progreso y anotaciones:** la barra de la escena avanza 0 / 33 / 67 / 100% con transición de 400ms. Las anotaciones cambian de fuentes a “Organizando…” y después al primer resultado, con transiciones de 300ms.
- **Sin loops ambientales:** la transformación termina en 04 y no se repite automáticamente. La oscilación de barras pertenece únicamente al estado de procesado; el render activo permite responder al puntero, no un ciclo de contenido infinito.
- **Parallax limitado:** rotación Y `-0.32 + pointer.x × 0.12` y X `-0.08 - pointer.y × 0.045`, interpoladas suavemente.
- **Pausa fuera de viewport:** `useInView` con margen 160px controla el temporizador, `active` y el `frameloop`; fuera de pantalla se detiene el avance automático y se renderiza por demanda.
- **Movimiento reducido / sin WebGL:** no se monta el Canvas ni aparece replay. El fallback ofrece manualmente los mismos cuatro estados estáticos y arranca en 04 cuando `getGpuTier()` devuelve `off`.
- **Separación por variante:** la home conserva íntegra la secuencia anterior de 4,9s. Servicios no tiene autoplay ni Canvas: solo recompone el detalle del catálogo durante 300ms tras una selección y desactiva esa entrada con movimiento reducido. ERP despliega su red una vez durante 2,2s, pausa fuera de viewport y ofrece núcleo + lista estáticos con movimiento reducido o sin WebGL.
- **Texturas sin motion:** `bg-dark`, `circuit-dark` y `network-dark` son capas SVG estáticas limitadas a los héroes oscuros. No contienen `animate`, `animateTransform`, keyframes ni estilos de animación y no añaden loops ambientales.
- **Blog:** el progreso responde al scroll real del artículo y el TOC a los encabezados visibles; no son loops ambientales. Compartir requiere acción explícita y la confirmación de copiado dura 2s.
- **Controles y UI:** color/fondo 160–180ms; progreso 400ms; fallback 350ms; FAQ 200ms; menú 200/150ms; cookies 400ms. `MotionConfig reducedMotion="user"` y las reglas CSS siguen protegiendo la interfaz.

### Accessibility

- Contraste objetivo WCAG AA: 4.5:1 para texto normal y 3:1 para texto grande, iconos y límites de controles. Sobre oscuro se usa `body` o `blue-light`, no `secondary-text`.
- La escena, la barra de progreso y las anotaciones son `aria-hidden`; toda su narrativa tiene equivalente textual en el texto de fase, el `role="status"` y el `figcaption`. Los puntos de color nunca son el único modo de identificar entradas o resultados.
- Selector, fases y replay son botones reales con foco visible. El selector de proceso expone `aria-pressed`; la guía numerada usa `aria-current="step"`. El replay no se ofrece cuando no existe animación.
- El catálogo de servicios usa botones nativos con `aria-pressed` y enlaces reales a cada servicio; detalle, features y destino permanecen en HTML. En ERP, el Canvas es decorativo y la lista `aria-label` de seis módulos conserva nombres, orden y numeración en todos los estados, incluido el fallback.
- En blog, búsqueda y limpieza tienen etiquetas, los filtros usan `aria-pressed`, cards y navegación son enlaces, el TOC comunica `aria-current="location"` y `aria-expanded`, y los botones de share/copy tienen nombres accesibles. Las imágenes conservan su `alt` incluso al usar el fallback `/og-image.png`.
- Un H1 visible por página; secciones con `aria-labelledby`; estructura de listas, artículos, `dl`, `figure` y `aside` según significado.
- Objetivos táctiles de 44–54px; FAQ de al menos 64px. El Canvas permite `pan-y` y no bloquea el scroll ni el zoom.
- Teclado completo en navegación, selector de proceso, guía de fases, replay, FAQ y formulario. Menú móvil con foco gestionado y Escape.
- El contenido esencial no depende de WebGL, JavaScript de la escena ni animación para comprenderse.

### Contenido e i18n

- `src/i18n/home-copy.ts` contiene el contenido principal ES/EN y las nuevas colecciones `sectors`, `fit` y `diagnostic`. `HeroProcessVisual` mantiene `processCopy` bilingüe para selector, cuatro fases, texto de estado, fuentes, resultados y replay.
- Los layouts establecen `html lang="es"` y `html lang="en"`, metadatos, canonical y alternates. Los enlaces de idioma conservan la home, servicios o ERP equivalente: `/servicios` ↔ `/services` y `/erp-a-medida` ↔ `/custom-erp`. En blog se preservan índice, tag o slug alternativo disponible entre `/blog` y `/blog/en`.
- `CookieConsent` detecta inglés cuando `pathname` empieza por `/en` o `/blog/en`, y también en `/services` y `/custom-erp`; usa español en el resto. La variante `dispatch-cookie` se activa en las seis rutas de home/servicios/ERP y en todo `/blog`.
- Las anclas incluyen `#diagnostico`, `#casos`, `#sectores` y `#faq` en ambos idiomas. Servicios enlaza a `/servicios` o `/services` con los ids `software`, `apis`, `ia` y `consultoria`; ERP usa `#presupuesto` y `#quote`.
- La oferta se mantiene como “Diagnóstico gratuito de 30 minutos” / “Free 30-minute assessment”. El aside explica entregables concretos sin prometer resultados comerciales no verificados.
- La prueba visual sigue siendo procesos descritos y proyectos reales. No se añaden cifras de impacto, testimonios, clientes, precios o plazos no verificados.

### Analítica

El rediseño no altera la taxonomía ni el momento de conversión. `trackEvent` envía a GA4 y PostHog; los clics de contacto, selección de proceso y replay no son leads.

| Evento | Uso en home |
|---|---|
| `contact_click` | CTA de diagnóstico del hero (`home_hero_diagnostic`) y header (`header_desktop` / `header_mobile`) |
| `case_study_click` | CTA secundario del hero (`home_hero_cases`) y acceso a proyectos; el panel de escena ya no contiene enlace a Cronos |
| `service_click` | Filas de servicio, con `home_<id>` |
| `whatsapp_click` | WhatsApp del hero (`home_hero`) y aside (`home_diagnostic_aside`) |
| `form_start` | Primer cambio real del formulario, una vez por montaje, en `home_es_form` / `home_en_form` |
| `generate_lead` | Solo después de `data.success` de Web3Forms |
| `conversion` de Google Ads | Solo después del mismo envío correcto, con `AW-18414116550` |
| `linkedin_click` / `instagram_click` | Accesos sociales flotantes |

En QA se bloquea analítica y se simula Web3Forms; la conversión se comprueba en `dataLayer` sin enviar leads reales.

### Code map

| Responsabilidad | Archivo |
|---|---|
| Composición ES / EN, orden de secciones y alcance | `src/app/(es)/page.tsx`, `src/app/(en)/en/page.tsx` |
| Hero oscuro, layout, responsive, servicios, ERP, blog y overrides finales | `src/app/globals.css`, desde `.dispatch-hero--machine` y los bloques finales `dispatch-service-*`, `dispatch-catalog`, `dispatch-erp-*`, `dispatch-blog-*` y `dispatch-article-*` |
| Texturas oscuras y sidecars de procedencia | `public/textures/bg-dark.svg`, `circuit-dark.svg`, `network-dark.svg` y sus `.svg.json`; derivadas de `public/bg.svg`, `public/circuit.svg`, `public/network.svg` |
| Carga de fuentes, MotionConfig y shell compartido | `src/components/RootShell.tsx` |
| Sistema anterior fuera de alcance | `tailwind.config.ts`, recetas `brand-*` de `src/app/globals.css` |
| Copy, acciones y estructura del hero | `src/components/landing/AnimatedLanding.tsx` |
| Estado de proceso, cuatro fases, autoplay, guía, progreso, replay, fallback y texto accesible | `src/components/landing/HeroProcessVisual.tsx` |
| Canvas R3F, geometría, cámara, interpolación entre fases y pausa | `src/components/landing/HeroMachineScene.tsx` |
| Hero compartido y selección `variant="services" / "erp"` | `src/components/landing/ServiceHero.tsx` |
| Catálogo interactivo de cuatro áreas | `src/components/landing/ServicesHeroVisual.tsx` |
| Carga, viewport, lista accesible y fallback ERP | `src/components/landing/ErpHeroVisual.tsx` |
| Núcleo, seis nodos radiales, despliegue y cámara ERP | `src/components/landing/ErpNetworkScene.tsx` |
| Composición completa de servicios | `src/components/services/ServicesPageContent.tsx`; rutas `src/app/(es)/servicios/page.tsx`, `src/app/(en)/services/page.tsx` |
| Composición completa de ERP | `src/components/erp/ErpPageContent.tsx`; rutas `src/app/(es)/erp-a-medida/page.tsx`, `src/app/(en)/custom-erp/page.tsx` |
| Índices y tags del blog | `src/components/blog/BlogList.tsx`, `BlogCard.tsx`; rutas `src/app/(es)/blog/page.tsx`, `(en)/blog/en/page.tsx` y `blog/**/tag/[tag]/page.tsx` |
| Imágenes y fallback editorial | `src/components/blog/BlogImage.tsx` → `/og-image.png` en `onError` |
| Artículo y MDX en servidor | `src/components/blog/BlogPostView.tsx`, `MDXContent.tsx`; rutas `src/app/(es)/blog/[slug]/page.tsx`, `(en)/blog/en/[slug]/page.tsx` |
| Progreso, share/copy y TOC | `src/components/blog/BlogPostInteractions.tsx`, `TableOfContents.tsx` |
| Datos, TOC y componentes MDX | `src/lib/blog.ts`, `src/components/mdx/` |
| Detección de movimiento reducido, WebGL y capacidad del dispositivo | `src/lib/device.ts` (`getGpuTier`) |
| Reveals de secciones y stagger editorial gateados | `src/components/landing/Reveal.tsx`, `src/components/landing/motion.tsx` (`StaggerGroup`/`StaggerItem`/`useMotionEnabled`), presets en `src/lib/animations.ts` (`dispatchEase`, `dispatchViewport`, `dispatchReveal`, `dispatchStagger`, `dispatchStaggerItem`), gate de hidratación en `src/lib/device.ts` (`useHydrated`) |
| Scroll suave site-wide | `src/components/landing/SmoothScroll.tsx` montado en `src/components/RootShell.tsx` |
| Problemas | `src/components/landing/ProblemsSection.tsx` |
| Sectores y casos de uso | `src/components/landing/SectorUseCasesSection.tsx` |
| Casos reales | `src/components/landing/PortfolioSection.tsx` |
| Servicios | `src/components/landing/ServicesSection.tsx` |
| Encaje estándar / a medida | `src/components/landing/FitSection.tsx` |
| Proceso | `src/components/landing/ProcessSection.tsx` |
| FAQ | `src/components/landing/FaqSection.tsx` |
| Entregables del diagnóstico y WhatsApp | `src/components/landing/DiagnosticAside.tsx` |
| Compromiso social | `src/components/landing/SocialSection.tsx` |
| Formulario, validación y conversión | `src/components/ContactForm.tsx` |
| Header, menú e idioma | `src/components/Header.tsx` |
| Logo global y procedencia embebida | `public/legasint-logo.png`; origen `/Users/artuleg/Documents/Empresa/LegaSint/[LS] Docs/Docs/logo.jpeg` |
| Favicons y manifests | `public/favicon-*.png`, `public/favicon/`, `public/favicon.ico`, `public/favicon.ico.json`, `src/app/manifest.json`, `public/site.webmanifest` |
| Open Graph ES / EN y procedencia | `public/og-image.png`, `public/og-image-en.png`; referencias en `src/app/(es)/layout.tsx`, `src/app/(en)/layout.tsx` |
| Cookies | `src/components/CookieConsent.tsx` |
| Contenido bilingüe principal y nuevas secciones | `src/i18n/home-copy.ts` |
| Idioma y metadatos raíz | `src/app/(es)/layout.tsx`, `src/app/(en)/layout.tsx` |
| GA4, PostHog y Google Ads | `src/lib/analytics.ts` |
| Contrato visual actualizado | `.impeccable/surfaces/src-app-es-page-tsx.md` |

## Do's and Don'ts

### Do:
- **Do** limitar `dispatch-home`, `dispatch-header`, `dispatch-mobile-menu` y `dispatch-cookie` a `/`, `/en`, `/servicios`, `/services`, `/erp-a-medida`, `/custom-erp` y todo `/blog`.
- **Do** mantener el hero oscuro, la línea 3D y el orden actual de secciones en ambos idiomas.
- **Do** conservar la variante editorial del blog con `circuit-dark` solo en héroes, lectura en papel y separación server/client.
- **Do** usar `ServiceHero variant="services"` con catálogo y `variant="erp"` con red radial, manteniendo la animación original de documentos solo en la home.
- **Do** conservar los cuatro estados, el avance de ~4,9s, la guía con `aria-current="step"`, DPR 1–1.5, cámara responsive y pausa fuera de viewport.
- **Do** ofrecer los mismos cuatro estados estáticos en el fallback con movimiento reducido o sin WebGL, sin replay.
- **Do** usar Barlow Condensed para titulares y Barlow para lectura, anotaciones y controles.
- **Do** distinguir la banda de proceso de la superficie del hero y de los CTA.
- **Do** probar ES y EN a 390×844 y 1440×900, con teclado, movimiento reducido y WebGL deshabilitado.
- **Do** preservar anclas, rutas, contenido, eventos y el envío exitoso como único origen de leads.

### Don't:
- **Don't** volver a describir o componer el hero como una hoja estática de texto + clasificador.
- **Don't** aplicar la línea de expedición a QR u otras páginas fuera del alcance dispatch mediante estilos globales.
- **Don't** añadir loops ambientales, rotación continua, partículas decorativas o parallax a las secciones editoriales.
- **Don't** montar el Canvas con `prefers-reduced-motion`, sin WebGL ni en SSR.
- **Don't** hacer que la información dependa solo de los colores o de las anotaciones 3D.
- **Don't** introducir Montserrat dentro de las superficies dispatch ni convertir las secciones en grids de tarjetas SaaS.
- **Don't** registrar `generate_lead` por clics, replay, selección de proceso, WhatsApp o inicio de formulario.
- **Don't** inventar métricas, testimonios o condiciones comerciales para reforzar las nuevas secciones.
