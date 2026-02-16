import { MetadataRoute } from 'next';
import { getPostSlugs, getAllTags } from '@/lib/blog';
import { getAlternateSlug } from '@/lib/slug-mapping';

export const dynamic = 'force-static';

const BASE_URL = 'https://legasint.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

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
          en: BASE_URL,
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
        },
      },
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          es: `${BASE_URL}/blog`,
          en: `${BASE_URL}/blog/en`,
        },
      },
    },
    {
      url: `${BASE_URL}/blog/en`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${BASE_URL}/blog/en`,
          es: `${BASE_URL}/blog`,
        },
      },
    },
  ];

  // Spanish blog posts with alternates
  const spanishPosts = getPostSlugs('es').map((slug) => {
    const enSlug = getAlternateSlug(slug, 'es');
    return {
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      ...(enSlug && {
        alternates: {
          languages: {
            es: `${BASE_URL}/blog/${slug}`,
            en: `${BASE_URL}/blog/en/${enSlug}`,
          },
        },
      }),
    };
  });

  // English blog posts with alternates
  const englishPosts = getPostSlugs('en').map((slug) => {
    const esSlug = getAlternateSlug(slug, 'en');
    return {
      url: `${BASE_URL}/blog/en/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      ...(esSlug && {
        alternates: {
          languages: {
            en: `${BASE_URL}/blog/en/${slug}`,
            es: `${BASE_URL}/blog/${esSlug}`,
          },
        },
      }),
    };
  });

  // Tag pages
  const esTags = getAllTags('es').map((tag) => ({
    url: `${BASE_URL}/blog/tag/${encodeURIComponent(tag.toLowerCase())}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.4,
  }));

  const enTags = getAllTags('en').map((tag) => ({
    url: `${BASE_URL}/blog/en/tag/${encodeURIComponent(tag.toLowerCase())}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.4,
  }));

  return [...staticPages, ...spanishPosts, ...englishPosts, ...esTags, ...enTags];
}
