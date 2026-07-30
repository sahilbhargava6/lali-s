const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'app', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const colorMap = {
  '#EDE6D6': '#ffffff',
  '#2B2B28': '#111111',
  '#8C3B2E': '#D22027',
  '#B9924C': '#FFC000',
  '#4A4F52': '#555555',
  '#242421': '#1a1a1a',
  '#262623': '#1a1a1a',
  '#32322e': '#222222'
};

for (const [oldColor, newColor] of Object.entries(colorMap)) {
  const regex = new RegExp(oldColor, 'gi');
  content = content.replace(regex, newColor);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Colors replaced successfully.');
