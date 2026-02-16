# Auditoria SEO Completa - legasint.com

**Fecha:** 2026-02-16
**Sitio:** https://legasint.com
**Framework:** Next.js 15.5.9 (App Router, Static Export)

---

## Resumen Ejecutivo

El sitio tiene una base tecnica solida con Next.js, sitemap dinamico, robots.txt correcto, semantic HTML y buen sistema de blog con MDX. Sin embargo, carece de elementos SEO criticos como datos estructurados (JSON-LD), etiquetas hreflang para internacionalizacion, canonical tags y tiene la imagen OG con dimensiones incorrectas.

### Puntuacion por Area

| Categoria | Estado | Puntuacion |
|-----------|--------|------------|
| Estructura del proyecto | Excelente | 9/10 |
| Meta tags globales | ~~Bueno~~ RESUELTO | ~~7/10~~ 9/10 |
| Sitemap.xml | Excelente | 10/10 |
| Robots.txt | Bueno | 8/10 |
| Datos estructurados (JSON-LD) | ~~No existe~~ RESUELTO | ~~0/10~~ 9/10 |
| Optimizacion de imagenes | ~~Regular~~ RESUELTO | ~~6/10~~ 9/10 |
| Internacionalizacion (hreflang) | ~~No existe~~ RESUELTO | ~~0/10~~ 8/10 |
| URLs y canonical | ~~Regular~~ RESUELTO | ~~5/10~~ 9/10 |
| Jerarquia de headings | Excelente | 9/10 |
| Linking interno | ~~Regular~~ RESUELTO | ~~5/10~~ 9/10 |
| Core Web Vitals | ~~Riesgo~~ RESUELTO | ~~5/10~~ 8/10 |
| Accesibilidad | Bueno | 7/10 |
| Blog / Contenido | ~~Bueno~~ RESUELTO | ~~7/10~~ 10/10 |
| Pagina 404 | Excelente | 9/10 |
| Redirecciones | ~~No existe~~ RESUELTO | ~~0/10~~ 8/10 |
| Analytics | ~~Bueno~~ RESUELTO | ~~7/10~~ 8/10 |
| RSS Feed | ~~No existe~~ RESUELTO | ~~0/10~~ 9/10 |

**Puntuacion global estimada: ~~5.5/10~~ ~~7.2/10~~ ~~8.4/10~~ 9.0/10 (post Fase 3)**

---

## 1. Estructura del Proyecto

**Estado: EXCELENTE**

- Framework: Next.js 15.5.9 con App Router
- TypeScript 5
- Build: Static export (`output: 'export'` en `next.config.ts`)
- Hosting: Vercel

### Paginas existentes

| Ruta | Archivo | Idioma |
|------|---------|--------|
| `/` | `src/app/page.tsx` | EN |
| `/contact` | `src/app/contact/page.tsx` | EN |
| `/contacto` | `src/app/contacto/page.tsx` | ES |
| `/blog` | `src/app/blog/page.tsx` | ES |
| `/blog/en` | `src/app/blog/en/page.tsx` | EN |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | ES |
| `/blog/en/[slug]` | `src/app/blog/en/[slug]/page.tsx` | EN |
| 404 | `src/app/not-found.tsx` | EN |

---

## 2. Meta Tags y Head

**Estado: BUENO con mejoras necesarias**

### Lo que esta bien (layout.tsx)

- `metadataBase`: `https://legasint.com`
- Title: "Legasint - Innovation Made Seamless"
- Description presente
- Keywords array definido
- Authors, Creator, Publisher configurados
- `formatDetection` deshabilitado (buena practica)
- Favicon y manifest configurados
- Open Graph: type, locale, url, siteName, title, description, image
- Twitter Card: summary_large_image, site, creator, image
- Robots: index true, follow true, maxSnippet -1, maxImagePreview large

### Problemas encontrados

| Problema | Severidad | Archivo |
|----------|-----------|---------|
| OG image es 512x512px en vez de 1200x630px | ALTA | `public/og-image.png` |
| Twitter image es 512x512px en vez de 1200x600px | ALTA | `public/og-image.png` |
| `/contact` y `/contacto` sin metadata unica | MEDIA | `src/app/contact/page.tsx`, `src/app/contacto/page.tsx` |
| Blog posts sin Twitter card especifico | MEDIA | `src/app/blog/[slug]/page.tsx` |
| Blog posts sin canonical tag | ALTA | `src/app/blog/[slug]/page.tsx` |

---

## 3. Sitemap

**Estado: EXCELENTE**

**Archivo:** `src/app/sitemap.ts`

- Generacion dinamica con Next.js MetadataRoute.Sitemap
- `export const dynamic = 'force-static'`
- Incluye: home (priority 1.0), contacto/contact (0.8), blog listings (0.8, weekly), todos los blog posts (0.6, monthly)
- Ambos idiomas cubiertos
- Fecha actual generada automaticamente

**Sin problemas.**

---

## 4. Robots.txt

**Estado: BUENO**

**Archivo:** `src/app/robots.txt`

```
User-Agent: *
Allow: /
Disallow: /private/
Sitemap: https://legasint.com/sitemap.xml
```

**Problema menor:** `/private/` probablemente no existe como ruta.

---

## 5. Datos Estructurados (JSON-LD)

**Estado: NO EXISTE - CRITICO**

No se encontro ninguna implementacion de schema markup en todo el sitio.

### Schemas necesarios

| Schema | Pagina | Impacto |
|--------|--------|---------|
| `Organization` | Home / Layout global | Rich results de empresa |
| `WebSite` | Home / Layout global | Search box en SERP |
| `Article` | Cada blog post | Rich results de articulo |
| `BreadcrumbList` | Blog posts | Breadcrumbs en SERP |
| `LocalBusiness` | Contacto | Rich results de negocio |

---

## 6. Imagenes

**Estado: REGULAR**

### Lo que esta bien

- Componente `MDXImage` usa `next/image` para imagenes locales
- Alt text implementado con `<figcaption>`
- Imagenes de portfolio usan `next/image` con fill y object-cover
- SVGs de fondo optimizados

### Problemas encontrados

| Problema | Severidad | Archivo |
|----------|-----------|---------|
| `images.unoptimized: true` desactiva optimizacion de Next.js | ALTA | `next.config.ts` |
| Imagenes externas usan `<img>` en vez de `next/image` | MEDIA | `src/components/mdx/MDXImage.tsx` |
| Blog posts usan placehold.co (no imagenes reales) | ALTA | Todos los MDX |
| OG image pesa 77KB sin optimizar | BAJA | `public/og-image.png` |
| Sin estrategia de loading explicita (lazy/eager) | MEDIA | Varios componentes |

---

## 7. Rendimiento y Core Web Vitals

**Estado: RIESGO**

### Positivo

- Static export = HTML pre-renderizado
- Google Fonts (Montserrat) con subset latin
- GA cargado con async
- Tailwind CSS bien configurado

### Riesgos

| Riesgo | Tipo CWV | Detalle |
|--------|----------|---------|
| Framer Motion pesado | FID/INP | Libreria de animaciones usada extensivamente |
| IntersectionObserver para animaciones | CLS | Elementos que aparecen con delay causan shifts |
| Imagenes sin optimizar | LCP | `unoptimized: true` en config |
| Filtro de busqueda en blog | CLS | Cambio de layout al filtrar |
| Sin bundle analyzer configurado | General | No se puede medir impacto |

---

## 8. Internacionalizacion (i18n) y hreflang

**Estado: NO EXISTE - CRITICO**

### Situacion actual

- Rutas separadas: `/blog` (ES) y `/blog/en` (EN)
- Paginas duplicadas: `/contacto` (ES) y `/contact` (EN)
- Home page solo en ingles
- Header tiene selector de idioma funcional
- `i18next` instalado pero NO utilizado activamente
- `<html lang="en">` para TODAS las paginas (incluidas las en espanol)

### Problemas

| Problema | Severidad |
|----------|-----------|
| Sin etiquetas hreflang en ninguna pagina | CRITICA |
| Sin `<link rel="alternate">` entre versiones | CRITICA |
| Sin `x-default` hreflang | CRITICA |
| `<html lang="en">` en paginas en espanol | ALTA |
| Sin sitemap separado por idioma | MEDIA |

---

## 9. URLs y Canonical

**Estado: REGULAR**

### Lo que esta bien

- URLs limpias y semanticas (sin query strings)
- Slugs descriptivos generados desde nombres de archivo MDX
- Estructura consistente

### Problemas

| Problema | Severidad |
|----------|-----------|
| Sin canonical tags en ninguna pagina | ALTA |
| Riesgo de contenido duplicado ES/EN | MEDIA |
| Sin politica de trailing slashes | BAJA |

---

## 10. Jerarquia de Headings

**Estado: EXCELENTE**

- Landing: H1 (sr-only) -> H2 por seccion
- Blog listing: H1 titulo del blog
- Blog post: H1 titulo del post -> H2/H3 en contenido MDX
- Componente `MDXHeading` con estilos semanticos h1-h6
- `rehype-slug` genera IDs automaticos para anchor links

**Sin problemas.**

---

## 11. Linking Interno

**Estado: REGULAR**

### Lo que esta bien

- Header con navegacion (Home, Blog, selector de idioma)
- `next/link` usado correctamente
- Navegacion anterior/siguiente en blog posts
- Link "Volver al blog" en posts

### Problemas

| Problema | Severidad |
|----------|-----------|
| Sin breadcrumbs en blog posts | MEDIA |
| Sin paginas de tags (tags no son clickables) | MEDIA |
| Sin link al sitemap en footer | BAJA |
| Sin posts relacionados por contenido/tags | MEDIA |
| Estrategia de linking interno limitada | MEDIA |

---

## 12. Accesibilidad (impacto SEO indirecto)

**Estado: BUENO**

### Lo que esta bien

- Semantic HTML: `<header>`, `<nav>`, `<article>`, `<time>`, `<figure>`
- aria-labels en botones de menu, compartir, iconos sociales
- `aria-hidden="true"` en elementos decorativos
- Alt text en imagenes

### Problemas menores

| Problema | Severidad |
|----------|-----------|
| Sin "skip to main content" link | BAJA |
| Email/telefono en contacto sin aria-label contextual | BAJA |
| Algunos SVGs decorativos sin aria-hidden | BAJA |

---

## 13. Blog y Contenido

**Estado: BUENO**

### Estructura

- 40 posts MDX (20 EN + 20 ES)
- Ubicacion: `src/content/blog/{en|es}/{slug}.mdx`
- Frontmatter: title, date, description, tags, image
- MDX procesado con: remark-gfm, rehype-highlight, rehype-slug
- Componentes custom: MDXHeading, MDXImage, MDXLink, MDXCode, MDXPre, MDXBlockquote

### Funcionalidades del blog

- Ordenado por fecha (mas reciente primero)
- Busqueda client-side
- Paginacion "Load more" (6 posts por carga)
- Botones de compartir (Twitter, LinkedIn, Facebook, copiar link)
- Navegacion anterior/siguiente
- Fechas formateadas por locale (es-ES, en-US)

### Problemas

| Problema | Severidad |
|----------|-----------|
| Sin campo `author` en frontmatter ni en UI | MEDIA |
| Sin tiempo de lectura estimado | MEDIA |
| Sin tabla de contenidos para posts largos | BAJA |
| Imagenes de posts son placeholders (placehold.co) | ALTA |
| Paginacion no cambia URL (sin rel=prev/next) | MEDIA |
| Tags no son clickables / sin paginas de tags | MEDIA |

---

## 14. Pagina 404

**Estado: EXCELENTE**

**Archivo:** `src/app/not-found.tsx`

- Diseno atractivo y responsive
- H1 con "404"
- Mensaje claro
- CTAs: volver a home, ir al blog
- Aria labels correctos

**Sin problemas.**

---

## 15. Redirecciones

**Estado: NO EXISTE**

- Sin configuracion de redirects en `next.config.ts`
- Sin middleware de redirecciones
- Sin archivo `_redirects` para Vercel
- Sin normalizacion de trailing slashes
- Sin redireccion de URLs antiguas

---

## 16. Analytics

**Estado: BUENO**

**Archivos:** `src/analitics/google.tsx`, `src/lib/analytics.ts`

- Google Analytics via GTM con `NEXT_PUBLIC_GOOGLE_ANALYTICS`
- Carga async (no bloquea renderizado)
- Eventos custom: CONTACT_CLICK, WHATSAPP_CLICK, SOCIAL_CLICK

### Problemas

| Problema | Severidad |
|----------|-----------|
| Sin Google Search Console configurado | MEDIA |
| Sin meta de verificacion de Search Console | MEDIA |
| Directorio se llama `analitics` (typo, deberia ser `analytics`) | BAJA |

---

## 17. RSS Feed

**Estado: NO EXISTE**

- Sin endpoint `/blog/feed.xml` ni `/rss.xml`
- Sin generacion de RSS en el codigo
- Sin links de discovery de feed en el layout

---

## 18. Manifest y PWA

**Estado: PARCIAL**

- `manifest.json` referenciado en metadata
- Favicon configurado

---

## 19. Seguridad relevante para SEO

- Links externos con `rel="noopener noreferrer"` (via MDXLink)
- Sin mixed content (HTTPS)
- Sin vulnerabilidades SEO obvias (no cloaking, no hidden text spam)

---

---

# Plan de Implementacion

## Fase 1 - Critico (Mayor impacto SEO) -- COMPLETADA

**Estado: COMPLETADA (2026-02-16)**

### Archivos creados

| Archivo | Descripcion |
|---------|-------------|
| `src/components/seo/JsonLd.tsx` | Componentes JSON-LD: Organization, WebSite, Article, BreadcrumbList |
| `src/lib/slug-mapping.ts` | Mapeo automatico ES<->EN por fecha de publicacion (no requiere mantenimiento manual) |
| `src/app/contact/ContactContent.tsx` | Client component extraido de contact page |
| `src/app/contacto/ContactoContent.tsx` | Client component extraido de contacto page |

### Archivos modificados

| Archivo | Cambios |
|---------|---------|
| `src/app/layout.tsx` | JSON-LD Organization+WebSite en `<head>`, OG image 1200x630, `<html lang="es">`, alternates/canonical, alternateLocale es_ES |
| `src/app/blog/[slug]/page.tsx` | JSON-LD Article+BreadcrumbList, canonical, hreflang ES<->EN automatico, Twitter cards, OG locale es_ES |
| `src/app/blog/en/[slug]/page.tsx` | JSON-LD Article+BreadcrumbList, canonical, hreflang EN<->ES automatico, Twitter cards, OG locale en_US |
| `src/app/blog/page.tsx` | canonical + hreflang ES<->EN |
| `src/app/blog/en/page.tsx` | canonical + hreflang EN<->ES |
| `src/app/contact/page.tsx` | Server component con metadata unica (title, description, OG) + hreflang + canonical |
| `src/app/contacto/page.tsx` | Server component con metadata unica (title, description, OG) + hreflang + canonical |

### Assets regenerados

| Asset | Cambio |
|-------|--------|
| `public/og-image.png` | Regenerada a 1200x630px (antes 512x512) con branding Legasint |

### Verificaciones realizadas

- Build exitoso (52 paginas estaticas)
- Canonical tags presentes en todas las paginas
- hreflang ES<->EN bidireccional en blog posts, listings y contacto
- 4 schemas JSON-LD por blog post (Organization, WebSite, Article, BreadcrumbList)
- 2 schemas JSON-LD en paginas generales (Organization, WebSite)
- Twitter cards con datos dinamicos en blog posts
- `<html lang="es">` corregido (antes era "en" para todo)

---

## Fase 2 - Importante (Mejora indexacion y contenido) -- COMPLETADA

**Estado: COMPLETADA (2026-02-16)**

### Archivos creados

| Archivo | Descripcion |
|---------|-------------|
| `src/app/feed.xml/route.ts` | RSS feed con todos los posts ES+EN, categorias, idioma por item |
| `src/app/blog/tag/[tag]/page.tsx` | Paginas de tags en espanol con metadata, canonical y hreflang |
| `src/app/blog/en/tag/[tag]/page.tsx` | Paginas de tags en ingles con metadata, canonical y hreflang |

### Archivos modificados

| Archivo | Cambios |
|---------|---------|
| `src/lib/blog.ts` | Nuevo campo `author` y `readingTime` en interfaces, funcion `calculateReadingTime`, funciones `getAllTags` y `getPostsByTag` |
| `src/components/blog/BlogPostView.tsx` | Breadcrumbs (nav con aria-label), tags clickables (Link), reading time, author en header |
| `src/components/blog/BlogCard.tsx` | Reading time junto a la fecha |
| `src/app/sitemap.ts` | Alternates hreflang en cada entrada, tag pages incluidas |
| `src/app/layout.tsx` | Link RSS discovery en `<head>` |

### Resultados del build

- **137 paginas estaticas** generadas (antes 52)
- **85 tag pages** nuevas (ES + EN)
- **90 alternates hreflang** en sitemap.xml
- RSS feed funcional en `/feed.xml` con 40 items
- Reading time calculado automaticamente (palabras / 200 = minutos)
- Author con fallback a "Legasint" (lee del frontmatter si existe)

### Nota: Tarea 2.6 (Twitter cards) ya completada en Fase 1

---

## Fase 3 - Optimizacion (Rendimiento y extras) -- COMPLETADA

**Estimacion: 8 tareas** | **Estado: COMPLETADA**

### 3.1 Evaluar re-habilitar optimizacion de imagenes

**Archivos a modificar:**
- `next.config.ts`

**Accion:** Investigar si se puede usar `unoptimized: false` con el hosting actual. Si es static export en Vercel, considerar usar el loader de Vercel.

### 3.2 Reemplazar imagenes placeholder

**Archivos a modificar:**
- Todos los MDX con URLs de placehold.co

**Accion:** Generar/obtener imagenes reales para cada post y guardarlas en `public/blog/`.

### 3.3 Tabla de contenidos automatica

**Archivos a crear:**
- `src/components/blog/TableOfContents.tsx`

**Archivos a modificar:**
- `src/components/blog/BlogPostView.tsx`

**Accion:** Parsear headings del MDX y generar TOC sticky en sidebar.

### 3.4 Posts relacionados por tags

**Archivos a modificar:**
- `src/lib/blog.ts` (funcion para encontrar posts con tags similares)
- `src/components/blog/BlogPostView.tsx` (seccion "Posts relacionados")

### 3.5 Auditar animaciones para CLS

**Archivos a revisar:**
- Todos los componentes con Framer Motion
- `AnimatedElement` y similares

**Accion:** Asegurar que las animaciones no causan layout shifts. Usar `transform` y `opacity` en vez de propiedades que afectan layout.

### 3.6 Google Search Console

**Archivos a modificar:**
- `src/app/layout.tsx`

**Accion:** Anadir meta tag de verificacion de Google Search Console.

### 3.7 Configurar redirecciones

**Archivos a modificar:**
- `next.config.ts` o crear `vercel.json`

**Accion:** Definir politica de trailing slashes, redireccion www -> non-www (si aplica), y cualquier URL legacy.

### 3.8 Corregir typo en directorio analytics

**Archivos a renombrar:**
- `src/analitics/` -> `src/analytics/`

**Archivos a modificar:**
- Todos los imports que referencien `analitics`

---

## Checklist de Verificacion Post-Implementacion

### Fase 1
- [ ] JSON-LD Organization valido (testear en https://search.google.com/test/rich-results)
- [ ] JSON-LD Article valido en cada blog post
- [ ] hreflang tags presentes en source HTML de cada pagina
- [ ] `<html lang="es">` en paginas espanolas
- [ ] `<html lang="en">` en paginas inglesas
- [ ] Canonical tags presentes en todas las paginas
- [ ] OG image renderiza correctamente en Facebook Sharing Debugger
- [ ] Twitter card renderiza correctamente en Twitter Card Validator
- [ ] Paginas de contacto tienen title/description unicos

### Fase 2
- [ ] RSS feed accesible en `/blog/feed.xml`
- [ ] RSS feed valido (testear en https://validator.w3.org/feed/)
- [ ] Author visible en todos los blog posts
- [ ] Tiempo de lectura visible en cards y posts
- [ ] Paginas de tags accesibles y con contenido
- [ ] Tags son links clickables en cards y posts
- [ ] Breadcrumbs visibles en blog posts
- [ ] Sitemap incluye paginas de tags
- [ ] Sitemap incluye alternates de idioma

### Fase 3
- [x] Imagenes locales generadas para todos los 40 posts (reemplazadas placehold.co)
- [x] Tabla de contenidos automatica en blog posts (>= 3 headings)
- [x] Posts relacionados por tags en cada blog post
- [x] Animaciones auditadas - solo usan transform/opacity (CLS-safe)
- [x] Google Search Console verificacion meta tag (via env var)
- [x] vercel.json con trailing slash config y security headers
- [x] Directorio `analitics` renombrado a `analytics`
- [ ] Lighthouse performance score > 90
- [ ] Search Console verificado y enviando datos
- [ ] Evaluar image optimization con Vercel loader (no viable en static export)

---

## Herramientas Recomendadas para Monitoreo

| Herramienta | Uso |
|-------------|-----|
| Google Search Console | Indexacion, errores, rendimiento en busqueda |
| Google Rich Results Test | Validar JSON-LD |
| Facebook Sharing Debugger | Validar Open Graph |
| Twitter Card Validator | Validar Twitter Cards |
| Lighthouse (Chrome DevTools) | Core Web Vitals, accesibilidad, SEO score |
| Ahrefs / Semrush | Backlinks, keywords, competencia |
| W3C Feed Validator | Validar RSS feed |
| Screaming Frog | Crawl completo del sitio |
