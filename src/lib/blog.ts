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
  content: string;
  locale: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  image?: string;
  locale: string;
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
    content,
    locale,
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
