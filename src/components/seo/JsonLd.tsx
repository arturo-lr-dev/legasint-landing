import { BlogPost } from '@/lib/blog';

const BASE_URL = 'https://legasint.com';

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Legasint',
    url: BASE_URL,
    logo: `${BASE_URL}/og-image.png`,
    description:
      'Transform your business with cutting-edge technology solutions. Legasint delivers seamless innovation for the modern enterprise.',
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
    name: 'Legasint',
    url: BASE_URL,
    inLanguage: ['es', 'en'],
    publisher: {
      '@type': 'Organization',
      name: 'Legasint',
    },
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
      name: 'Legasint',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Legasint',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/og-image.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}${urlPrefix}/${post.slug}`,
    },
    inLanguage: locale === 'en' ? 'en' : 'es',
    keywords: post.tags.join(', '),
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
