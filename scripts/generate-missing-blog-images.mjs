// Generates PNG images for blog posts whose frontmatter `image:` points to
// a /blog-images/*.png file that does not exist. Uses the post title as text.
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'public', 'blog-images');

const gradients = [
  { from: '#1e3a8a', to: '#581c87' },
  { from: '#581c87', to: '#1e3a8a' },
  { from: '#0f172a', to: '#1e3a8a' },
  { from: '#1e3a8a', to: '#0e7490' },
  { from: '#581c87', to: '#0e7490' },
  { from: '#0f172a', to: '#581c87' },
];

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function wrapText(text, maxCharsPerLine = 28) {
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    if ((current + ' ' + word).trim().length > maxCharsPerLine && current) {
      lines.push(current.trim());
      current = word;
    } else {
      current = (current + ' ' + word).trim();
    }
  }
  if (current) lines.push(current.trim());
  return lines;
}

async function generateImage(slug, text, index) {
  const grad = gradients[index % gradients.length];
  const lines = wrapText(text);
  const lineHeight = 48;
  const startY = 200 - ((lines.length - 1) * lineHeight) / 2;

  const textElements = lines.map((line, i) =>
    `<text x="400" y="${startY + i * lineHeight}" text-anchor="middle" fill="white" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="700">${escapeXml(line)}</text>`
  ).join('\n    ');

  const svg = `<svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${grad.from}"/>
      <stop offset="100%" style="stop-color:${grad.to}"/>
    </linearGradient>
    <pattern id="circuit" patternUnits="userSpaceOnUse" width="100" height="100">
      <circle cx="10" cy="10" r="2" fill="rgba(255,255,255,0.08)"/>
      <circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.08)"/>
      <circle cx="90" cy="90" r="2" fill="rgba(255,255,255,0.08)"/>
      <line x1="10" y1="10" x2="50" y2="50" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
      <line x1="50" y1="50" x2="90" y2="90" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
      <line x1="50" y1="50" x2="90" y2="90" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="800" height="400" fill="url(#bg)"/>
  <rect width="800" height="400" fill="url(#circuit)"/>
  <rect x="40" y="40" width="720" height="320" rx="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <g>
    ${textElements}
  </g>
  <text x="400" y="${startY + lines.length * lineHeight + 20}" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="500">LEGASINT</text>
</svg>`;

  const outPath = path.join(outDir, `${slug}.png`);
  await sharp(Buffer.from(svg)).png().toFile(outPath);
  console.log(`  Generated: ${slug}.png`);
}

const blogDir = path.join(root, 'src', 'content', 'blog');
let index = 0;

for (const locale of ['es', 'en']) {
  const localeDir = path.join(blogDir, locale);
  if (!fs.existsSync(localeDir)) continue;

  const files = fs.readdirSync(localeDir).filter(f => f.endsWith('.mdx'));

  for (const file of files) {
    const content = fs.readFileSync(path.join(localeDir, file), 'utf8');
    const imageMatch = content.match(/^image:\s*"(\/blog-images\/[^"]+\.png)"/m);
    if (!imageMatch) continue;

    const imagePath = imageMatch[1];
    if (fs.existsSync(path.join(root, 'public', imagePath))) continue;

    const titleMatch = content.match(/^title:\s*"(.+?)"/m) || content.match(/^title:\s*(.+?)$/m);
    const text = titleMatch ? titleMatch[1] : file.replace('.mdx', '');
    const imageSlug = path.basename(imagePath, '.png');
    await generateImage(imageSlug, text, index++);
    console.log(`  (for ${locale}/${file})`);
  }
}

console.log('\nDone! Missing blog images generated.');
