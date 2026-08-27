// Generates src/data/slug-map.json: a static map used by the client-side
// Header language switcher to resolve the alternate-language URL of the
// current page (blog posts via translationKey, tag pages via tag existence).
// Runs automatically on `prebuild`.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const blogDir = path.join(root, 'src', 'content', 'blog');

function readPosts(locale) {
  const dir = path.join(blogDir, locale);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf8');
      const { data } = matter(raw);
      return {
        slug: file.replace(/\.mdx$/, ''),
        translationKey: data.translationKey,
        tags: data.tags || [],
      };
    });
}

const esPosts = readPosts('es');
const enPosts = readPosts('en');

// posts: { "es:<slug>": "<en slug>", "en:<slug>": "<es slug>" }
const posts = {};
for (const esP of esPosts) {
  if (!esP.translationKey) continue;
  const enP = enPosts.find((p) => p.translationKey === esP.translationKey);
  if (!enP) continue;
  posts[`es:${esP.slug}`] = enP.slug;
  posts[`en:${enP.slug}`] = esP.slug;
}

// tags (lowercased, URL-encoded form matches the tag pages)
const tagsEs = [...new Set(esPosts.flatMap((p) => p.tags.map((t) => t.toLowerCase())))];
const tagsEn = [...new Set(enPosts.flatMap((p) => p.tags.map((t) => t.toLowerCase())))];

const outDir = path.join(root, 'src', 'data');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(
  path.join(outDir, 'slug-map.json'),
  JSON.stringify({ posts, tagsEs, tagsEn }, null, 2)
);

console.log(`slug-map.json: ${Object.keys(posts).length / 2} post pairs, ${tagsEs.length} ES tags, ${tagsEn.length} EN tags`);
