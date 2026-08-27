import { BlogPost } from '@/lib/blog';

const BASE_URL = 'https://legasint.com';
const ORG_ID = `${BASE_URL}/#organization`;
const LOGO_URL = `${BASE_URL}/favicon/android-chrome-512x512.png`;

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Legasint',
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
      width: 512,
      height: 512,
    },
    image: `${BASE_URL}/og-image.png`,
    slogan: 'Your Vision, Our Technology',
    description:
      'Socio tecnológico especializado en desarrollo de software a medida, automatización de procesos e inteligencia artificial para empresas. Custom software development and technology partnership for businesses.',
    email: 'arturo@legasint.com',
    founder: {
      '@type': 'Person',
      '@id': `${BASE_URL}/#founder`,
      name: 'Arturo Legaspi Rodrigo',
      email: 'arturo@legasint.com',
      jobTitle: 'Founder',
      worksFor: { '@id': ORG_ID },
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ES',
    },
    areaServed: ['ES', 'EU'],
    knowsAbout: [
      'Custom software development',
      'Process automation',
      'Artificial intelligence',
      'Digital transformation',
      'Compliance technology',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+34-649-355-701',
      contactType: 'customer service',
      email: 'arturo@legasint.com',
      availableLanguage: ['Spanish', 'English'],
    },
    sameAs: [
      'https://twitter.com/legasint',
      'https://linkedin.com/company/legasint',
      'https://instagram.com/legasint',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    name: 'Legasint',
    url: BASE_URL,
    inLanguage: ['es', 'en'],
    publisher: { '@id': ORG_ID },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleJsonLd({
  post,
  locale,
}: {
  post: BlogPost;
  locale: string;
}) {
  const urlPrefix = locale === 'en' ? '/blog/en' : '/blog';
  const postUrl = `${BASE_URL}${urlPrefix}/${post.slug}`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.image || `${BASE_URL}/og-image.png`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: 'Legasint',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: 'Legasint',
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    url: postUrl,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    inLanguage: locale === 'en' ? 'en' : 'es',
    keywords: post.tags.join(', '),
    timeRequired: `PT${post.readingTime}M`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessJsonLd({ locale = 'es' }: { locale?: 'es' | 'en' }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${BASE_URL}/#localbusiness`,
    name: 'Legasint',
    url: locale === 'en' ? `${BASE_URL}/contact` : `${BASE_URL}/contacto`,
    image: `${BASE_URL}/og-image.png`,
    logo: LOGO_URL,
    description:
      locale === 'en'
        ? 'Custom software development, automation, AI and legal tech for law firms and businesses.'
        : 'Desarrollo de software a medida, automatización, IA y legal tech para despachos y empresas.',
    email: 'arturo@legasint.com',
    telephone: '+34-649-355-701',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ES',
    },
    areaServed: ['ES', 'EU'],
    priceRange: '€€',
    parentOrganization: { '@id': ORG_ID },
    sameAs: [
      'https://twitter.com/legasint',
      'https://linkedin.com/company/legasint',
      'https://instagram.com/legasint',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceJsonLd({ locale = 'es' }: { locale?: 'es' | 'en' }) {
  const services =
    locale === 'en'
      ? [
          {
            name: 'Custom Software Development',
            description:
              'Tailor-made web applications, APIs and integrations built around your business processes.',
          },
          {
            name: 'Process Automation & AI',
            description:
              'Automation of repetitive workflows and applied artificial intelligence to save time and reduce errors.',
          },
          {
            name: 'Regulatory Compliance',
            description:
              'Technology regulatory compliance solutions (AI Act, GDPR, NIS2, DORA).',
          },
          {
            name: 'CTO as a Service',
            description:
              'Ongoing technology leadership: technical decisions, product strategy and team guidance.',
          },
        ]
      : [
          {
            name: 'Desarrollo de software a medida',
            description:
              'Aplicaciones web, APIs e integraciones diseñadas alrededor de los procesos de tu negocio.',
          },
          {
            name: 'Automatización de procesos e IA',
            description:
              'Automatización de tareas repetitivas e inteligencia artificial aplicada para ahorrar tiempo y reducir errores.',
          },
          {
            name: 'Cumplimiento normativo',
            description:
              'Soluciones de cumplimiento normativo tecnológico (AI Act, RGPD, NIS2, DORA).',
          },
          {
            name: 'CTO as a Service',
            description:
              'Dirección tecnológica continua: decisiones técnicas, estrategia de producto y guía del equipo.',
          },
        ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.name,
        description: service.description,
        provider: { '@id': ORG_ID },
        areaServed: ['ES', 'EU'],
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FaqPageJsonLd({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
