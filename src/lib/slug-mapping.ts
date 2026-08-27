import { getAllPosts, getPostBySlug } from './blog';

/**
 * Finds the alternate-language slug for a blog post using the explicit
 * `translationKey` frontmatter field shared by both language versions.
 * Returns null when the post has no translation.
 */
export function getAlternateSlug(slug: string, fromLocale: string): string | null {
  const targetLocale = fromLocale === 'es' ? 'en' : 'es';

  const sourcePost = getPostBySlug(slug, fromLocale);
  if (!sourcePost?.translationKey) return null;

  const targetPost = getAllPosts(targetLocale).find(
    (p) => p.translationKey === sourcePost.translationKey
  );
  return targetPost?.slug ?? null;
}
