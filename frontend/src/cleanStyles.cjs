const fs = require('fs');
const path = require('path');

const dirs = [
  path.join(__dirname, 'pages/analytics'),
  path.join(__dirname, 'components/analytics'),
  path.join(__dirname, 'pages/settings'),
  path.join(__dirname, 'pages/settings/components'),
  path.join(__dirname, 'pages/users'),
  path.join(__dirname, 'pages/countries'),
  path.join(__dirname, 'pages/data'),
];

function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Clean up common Neumorphism inline patterns by removing the whole box-shadow block entirely
      // because we are adding className="neu-card" instead, or just leaving them without inline box-shadows.
      let changed = false;

      // 1. Remove box-shadow lines that have isNeu
      const boxshadowRegex = /^\s*boxShadow:\s*(?:\(theme\)\s*=>\s*)?isNeu.*\n/gm;
      if (boxshadowRegex.test(content)) {
        content = content.replace(boxshadowRegex, '');
        changed = true;
      }
      
      // 2. Remove border lines with isNeu
      const borderRegex = /^\s*border:\s*isNeu.*\n/gm;
      if (borderRegex.test(content)) {
        content = content.replace(borderRegex, '');
        changed = true;
      }
      
      // 3. Remove background/bgcolor lines with isNeu
      const bgRegex = /^\s*(?:background|bgcolor):\s*isNeu.*\n/gm;
      if (bgRegex.test(content)) {
        content = content.replace(bgRegex, '');
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Cleaned legacy styles in ${fullPath}`);
      }
    }
  }
}

for (const dir of dirs) {
  processDirectory(dir);
}
console.log('Style cleanup complete.');
