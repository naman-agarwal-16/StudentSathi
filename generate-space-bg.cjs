/**
 * Node.js script to generate 4K space background using canvas
 * Run: node generate-space-bg.cjs
 * Specifications: 6000 white stars (1-3px), soft teal nebula, < 200KB WebP
 */

const { createCanvas } = require('canvas');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Create 4K canvas (3840 x 2160)
const canvas = createCanvas(3840, 2160);
const ctx = canvas.getContext('2d');

// Base: Deep space black
ctx.fillStyle = '#000000';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Draw soft teal nebula gradient
function drawNebula() {
  // Main teal nebula - soft and subtle
  const nebula = ctx.createRadialGradient(
    canvas.width * 0.5,
    canvas.height * 0.5,
    0,
    canvas.width * 0.5,
    canvas.height * 0.5,
    Math.max(canvas.width, canvas.height) * 0.6
  );
  
  nebula.addColorStop(0, hexToRgba('#00796B', 0.15));
  nebula.addColorStop(0.3, hexToRgba('#004D40', 0.08));
  nebula.addColorStop(0.6, hexToRgba('#00695C', 0.04));
  nebula.addColorStop(1, 'transparent');

  ctx.fillStyle = nebula;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Draw 6000 random stars (1-3px white with random brightness)
function drawRandomStars() {
  for (let i = 0; i < 6000; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    // Size distribution: 95% are 1px, 4% are 2px, 1% are 3px
    const size = Math.random() < 0.95 ? 1 : Math.random() < 0.98 ? 2 : 3;
    // Random brightness between 0.3 and 1.0
    const alpha = 0.3 + Math.random() * 0.7;
    
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fillRect(Math.floor(x), Math.floor(y), size, size);
  }
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

// Convert to WebP with compression targeting < 200KB
sharp(pngPath)
  .webp({ quality: 80, effort: 6 })
  .toFile(webpPath)
  .then(info => {
    const webpSizeKB = (info.size / 1024).toFixed(2);
    const isWithinTarget = info.size < 200 * 1024;
    console.log(`✓ Converted to WebP: ${webpSizeKB} KB ${isWithinTarget ? '(within 200KB target!)' : '(needs more compression)'}`);
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
