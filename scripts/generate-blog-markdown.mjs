// Generates one Markdown file per blog post in public/blog-md/{es,en}/<slug>.md
// so LLMs and agents can ingest clean article content. Runs on `prebuild`.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const blogDir = path.join(root, 'src', 'content', 'blog');
const outBase = path.join(root, 'public', 'blog-md');

const BASE_URL = 'https://legasint.com';

let count = 0;

for (const locale of ['es', 'en']) {
  const localeDir = path.join(blogDir, locale);
  if (!fs.existsSync(localeDir)) continue;

  const outDir = path.join(outBase, locale);
  fs.mkdirSync(outDir, { recursive: true });

  const files = fs.readdirSync(localeDir).filter((f) => f.endsWith('.mdx'));

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, '');
    const raw = fs.readFileSync(path.join(localeDir, file), 'utf8');
    const { data, content } = matter(raw);

    const canonicalUrl =
      locale === 'en' ? `${BASE_URL}/blog/en/${slug}` : `${BASE_URL}/blog/${slug}`;

    const md = `---
title: "${(data.title || '').replace(/"/g, '\\"')}"
date: "${data.date || ''}"
language: "${locale}"
canonical: "${canonicalUrl}"
tags: [${(data.tags || []).map((t) => `"${String(t).replace(/"/g, '\\"')}"`).join(', ')}]
---

# ${data.title || slug}

${data.description || ''}

${content.trim()}
`;

    fs.writeFileSync(path.join(outDir, `${slug}.md`), md);
    count++;
  }
}

console.log(`blog-md: ${count} markdown files generated`);
