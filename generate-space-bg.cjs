/**
 * Node.js script to generate 4K space background using canvas
 * Run: node generate-space-bg.cjs
 */

const { createCanvas } = require('canvas');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Create 4K canvas (3840 x 2160)
const canvas = createCanvas(3840, 2160);
const ctx = canvas.getContext('2d');

// Base: Deep space black with slight blue tint
ctx.fillStyle = '#000511';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Draw nebula gradient (teal theme)
function drawNebula() {
  const nebulae = [
    { x: canvas.width * 0.3, y: canvas.height * 0.4, radius: 800, color: '#004D40' },
    { x: canvas.width * 0.7, y: canvas.height * 0.6, radius: 700, color: '#00695C' },
    { x: canvas.width * 0.5, y: canvas.height * 0.3, radius: 600, color: '#00897B' },
    { x: canvas.width * 0.2, y: canvas.height * 0.7, radius: 500, color: '#00796B' },
  ];

  nebulae.forEach((nebula) => {
    const gradient = ctx.createRadialGradient(
      nebula.x,
      nebula.y,
      0,
      nebula.x,
      nebula.y,
      nebula.radius
    );
    
    gradient.addColorStop(0, hexToRgba(nebula.color, 0.67));
    gradient.addColorStop(0.3, hexToRgba(nebula.color, 0.40));
    gradient.addColorStop(0.6, hexToRgba(nebula.color, 0.20));
    gradient.addColorStop(1, 'transparent');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });

  // Add some brighter teal accents
  const accents = [
    { x: canvas.width * 0.4, y: canvas.height * 0.5, radius: 400, color: '#26A69A' },
    { x: canvas.width * 0.6, y: canvas.height * 0.4, radius: 350, color: '#4DB6AC' },
  ];

  accents.forEach((accent) => {
    const gradient = ctx.createRadialGradient(
      accent.x,
      accent.y,
      0,
      accent.x,
      accent.y,
      accent.radius
    );
    
    gradient.addColorStop(0, hexToRgba(accent.color, 0.27));
    gradient.addColorStop(0.5, hexToRgba(accent.color, 0.13));
    gradient.addColorStop(1, 'transparent');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });
}

// Draw 6000 random stars (1px white)
function drawRandomStars() {
  ctx.fillStyle = '#FFFFFF';
  
  for (let i = 0; i < 6000; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() < 0.95 ? 1 : Math.random() < 0.98 ? 2 : 3;
    const alpha = 0.4 + Math.random() * 0.6; // Vary brightness
    
    ctx.globalAlpha = alpha;
    ctx.fillRect(Math.floor(x), Math.floor(y), size, size);
  }
  
  ctx.globalAlpha = 1;
}

function hexToRgba(hex, alpha) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return 'transparent';
  
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Generate the background
console.log('Generating 4K space background...');
drawNebula();
drawRandomStars();

// Save as PNG first
const pngPath = path.join(__dirname, 'public', 'images', 'space-bg.png');
const webpPath = path.join(__dirname, 'public', 'images', 'space-bg.webp');
const buffer = canvas.toBuffer('image/png');

// Ensure directory exists
const dir = path.dirname(pngPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(pngPath, buffer);
const pngSizeKB = (buffer.length / 1024).toFixed(2);
console.log(`✓ Generated PNG: ${pngSizeKB} KB`);

// Convert to WebP with compression
sharp(pngPath)
  .webp({ quality: 85, effort: 6 })
  .toFile(webpPath)
  .then(info => {
    const webpSizeKB = (info.size / 1024).toFixed(2);
    console.log(`✓ Converted to WebP: ${webpSizeKB} KB (${info.size < 200 * 1024 ? 'within target!' : 'needs more compression'})`);
    console.log(`  Saved to: ${webpPath}`);
    
    // Delete PNG only after successful WebP conversion
    try {
      fs.unlinkSync(pngPath);
      console.log(`  Cleaned up PNG file`);
    } catch (err) {
      console.warn(`  Warning: Could not delete PNG file: ${err.message}`);
    }
  })
  .catch(err => {
    console.error('Error converting to WebP:', err);
    console.log(`  PNG file retained at: ${pngPath}`);
  });
