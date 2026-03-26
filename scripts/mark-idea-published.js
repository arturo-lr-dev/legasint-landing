#!/usr/bin/env node

/**
 * mark-idea-published.js
 * 
 * Marks a blog idea as published in blog-ideas.json
 * Usage: node scripts/mark-idea-published.js --id <idea-id> --files file1.mdx,file2.mdx
 */

const fs = require('fs');
const path = require('path');

const IDEAS_FILE = path.join(__dirname, '..', 'blog-ideas.json');

async function main() {
  const args = process.argv.slice(2);
  const idIndex = args.indexOf('--id');
  const filesIndex = args.indexOf('--files');
  
  if (idIndex === -1) {
    console.error('❌ Missing --id parameter');
    process.exit(1);
  }

  const id = parseInt(args[idIndex + 1]);
  const files = filesIndex !== -1 ? args[filesIndex + 1].split(',') : [];

  const data = JSON.parse(fs.readFileSync(IDEAS_FILE, 'utf8'));
  const idea = data.ideas.find(i => i.id === id);

  if (!idea) {
    console.error(`❌ Idea ID ${id} not found`);
    process.exit(1);
  }

  if (idea.status === 'published') {
    console.log(`⚠️  Idea ID ${id} is already published`);
    return;
  }

  idea.status = 'published';
  idea.publishedDate = new Date().toISOString().split('T')[0];
  if (files.length > 0) {
    idea.files = files;
  }

  fs.writeFileSync(IDEAS_FILE, JSON.stringify(data, null, 2), 'utf8');
  
  console.log(`✅ Idea ID ${id} marked as published`);
  console.log(`   Title: ${idea.title.es} / ${idea.title.en}`);
  console.log(`   Date: ${idea.publishedDate}`);
  if (idea.files) {
    console.log(`   Files: ${idea.files.join(', ')}`);
  }
}

main().catch(console.error);
