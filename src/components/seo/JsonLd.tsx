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
      'Socio tecnológico especializado en desarrollo de software a medida, automatización de procesos, inteligencia artificial y legal tech para despachos y empresas. Custom software development and technology partnership for law firms and businesses.',
    email: 'arturo@legasint.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ES',
    },
    areaServed: ['ES', 'EU'],
    knowsAbout: [
      'Custom software development',
      'Legal tech',
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
