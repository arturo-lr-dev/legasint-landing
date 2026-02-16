import { getAllPosts } from './blog';

/**
 * Automatically finds the alternate-language slug for a blog post
 * by matching posts with the same publication date.
 */
export function getAlternateSlug(slug: string, fromLocale: string): string | null {
  const targetLocale = fromLocale === 'es' ? 'en' : 'es';

  const sourcePosts = getAllPosts(fromLocale);
  const targetPosts = getAllPosts(targetLocale);

  const sourcePost = sourcePosts.find((p) => p.slug === slug);
  if (!sourcePost) return null;

  const targetPost = targetPosts.find((p) => p.date === sourcePost.date);
  return targetPost?.slug ?? null;
}
