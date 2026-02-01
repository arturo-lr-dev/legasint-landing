import { MetadataRoute } from 'next';
import { getPostSlugs } from '@/lib/blog';

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
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog/en`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Spanish blog posts
  const spanishPosts = getPostSlugs('es').map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // English blog posts
  const englishPosts = getPostSlugs('en').map((slug) => ({
    url: `${BASE_URL}/blog/en/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...spanishPosts, ...englishPosts];
}
