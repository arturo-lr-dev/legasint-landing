import { MetadataRoute } from 'next';
import { getAllPosts, getAllTags, getPostsByTag } from '@/lib/blog';
import { getAlternateSlug } from '@/lib/slug-mapping';

export const dynamic = 'force-static';

const BASE_URL = 'https://legasint.com';

function latestDate(dates: string[], fallback: string): string {
  if (dates.length === 0) return fallback;
  return dates.reduce((a, b) => (new Date(a) > new Date(b) ? a : b));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();
  const esPosts = getAllPosts('es');
  const enPosts = getAllPosts('en');
  const latestEsDate = latestDate(esPosts.map((p) => p.date), currentDate);
  const latestEnDate = latestDate(enPosts.map((p) => p.date), currentDate);

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          es: BASE_URL,
          en: `${BASE_URL}/en`,
          'x-default': BASE_URL,
        },
      },
    },
    {
      url: `${BASE_URL}/en`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${BASE_URL}/en`,
          es: BASE_URL,
          'x-default': BASE_URL,
        },
      },
    },
    {
      url: `${BASE_URL}/contacto`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          es: `${BASE_URL}/contacto`,
          en: `${BASE_URL}/contact`,
          'x-default': `${BASE_URL}/contacto`,
        },
      },
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${BASE_URL}/contact`,
          es: `${BASE_URL}/contacto`,
          'x-default': `${BASE_URL}/contacto`,
        },
      },
    },
    {
      url: `${BASE_URL}/servicios`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          es: `${BASE_URL}/servicios`,
          en: `${BASE_URL}/services`,
          'x-default': `${BASE_URL}/servicios`,
        },
      },
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${BASE_URL}/services`,
          es: `${BASE_URL}/servicios`,
          'x-default': `${BASE_URL}/servicios`,
        },
      },
    },
    {
      url: `${BASE_URL}/erp-a-medida`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          es: `${BASE_URL}/erp-a-medida`,
          en: `${BASE_URL}/custom-erp`,
          'x-default': `${BASE_URL}/erp-a-medida`,
        },
      },
    },
    {
      url: `${BASE_URL}/custom-erp`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${BASE_URL}/custom-erp`,
          es: `${BASE_URL}/erp-a-medida`,
          'x-default': `${BASE_URL}/erp-a-medida`,
        },
      },
    },
    {
      url: `${BASE_URL}/software-a-medida`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/cto-as-a-service`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/automatizacion-ia`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: latestEsDate,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          es: `${BASE_URL}/blog`,
          en: `${BASE_URL}/blog/en`,
          'x-default': `${BASE_URL}/blog`,
        },
      },
    },
    {
      url: `${BASE_URL}/blog/en`,
      lastModified: latestEnDate,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${BASE_URL}/blog/en`,
          es: `${BASE_URL}/blog`,
          'x-default': `${BASE_URL}/blog`,
        },
      },
    },
  ];

  // Spanish blog posts with alternates
  const spanishPosts = esPosts.map((post) => {
    const enSlug = getAlternateSlug(post.slug, 'es');
    return {
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      ...(enSlug && {
        alternates: {
          languages: {
            es: `${BASE_URL}/blog/${post.slug}`,
            en: `${BASE_URL}/blog/en/${enSlug}`,
            'x-default': `${BASE_URL}/blog/${post.slug}`,
          },
        },
      }),
    };
  });

  // English blog posts with alternates
  const englishPosts = enPosts.map((post) => {
    const esSlug = getAlternateSlug(post.slug, 'en');
    return {
      url: `${BASE_URL}/blog/en/${post.slug}`,
      lastModified: post.date,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      ...(esSlug && {
        alternates: {
          languages: {
            en: `${BASE_URL}/blog/en/${post.slug}`,
            es: `${BASE_URL}/blog/${esSlug}`,
            'x-default': `${BASE_URL}/blog/${esSlug}`,
          },
        },
      }),
    };
  });

  // Tag pages (hreflang only when the tag exists in the other language)
  const esTags = getAllTags('es').map((tag) => {
    const encoded = encodeURIComponent(tag.toLowerCase());
    const hasEnVersion = getPostsByTag(tag, 'en').length > 0;
    return {
      url: `${BASE_URL}/blog/tag/${encoded}`,
      lastModified: latestDate(getPostsByTag(tag, 'es').map((p) => p.date), currentDate),
      changeFrequency: 'weekly' as const,
      priority: 0.4,
      ...(hasEnVersion && {
        alternates: {
          languages: {
            es: `${BASE_URL}/blog/tag/${encoded}`,
            en: `${BASE_URL}/blog/en/tag/${encoded}`,
            'x-default': `${BASE_URL}/blog/tag/${encoded}`,
          },
        },
      }),
    };
  });

  const enTags = getAllTags('en').map((tag) => {
    const encoded = encodeURIComponent(tag.toLowerCase());
    const hasEsVersion = getPostsByTag(tag, 'es').length > 0;
    return {
      url: `${BASE_URL}/blog/en/tag/${encoded}`,
      lastModified: latestDate(getPostsByTag(tag, 'en').map((p) => p.date), currentDate),
      changeFrequency: 'weekly' as const,
      priority: 0.4,
      ...(hasEsVersion && {
        alternates: {
          languages: {
            en: `${BASE_URL}/blog/en/tag/${encoded}`,
            es: `${BASE_URL}/blog/tag/${encoded}`,
            'x-default': `${BASE_URL}/blog/tag/${encoded}`,
          },
        },
      }),
    };
  });

  return [...staticPages, ...spanishPosts, ...englishPosts, ...esTags, ...enTags];
}
