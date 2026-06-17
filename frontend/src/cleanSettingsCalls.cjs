const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'pages/settings');
const componentsDir = path.join(dir, 'components');

const files = [
  path.join(dir, 'Settings.jsx'),
  path.join(componentsDir, 'AppearanceSettings.jsx'),
  path.join(componentsDir, 'HelpOverview.jsx'),
  path.join(componentsDir, 'NotificationSettings.jsx'),
  path.join(componentsDir, 'ProfileSettings.jsx')
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');

    // Remove isNeu declaration
    content = content.replace(/const isNeu = appearance\?\.neumorphism !== false;\s*/g, '');
    
    // Replace getSectionCardSx(isDark, isNeu, appearance.glassIntensity)
    content = content.replace(/getSectionCardSx\(isDark, isNeu, appearance\.glassIntensity\)/g, 'getSectionCardSx(isDark)');

    // Replace getTextFieldSx(isDark, isNeu)
    content = content.replace(/getTextFieldSx\(isDark, isNeu\)/g, 'getTextFieldSx()');

    // In ProfileSettings, SessionCard calls: isNeu={isNeu}
    content = content.replace(/ isNeu=\{isNeu\}/g, '');

    // In Settings.jsx, there are still some inline isNeu ternary operators for KPIs
    content = content.replace(/isNeu \? [^:]+ : ([^,;]+)/g, '$1');
    // For background/border/boxShadow inline that might still be there:
    content = content.replace(/border: isNeu \? '[^']+' : /g, 'border: ');

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Cleaned ${file}`);
  }
}
