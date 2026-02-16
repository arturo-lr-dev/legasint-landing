import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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
}

const WORDS_PER_MINUTE = 200;

function calculateReadingTime(content: string): number {
  const text = content.replace(/[#*`\[\]()>_~|\\-]/g, '').trim();
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

const contentDirectory = path.join(process.cwd(), 'src/content/blog');

export function getPostSlugs(locale: string = 'es'): string[] {
  const localeDir = path.join(contentDirectory, locale);

  if (!fs.existsSync(localeDir)) {
    return [];
  }

  return fs.readdirSync(localeDir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export function getPostBySlug(slug: string, locale: string = 'es'): BlogPost | null {
  const filePath = path.join(contentDirectory, locale, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    description: data.description || '',
    tags: data.tags || [],
    image: data.image,
    author: data.author || 'Legasint',
    content,
    locale,
    readingTime: calculateReadingTime(content),
  };
}

export function getAllPosts(locale: string = 'es'): BlogPostMeta[] {
  const slugs = getPostSlugs(locale);

  const posts = slugs
    .map((slug) => {
      const post = getPostBySlug(slug, locale);
      if (!post) return null;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { content: _, ...meta } = post;
      return meta;
    })
    .filter((post): post is BlogPostMeta => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getAllPostsAllLocales(): BlogPostMeta[] {
  const locales = ['es', 'en'];
  const allPosts: BlogPostMeta[] = [];

  for (const locale of locales) {
    const posts = getAllPosts(locale);
    allPosts.push(...posts);
  }

  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAvailableLocales(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  return fs.readdirSync(contentDirectory)
    .filter((item) => fs.statSync(path.join(contentDirectory, item)).isDirectory());
}

export interface AdjacentPosts {
  previous: BlogPostMeta | null;
  next: BlogPostMeta | null;
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
  const posts = getAllPosts(locale);
  const tagSet = new Set<string>();
  for (const post of posts) {
    for (const tag of post.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
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

export function getPostsByTag(tag: string, locale: string = 'es'): BlogPostMeta[] {
  const posts = getAllPosts(locale);
  return posts.filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
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
