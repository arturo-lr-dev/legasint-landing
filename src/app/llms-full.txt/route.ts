import { getAllPosts, getPostBySlug } from '@/lib/blog';

const BASE_URL = 'https://legasint.com';

export const dynamic = 'force-static';

function postSection(post: NonNullable<ReturnType<typeof getPostBySlug>>, urlPrefix: string) {
  return `# ${post.title}

- URL: ${BASE_URL}${urlPrefix}/${post.slug}
- Fecha / Date: ${post.date}
- Idioma / Language: ${post.locale}
- Tags: ${post.tags.join(', ')}

${post.description}

${post.content.trim()}

---
`;
}

export async function GET() {
  const esPosts = getAllPosts('es');
  const enPosts = getAllPosts('en');

  const esContent = esPosts
    .map((meta) => {
      const post = getPostBySlug(meta.slug, 'es');
      return post ? postSection(post, '/blog') : '';
    })
    .join('\n\n');

  const enContent = enPosts
    .map((meta) => {
      const post = getPostBySlug(meta.slug, 'en');
      return post ? postSection(post, '/blog/en') : '';
    })
    .join('\n\n');

  const content = `# Legasint — Contenido completo del blog / Full blog content

> Legasint es un socio tecnológico especializado en desarrollo de software a medida, automatización de procesos e inteligencia artificial para empresas en España y Europa. / Legasint is a technology partner specialized in custom software development, process automation, and AI for businesses in Spain and Europe.

Este archivo contiene el texto completo de todos los artículos del blog de Legasint en español e inglés. / This file contains the full text of all Legasint blog articles in Spanish and English.

---

## Artículos en español

${esContent}

## Articles in English

${enContent}
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
