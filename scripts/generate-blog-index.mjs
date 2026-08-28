// Generates src/data/blog-index.json: a pre-built index of all blog posts
// including metadata, raw content and serialized MDX. This eliminates the
// need to read, parse and serialize MDX files during the Next.js build,
// which was causing >60s static generation timeouts on Vercel.
// Runs automatically on `prebuild`.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const blogDir = path.join(root, 'src', 'content', 'blog');
const outDir = path.join(root, 'src', 'data');
const outFile = path.join(outDir, 'blog-index.json');

const WORDS_PER_MINUTE = 200;

function calculateReadingTime(content) {
  const text = content.replace(/[#*`\[\]()>_~|\\-]/g, '').trim();
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

async function buildLocale(locale) {
  const localeDir = path.join(blogDir, locale);
  if (!fs.existsSync(localeDir)) {
    return { posts: {}, allPosts: [], tags: [], postsByTag: {} };
  }

  const files = fs.readdirSync(localeDir).filter((f) => f.endsWith('.mdx'));
  const posts = {};
  const allPosts = [];

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, '');
    const raw = fs.readFileSync(path.join(localeDir, file), 'utf8');
    const { data, content } = matter(raw);

    const meta = {
      slug,
      title: data.title || '',
      date: data.date || '',
      description: data.description || '',
      tags: data.tags || [],
      image: data.image,
      author: data.author || 'Legasint',
      locale,
      readingTime: calculateReadingTime(content),
      translationKey: data.translationKey,
    };

    const serialized = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight, rehypeSlug],
      },
    });

    posts[slug] = {
      ...meta,
      content,
      serialized,
    };

    allPosts.push(meta);
  }

  allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const tagSet = new Set();
  const postsByTag = {};

  for (const post of allPosts) {
    for (const tag of post.tags) {
      const normalized = tag.toLowerCase();
      tagSet.add(tag);
      if (!postsByTag[normalized]) {
        postsByTag[normalized] = [];
      }
      postsByTag[normalized].push(post.slug);
    }
  }

  const tags = Array.from(tagSet).sort((a, b) => a.localeCompare(b));

  return { posts, allPosts, tags, postsByTag };
}

async function main() {
  const index = {
    es: await buildLocale('es'),
    en: await buildLocale('en'),
  };

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(index, null, 2));

  const esCount = Object.keys(index.es.posts).length;
  const enCount = Object.keys(index.en.posts).length;
  console.log(
    `blog-index.json: ${esCount} ES posts, ${enCount} EN posts, ${index.es.tags.length} ES tags, ${index.en.tags.length} EN tags`
  );
}

main().catch((err) => {
  console.error('Failed to generate blog index:', err);
  process.exit(1);
});
