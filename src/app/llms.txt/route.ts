import { getAllPosts } from '@/lib/blog';

const BASE_URL = 'https://legasint.com';

export const dynamic = 'force-static';

export async function GET() {
  const esPosts = getAllPosts('es');
  const enPosts = getAllPosts('en');

  const esList = esPosts
    .map(
      (post) =>
        `- [${post.title}](${BASE_URL}/blog/${post.slug}) ([md](${BASE_URL}/blog-md/es/${post.slug}.md)): ${post.description}`
    )
    .join('\n');

  const enList = enPosts
    .map(
      (post) =>
        `- [${post.title}](${BASE_URL}/blog/en/${post.slug}) ([md](${BASE_URL}/blog-md/en/${post.slug}.md)): ${post.description}`
    )
    .join('\n');

  const content = `# Legasint

> Legasint es un socio tecnológico especializado en desarrollo de software a medida, automatización de procesos e inteligencia artificial para empresas en España y Europa. / Legasint is a technology partner specialized in custom software development, process automation, and AI for businesses in Spain and Europe.

Servicios principales / Core services:
- Desarrollo de software a medida (web, APIs, integraciones) / Custom software development (web, APIs, integrations)
- Automatización de procesos y extracción de datos / Process automation and data extraction
- Soluciones de inteligencia artificial / Applied AI solutions
- Cumplimiento normativo tecnológico (AI Act, RGPD/GDPR, NIS2, DORA) / Technology regulatory compliance
- CTO as a Service y dirección técnica externa / CTO as a Service and fractional technical leadership

Datos clave / Key facts:
- Fundador / Founder: Arturo Legaspi Rodrigo
- Base: España (trabajo remoto con clientes en toda Europa) / Spain (remote work with clients across Europe)
- Idiomas / Languages: Español e inglés / Spanish and English
- Contacto / Contact: arturo@legasint.com

## Páginas principales / Main pages

- [Inicio (ES)](${BASE_URL}): Servicios, portfolio, impacto social y preguntas frecuentes
- [Home (EN)](${BASE_URL}/en): Services, portfolio, social impact and FAQ
- [Contacto (ES)](${BASE_URL}/contacto) / [Contact (EN)](${BASE_URL}/contact)
- [Blog (ES)](${BASE_URL}/blog): Artículos sobre tecnología, IA, software y cumplimiento normativo
- [Blog (EN)](${BASE_URL}/blog/en): Articles on technology, AI, software and compliance
- [RSS feed](${BASE_URL}/feed.xml): Todos los artículos ES + EN / All articles ES + EN
- [llms-full.txt](${BASE_URL}/llms-full.txt): Contenido completo de todos los artículos / Full content of all articles

## Blog en español

${esList}

## Blog in English

${enList}

## Optional

- [Sitemap](${BASE_URL}/sitemap.xml)
- [Manifest](${BASE_URL}/manifest.json)
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
