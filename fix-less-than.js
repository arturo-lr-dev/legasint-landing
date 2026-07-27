const fs = require('fs');
const path = require('path');

// Fix ALL < patterns in blog files
const blogDirs = ['src/content/blog/es', 'src/content/blog/en'];
for (const dir of blogDirs) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));
  for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    const lines = content.split('\n');
    const newLines = lines.map(line => {
      // Skip code blocks
      if (line.trim().startsWith('```')) return line;
      
      let newLine = line;
      
      // Fix <NUMBER patterns not in backticks
      // Match: < followed by optional space, then number
      newLine = newLine.replace(/<\s*(\d)/g, '`<$1`');
      
      if (newLine !== line) {
        modified = true;
      }
      return newLine;
    });
    
    if (modified) {
      fs.writeFileSync(filePath, newLines.join('\n'));
      console.log('Fixed: ' + file);
    }
  }
}
console.log('Done');
