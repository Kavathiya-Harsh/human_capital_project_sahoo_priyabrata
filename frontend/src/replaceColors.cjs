const fs = require('fs');
const path = require('path');

const directories = [
  path.join(__dirname, 'components/dashboard'),
  path.join(__dirname, 'components/charts'),
  path.join(__dirname, 'components/analytics'),
  path.join(__dirname, 'pages/analytics'),
  path.join(__dirname, 'pages/dashboard'),
];

const colorMap = {
  // Replace Indigo
  '#6366F1': '#10B981',
  '#6366f1': '#10b981',
  'rgba(99,102,241': 'rgba(16,185,129',
  'rgba(99, 102, 241': 'rgba(16, 185, 129',
  
  // Replace Fuchsia
  '#EC4899': '#00E5FF',
  '#ec4899': '#00e5ff',
  'rgba(236,72,153': 'rgba(0,229,255',
  'rgba(236, 72, 153': 'rgba(0, 229, 255',
  
  // Replace Indigo variant 818CF8
  '#818CF8': '#34D399',
  '#818cf8': '#34d399',
};

function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      
      for (const [oldColor, newColor] of Object.entries(colorMap)) {
        // Simple string replacement using regex for global replace
        const regex = new RegExp(oldColor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        if (regex.test(content)) {
          content = content.replace(regex, newColor);
          changed = true;
        }
      }
      
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated colors in ${fullPath}`);
      }
    }
  }
}

for (const dir of directories) {
  processDirectory(dir);
}
console.log('Color replacement complete.');
