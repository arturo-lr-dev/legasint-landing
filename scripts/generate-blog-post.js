#!/usr/bin/env node

/**
 * generate-blog-post.js
 * 
 * Generates a bilingual blog post from blog-ideas.json
 * Usage: node scripts/generate-blog-post.js [--id <idea-id>]
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

const IDEAS_FILE = path.join(__dirname, '..', 'blog-ideas.json');
const BLOG_DIR_ES = path.join(__dirname, '..', 'src', 'content', 'blog', 'es');
const BLOG_DIR_EN = path.join(__dirname, '..', 'src', 'content', 'blog', 'en');

async function loadIdeas() {
  const data = fs.readFileSync(IDEAS_FILE, 'utf8');
  return JSON.parse(data);
}

async function saveIdeas(data) {
  fs.writeFileSync(IDEAS_FILE, JSON.stringify(data, null, 2), 'utf8');
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[áàäâ]/g, 'a')
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i')
    .replace(/[óòöô]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function generatePost(idea) {
  const today = new Date().toISOString().split('T')[0];
  const filenameES = slugify(idea.title.es) + '.mdx';
  const filenameEN = slugify(idea.title.en) + '.mdx';
  
  console.log(`\n📝 Generating post: ${idea.title.es}`);
  console.log(`   ES: ${filenameES}`);
  console.log(`   EN: ${filenameEN}`);
  
  // Create prompt for Claude
  const prompt = `Create a bilingual blog post (Spanish + English) about:

**Spanish Title:** ${idea.title.es}
**English Title:** ${idea.title.en}
**Description:** ${idea.description}
**Category:** ${idea.category}
**Audience:** ${idea.audience}
**Keywords:** ${idea.keywords.join(', ')}

Requirements:
1. Write TWO separate posts (one in Spanish, one in English)
2. Professional tone for legal/tech audience
3. ~1,000-1,200 words each
4. Practical, actionable content
5. Use MDX format with frontmatter

Spanish frontmatter:
---
title: "${idea.title.es}"
description: "${idea.description}"
pubDate: "${today}"
author: "LegaSint"
tags: ${JSON.stringify(idea.keywords)}
lang: "es"
---

English frontmatter:
---
title: "${idea.title.en}"
description: "${idea.description}"
pubDate: "${today}"
author: "LegaSint"
tags: ${JSON.stringify(idea.keywords)}
lang: "en"
---

Save as:
- Spanish: ${BLOG_DIR_ES}/${filenameES}
- English: ${BLOG_DIR_EN}/${filenameEN}`;

  console.log('\n🤖 Sending to Claude...\n');
  console.log(prompt);
  console.log('\n⚠️  Manual generation required. Use claude-code or main OpenClaw session to generate the posts.');
  console.log('\n✅ After generation, run: node scripts/mark-idea-published.js --id ' + idea.id);
  
  return { filenameES, filenameEN };
}

async function main() {
  const args = process.argv.slice(2);
  const idIndex = args.indexOf('--id');
  const requestedId = idIndex !== -1 ? parseInt(args[idIndex + 1]) : null;

  const data = await loadIdeas();
  const pending = data.ideas.filter(i => i.status === 'pending');
  
  if (pending.length === 0) {
    console.log('❌ No pending ideas found!');
    return;
  }

  let idea;
  if (requestedId) {
    idea = pending.find(i => i.id === requestedId);
    if (!idea) {
      console.log(`❌ Idea ID ${requestedId} not found or not pending`);
      return;
    }
  } else {
    // Pick random pending idea
    idea = pending[Math.floor(Math.random() * pending.length)];
  }

  await generatePost(idea);
}

main().catch(console.error);
