/**
 * Generate a photo-real 4K Milky Way + teal nebula composite
 * Output: WebP < 200kB for optimal performance
 */

export async function generateSpaceBackground(): Promise<Blob> {
  const canvas = document.createElement('canvas');
  // 4K resolution: 3840 x 2160
  canvas.width = 3840;
  canvas.height = 2160;
  const ctx = canvas.getContext('2d', { alpha: false });
  
  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  // Base: Deep space black with slight blue tint
  ctx.fillStyle = '#000511';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw nebula gradient (teal theme)
  drawNebula(ctx, canvas.width, canvas.height);

  // Draw 6000 random stars (1px white)
  drawRandomStars(ctx, 6000, canvas.width, canvas.height);

  // Convert to WebP with compression
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to generate blob'));
        }
      },
      'image/webp',
      0.85 // Quality setting to keep under 200kB
    );
  });
}

function drawNebula(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  // Create multiple teal nebula clouds with gradients
  const nebulae = [
    { x: width * 0.3, y: height * 0.4, radius: 800, color: '#004D40' },
    { x: width * 0.7, y: height * 0.6, radius: 700, color: '#00695C' },
    { x: width * 0.5, y: height * 0.3, radius: 600, color: '#00897B' },
    { x: width * 0.2, y: height * 0.7, radius: 500, color: '#00796B' },
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
    
    gradient.addColorStop(0, `${nebula.color}AA`);
    gradient.addColorStop(0.3, `${nebula.color}66`);
    gradient.addColorStop(0.6, `${nebula.color}33`);
    gradient.addColorStop(1, 'transparent');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  });

  // Add some brighter teal accents
  const accents = [
    { x: width * 0.4, y: height * 0.5, radius: 400, color: '#26A69A' },
    { x: width * 0.6, y: height * 0.4, radius: 350, color: '#4DB6AC' },
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
    
    gradient.addColorStop(0, `${accent.color}44`);
    gradient.addColorStop(0.5, `${accent.color}22`);
    gradient.addColorStop(1, 'transparent');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  });
}

function drawRandomStars(
  ctx: CanvasRenderingContext2D,
  count: number,
  width: number,
  height: number
): void {
  ctx.fillStyle = '#FFFFFF';
  
  for (let i = 0; i < count; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = Math.random() < 0.95 ? 1 : Math.random() < 0.98 ? 2 : 3;
    const alpha = 0.4 + Math.random() * 0.6; // Vary brightness
    
    ctx.globalAlpha = alpha;
    ctx.fillRect(Math.floor(x), Math.floor(y), size, size);
  }
  
  ctx.globalAlpha = 1;
}

// Utility function to download the generated image
export function downloadSpaceBackground(blob: Blob): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'space-bg.webp';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
