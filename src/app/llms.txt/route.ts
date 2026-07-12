import { getAllPosts } from '@/lib/blog';

const BASE_URL = 'https://legasint.com';

export const dynamic = 'force-static';

export async function GET() {
  const esPosts = getAllPosts('es');
  const enPosts = getAllPosts('en');

  const esList = esPosts
    .map((post) => `- [${post.title}](${BASE_URL}/blog/${post.slug}): ${post.description}`)
    .join('\n');

  const enList = enPosts
    .map((post) => `- [${post.title}](${BASE_URL}/blog/en/${post.slug}): ${post.description}`)
    .join('\n');

  const content = `# Legasint

> Legasint es un socio tecnológico especializado en desarrollo de software a medida, automatización de procesos, inteligencia artificial y legal tech para despachos de abogados y empresas en España y Europa. / Legasint is a technology partner specialized in custom software development, process automation, AI, and legal tech for law firms and businesses in Spain and Europe.

Servicios principales / Core services:
- Desarrollo de software a medida (web, APIs, integraciones) / Custom software development
- Automatización de procesos y extracción de datos / Process automation and data extraction
- Soluciones de inteligencia artificial y cumplimiento normativo (AI Act, RGPD, NIS2, DORA) / AI solutions and regulatory compliance
- CTO as a Service y dirección técnica externa / CTO as a Service
- Legal tech para despachos de abogados / Legal tech for law firms

Contacto / Contact: arturo@legasint.com — [Contacto](${BASE_URL}/contacto) / [Contact](${BASE_URL}/contact)

## Páginas principales / Main pages

- [Inicio / Home](${BASE_URL}): Presentación de servicios, stack tecnológico y portfolio
- [Blog (ES)](${BASE_URL}/blog): Artículos sobre tecnología, legal tech, IA y cumplimiento normativo
- [Blog (EN)](${BASE_URL}/blog/en): Articles on technology, legal tech, AI and compliance
- [RSS feed](${BASE_URL}/feed.xml): Feed con todos los artículos en español e inglés

## Blog en español

${esList}

## Blog in English

${enList}
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
