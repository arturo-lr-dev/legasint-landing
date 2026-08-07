const fs = require('fs');
const path = require('path');

const blogDirs = ['src/content/blog/es', 'src/content/blog/en'];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const newLines = [];
  let inCodeBlock = false;
  let inFrontmatter = false;
  let frontmatterDelimiterCount = 0;
  let modified = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Frontmatter handling: first two `---` delimiters
    if (frontmatterDelimiterCount < 2 && line.trim() === '---') {
      frontmatterDelimiterCount++;
      inFrontmatter = frontmatterDelimiterCount === 1;
      newLines.push(line);
      continue;
    }
    if (frontmatterDelimiterCount < 2) {
      // Still before frontmatter fully parsed (shouldn't happen for well-formed files)
      newLines.push(line);
      continue;
    }

    // Code block toggle
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      newLines.push(line);
      continue;
    }

    // Skip code blocks and indented code blocks
    if (inCodeBlock || /^( {4,}|\t)/.test(line)) {
      newLines.push(line);
      continue;
    }

    // Escape '<' to '&lt;' when not inside inline backticks
    const newLine = line.replace(/(`[^`]*`)|(<)/g, (match, codeSpan, lt) => {
      if (codeSpan !== undefined) return codeSpan;
      return '&lt;';
    });

    if (newLine !== line) {
      modified = true;
    }
    newLines.push(newLine);
  }

  if (modified) {
    fs.writeFileSync(filePath, newLines.join('\n'));
    console.log('Fixed: ' + path.basename(filePath));
  }
}

for (const dir of blogDirs) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));
  for (const file of files) {
    processFile(path.join(dir, file));
  }
}

console.log('Done');
