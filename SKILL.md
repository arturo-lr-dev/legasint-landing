# Skill: Crear Entrada de Blog

## Ubicación de los Posts

Los posts del blog se almacenan en el directorio `src/content/blog/` organizados por idioma:

```
src/content/blog/
├── es/           # Posts en español
│   └── mi-post.mdx
└── en/           # Posts en inglés
    └── my-post.mdx
```

## Crear un Nuevo Post

### 1. Crear el archivo MDX

Crea un archivo `.mdx` en el directorio del idioma correspondiente:

- **Español**: `src/content/blog/es/nombre-del-post.mdx`
- **Inglés**: `src/content/blog/en/post-name.mdx`

El nombre del archivo (sin extensión) será el **slug** de la URL:
- `src/content/blog/es/mi-articulo.mdx` → `/blog/mi-articulo`
- `src/content/blog/en/my-article.mdx` → `/blog/en/my-article`

### 2. Estructura del Frontmatter

Cada post debe comenzar con un bloque de frontmatter YAML entre `---`:

```mdx
---
title: "Título del Post"
date: "2026-01-15"
description: "Descripción breve del post (aparece en las cards)"
tags: ["Tag1", "Tag2", "Tag3"]
image: "https://placehold.co/800x400/1e3a8a/white?text=Titulo"
---

Contenido del post aquí...
```

### 3. Propiedades del Frontmatter

| Propiedad     | Obligatoria | Tipo       | Descripción                                      |
|---------------|-------------|------------|--------------------------------------------------|
| `title`       | ✅ Sí       | `string`   | Título del post                                  |
| `date`        | ✅ Sí       | `string`   | Fecha en formato `YYYY-MM-DD`                    |
| `description` | ✅ Sí       | `string`   | Descripción corta (máx. ~150 caracteres)         |
| `tags`        | ✅ Sí       | `string[]` | Array de tags/etiquetas                          |
| `image`       | ❌ No       | `string`   | URL de la imagen de portada (800x400 recomendado)|

### 4. Imágenes de Portada

Opciones para la imagen:

**Placeholder con texto:**
```yaml
image: "https://placehold.co/800x400/1e3a8a/white?text=Mi+Titulo"
```

Colores del sitio:
- Azul: `1e3a8a`
- Púrpura: `581c87`

**Imagen local** (guardar en `public/blog/`):
```yaml
image: "/blog/mi-imagen.jpg"
```

**Imagen externa:**
```yaml
image: "https://ejemplo.com/imagen.jpg"
```

## Contenido MDX

### Elementos Soportados

El contenido soporta Markdown estándar + componentes personalizados:

#### Encabezados
```mdx
## Encabezado H2
### Encabezado H3
#### Encabezado H4
```

#### Texto con formato
```mdx
**Negrita**, *cursiva*, `código inline`
```

#### Listas
```mdx
- Item 1
- Item 2

1. Primero
2. Segundo
```

#### Enlaces
```mdx
[Texto del enlace](https://url.com)
[Enlace interno](/blog)
```

#### Citas
```mdx
> Esta es una cita o blockquote
```

#### Bloques de Código
````mdx
```typescript
const ejemplo = "código con syntax highlighting";
```
````

Lenguajes soportados: `typescript`, `javascript`, `tsx`, `jsx`, `python`, `bash`, `json`, `css`, `html`, y más.

#### Imágenes en el contenido
```mdx
![Alt text](https://url-de-imagen.com/imagen.jpg)
```

## Ejemplo Completo

```mdx
---
title: "Cómo Crear APIs con Next.js"
date: "2026-02-01"
description: "Guía paso a paso para crear APIs REST robustas usando Next.js App Router."
tags: ["Next.js", "API", "Tutorial"]
image: "https://placehold.co/800x400/581c87/white?text=APIs"
---

## Introducción

En este tutorial aprenderás a crear APIs con **Next.js 14**.

## Paso 1: Crear el Route Handler

Crea un archivo en `app/api/users/route.ts`:

```typescript
export async function GET() {
  return Response.json({ users: [] });
}
```

> Los Route Handlers reemplazan a las API Routes del pages directory.

## Conclusión

Ahora tienes una API funcional en Next.js.
```

## URLs Generadas

| Archivo                                    | URL                              |
|--------------------------------------------|----------------------------------|
| `src/content/blog/es/mi-post.mdx`          | `/blog/mi-post`                  |
| `src/content/blog/en/my-post.mdx`          | `/blog/en/my-post`               |

## Listados

- `/blog` - Lista todos los posts en español
- `/blog/en` - Lista todos los posts en inglés

Los posts se ordenan automáticamente por fecha (más recientes primero).

## Build y Deploy

Después de crear un post, ejecuta:

```bash
npm run build
```

Esto genera las páginas estáticas para cada post.
