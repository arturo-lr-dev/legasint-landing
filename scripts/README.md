# Blog Scripts

Scripts para gestionar el contenido del blog de LegaSint.

## Sistema de Ideas

El blog usa `blog-ideas.json` como fuente de verdad para trackear ideas de posts.

### Estructura de blog-ideas.json

```json
{
  "ideas": [
    {
      "id": 1,
      "title": {
        "es": "Título en español",
        "en": "Title in English"
      },
      "description": "Descripción del contenido",
      "category": "Legal Tech | Regulación | Blockchain | etc.",
      "audience": "Target audience",
      "keywords": ["keyword1", "keyword2"],
      "status": "pending | published",
      "publishedDate": "2026-03-26",
      "files": ["filename-es.mdx", "filename-en.mdx"]
    }
  ]
}
```

### Scripts disponibles

#### 1. generate-blog-post.js

Genera un post bilingüe desde una idea pendiente.

```bash
# Generar post aleatorio de una idea pendiente
node scripts/generate-blog-post.js

# Generar post de una idea específica
node scripts/generate-blog-post.js --id 5
```

**Output:** Prompt para Claude con instrucciones para generar el post.

#### 2. mark-idea-published.js

Marca una idea como publicada después de generar el contenido.

```bash
node scripts/mark-idea-published.js --id 5 --files "gdpr-ia-despachos.mdx,gdpr-ai-law-firms.mdx"
```

### Workflow completo

1. **Añadir nueva idea** a `blog-ideas.json`:
```json
{
  "id": 14,
  "title": {
    "es": "Nuevo tema",
    "en": "New topic"
  },
  "description": "...",
  "category": "Legal Tech",
  "audience": "...",
  "keywords": [...],
  "status": "pending",
  "publishedDate": null
}
```

2. **Generar post:**
```bash
node scripts/generate-blog-post.js --id 14
```

3. **Copiar el prompt**, enviarlo a Claude, generar los posts (ES + EN)

4. **Marcar como publicado:**
```bash
node scripts/mark-idea-published.js --id 14 --files "nuevo-tema.mdx,new-topic.mdx"
```

5. **Commit y push:**
```bash
git add .
git commit -m "blog: add nuevo-tema post (ES/EN)"
git push origin main
```

### Cron automático

El cron job del blog (11:00 diario) debe:
1. Leer `blog-ideas.json`
2. Filtrar ideas `status: "pending"`
3. Seleccionar una aleatoria
4. Generar el post con Claude
5. Marcar como publicada

**⚠️ Importante:** Antes de generar un post, **siempre consultar blog-ideas.json** para evitar duplicados.

## Limpieza de posts duplicados

Si hay posts duplicados, borrarlos manualmente y actualizar blog-ideas.json para reflejar solo los posts que existen.

## Scripts de imágenes y SEO

### generate-blog-images.mjs

Genera imágenes PNG (800x400, gradiente + título) para posts cuyo frontmatter `image:` es una URL de `placehold.co`, y reescribe el frontmatter para apuntar a `/blog-images/<locale>-<slug>.png`.

```bash
node scripts/generate-blog-images.mjs
```

### generate-missing-blog-images.mjs

Genera las imágenes de posts cuyo `image: "/blog-images/*.png"` referencia un archivo que no existe (usa el `title` del post como texto).

```bash
node scripts/generate-missing-blog-images.mjs
```

### add-translation-keys.mjs (one-off, ya ejecutado)

Emparejó posts ES↔EN (por fecha + similitud de slug/contenido) y escribió `translationKey` en el frontmatter de ambos posts. El campo `translationKey` es lo que usan hreflang y el selector de idioma para enlazar traducciones.

**⚠️ Al crear posts nuevos:** añadir manualmente el mismo `translationKey` en el frontmatter del post ES y del EN (por convención, el slug ES). Sin él, el post no tendrá hreflang ni cambio de idioma directo.

### generate-slug-map.mjs (automático)

Genera `src/data/slug-map.json` (mapa slug ES↔EN + listas de tags por idioma) que usa el Header para el selector de idioma. Se ejecuta solo en cada build vía `prebuild` en package.json.

### generate-blog-markdown.mjs (automático)

Genera una versión Markdown de cada post en `public/blog-md/{es,en}/<slug>.md` (con frontmatter simplificado + URL canónica) para ingesta por LLMs/agentes. Se enlazan desde `/llms.txt`. Se ejecuta en `prebuild`.

## Variables de entorno

- `NEXT_PUBLIC_GOOGLE_ANALYTICS` — ID de GA/GTM.
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` — token de verificación de Google Search Console (si está vacía, no se renderiza la meta).

## Best Practices

1. **Diversificar temas:** No publicar 10 posts seguidos del mismo tema
2. **Consultar ideas primero:** Siempre leer blog-ideas.json antes de generar
3. **Mantener JSON actualizado:** Marcar como published cuando se publique
4. **Backfill:** Si un post ya existe, añadirlo al JSON con status "published"

## Comandos útiles

```bash
# Ver ideas pendientes
cat blog-ideas.json | jq '.ideas[] | select(.status == "pending")'

# Contar posts publicados
cat blog-ideas.json | jq '[.ideas[] | select(.status == "published")] | length'

# Ver posts de una categoría
cat blog-ideas.json | jq '.ideas[] | select(.category == "Legal Tech")'
```
