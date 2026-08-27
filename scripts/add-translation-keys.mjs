// One-off script: pairs ES<->EN blog posts and writes a shared `translationKey`
// into the frontmatter of both posts. Pairing strategy:
//   1. Group posts by exact publication date.
//   2. If a date has exactly 1 ES and 1 EN post -> direct pair.
//   3. Otherwise, greedy assignment by similarity score
//      (slug token overlap + content length similarity).
// The ES slug is used as the canonical translationKey value.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');

function readPosts(locale) {
  const dir = path.join(blogDir, locale);
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf8');
      const { data, content } = matter(raw);
      return {
        locale,
        file,
        slug: file.replace(/\.mdx$/, ''),
        date: data.date || '',
        title: data.title || '',
        words: content.split(/\s+/).filter(Boolean).length,
        raw,
        data,
        content,
      };
    });
}

function slugTokens(slug) {
  return new Set(slug.split('-').filter(Boolean));
}

function tokenSimilarity(a, b) {
  const ta = slugTokens(a);
  const tb = slugTokens(b);
  let shared = 0;
  for (const t of ta) {
    if (tb.has(t)) shared += /^\d+$/.test(t) || t.length <= 3 ? 2 : 1; // numbers/acronyms weigh double
  }
  return shared / Math.max(ta.size, tb.size);
}

function lengthSimilarity(a, b) {
  return 1 - Math.abs(a - b) / Math.max(a, b);
}

function score(esPost, enPost) {
  return 0.65 * tokenSimilarity(esPost.slug, enPost.slug) + 0.35 * lengthSimilarity(esPost.words, enPost.words);
}

const esPosts = readPosts('es');
const enPosts = readPosts('en');

// Group by date
const dates = new Map();
for (const p of [...esPosts, ...enPosts]) {
  if (!dates.has(p.date)) dates.set(p.date, { es: [], en: [] });
  dates.get(p.date)[p.locale].push(p);
}

const pairs = []; // { es, en }

for (const [, group] of dates) {
  if (group.es.length === 1 && group.en.length === 1) {
    pairs.push({ es: group.es[0], en: group.en[0] });
    continue;
  }
  // Greedy assignment by score
  const candidates = [];
  for (const esP of group.es) {
    for (const enP of group.en) {
      candidates.push({ es: esP, en: enP, s: score(esP, enP) });
    }
  }
  candidates.sort((a, b) => b.s - a.s);
  const usedEs = new Set();
  const usedEn = new Set();
  for (const c of candidates) {
    if (usedEs.has(c.es.slug) || usedEn.has(c.en.slug)) continue;
    usedEs.add(c.es.slug);
    usedEn.add(c.en.slug);
    pairs.push({ es: c.es, en: c.en });
  }
}

// Write translationKey (ES slug as canonical key) into both posts
let written = 0;
for (const { es, en } of pairs) {
  const key = es.slug;
  for (const post of [es, en]) {
    const newData = { ...post.data, translationKey: key };
    const out = matter.stringify(post.content, newData);
    fs.writeFileSync(path.join(blogDir, post.locale, post.file), out);
    written++;
  }
}

const pairedEs = new Set(pairs.map((p) => p.es.slug));
const pairedEn = new Set(pairs.map((p) => p.en.slug));
const unpairedEs = esPosts.filter((p) => !pairedEs.has(p.slug));
const unpairedEn = enPosts.filter((p) => !pairedEn.has(p.slug));

console.log(`Pairs created: ${pairs.length} (${written} files updated)`);
console.log(`Unpaired ES (${unpairedEs.length}):`);
unpairedEs.forEach((p) => console.log(`  - ${p.slug} (${p.date})`));
console.log(`Unpaired EN (${unpairedEn.length}):`);
unpairedEn.forEach((p) => console.log(`  - ${p.slug} (${p.date})`));
