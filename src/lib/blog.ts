import fs from 'fs';
import path from 'path';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  image?: string;
  author: string;
  content: string;
  locale: string;
  readingTime: number;
  translationKey?: string;
  serialized?: MDXRemoteSerializeResult;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  image?: string;
  author: string;
  locale: string;
  readingTime: number;
  translationKey?: string;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface AdjacentPosts {
  previous: BlogPostMeta | null;
  next: BlogPostMeta | null;
}

interface LocaleIndex {
  posts: Record<string, BlogPost>;
  allPosts: BlogPostMeta[];
  tags: string[];
  postsByTag: Record<string, string[]>;
}

interface BlogIndex {
  es: LocaleIndex;
  en: LocaleIndex;
}

function loadIndex(): BlogIndex {
  const indexPath = path.join(process.cwd(), 'src', 'data', 'blog-index.json');

  if (!fs.existsSync(indexPath)) {
    throw new Error(
      `Blog index not found at ${indexPath}. Run "npm run prebuild" (or "node scripts/generate-blog-index.mjs") before building or starting the dev server.`
    );
  }

  const raw = fs.readFileSync(indexPath, 'utf8');
  return JSON.parse(raw) as BlogIndex;
}

const blogIndex = loadIndex();

function getLocaleIndex(locale: string = 'es'): LocaleIndex {
  const index = blogIndex[locale as keyof BlogIndex];
  if (!index) {
    throw new Error(`Unsupported blog locale: ${locale}`);
  }
  return index;
}

export function getPostSlugs(locale: string = 'es'): string[] {
  return getLocaleIndex(locale).allPosts.map((post) => post.slug);
}

export function getPostBySlug(slug: string, locale: string = 'es'): BlogPost | null {
  return getLocaleIndex(locale).posts[slug] ?? null;
}

export function getAllPosts(locale: string = 'es'): BlogPostMeta[] {
  return getLocaleIndex(locale).allPosts;
}

export function getAllPostsAllLocales(): BlogPostMeta[] {
  const allPosts: BlogPostMeta[] = [...blogIndex.es.allPosts, ...blogIndex.en.allPosts];
  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAvailableLocales(): string[] {
  return ['es', 'en'];
}

export function getAdjacentPosts(slug: string, locale: string = 'es'): AdjacentPosts {
  const allPosts = getAllPosts(locale);
  const currentIndex = allPosts.findIndex((post) => post.slug === slug);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  // Posts are sorted by date DESC (newest first)
  // "Next" = newer post (index - 1)
  // "Previous" = older post (index + 1)
  const next = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const previous = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return { previous, next };
}

export function getAllTags(locale: string = 'es'): string[] {
  return getLocaleIndex(locale).tags;
}

export function getPostsByTag(tag: string, locale: string = 'es'): BlogPostMeta[] {
  const index = getLocaleIndex(locale);
  const slugs = index.postsByTag[tag.toLowerCase()] ?? [];
  return slugs
    .map((slug) => index.posts[slug])
    .filter((post): post is BlogPost => Boolean(post))
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
      description: post.description,
      tags: post.tags,
      image: post.image,
      author: post.author,
      locale: post.locale,
      readingTime: post.readingTime,
      translationKey: post.translationKey,
    }));
}

export function extractHeadings(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].replace(/[*`\[\]()]/g, '').trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    items.push({ id, text, level });
  }

  return items;
}

export function getRelatedPosts(slug: string, locale: string = 'es', limit: number = 3): BlogPostMeta[] {
  const currentPost = getPostBySlug(slug, locale);
  if (!currentPost) return [];

  const allPosts = getAllPosts(locale).filter((p) => p.slug !== slug);

  // Score posts by number of shared tags
  const scored = allPosts.map((post) => {
    const sharedTags = post.tags.filter((tag) =>
      currentPost.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
    ).length;
    return { post, score: sharedTags };
  });

  // Sort by score (desc), then by date (desc)
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
  });

  return scored.filter((s) => s.score > 0).slice(0, limit).map((s) => s.post);
}
