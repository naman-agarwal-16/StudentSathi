/**
 * Simplified particle system for realistic shooting stars
 * - White 2px head with 80px tapered tail
 * - Appears every 12 seconds
 * - Life: 0.8s, angle: -15° to +15°
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  angle: number;
  tailLength: number;
}

export class ParticleSystem {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private particles: Particle[] = [];
  private lastSpawnTime: number = 0;
  private animationFrameId: number | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: true });
    this.resizeCanvas();
    
    window.addEventListener('resize', this.handleResize);
  }

  private handleResize = (): void => {
    this.resizeCanvas();
  };

  private resizeCanvas(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  start(): void {
    if (this.animationFrameId === null) {
      this.lastSpawnTime = Date.now();
      this.animate();
    }
  }

  stop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  private animate = (): void => {
    this.update();
    this.render();
    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  private update(): void {
    const now = Date.now();

    // Spawn shooting star every 12 seconds
    if (now - this.lastSpawnTime >= 12000) {
      this.spawnShootingStar();
      this.lastSpawnTime = now;
    }

    // Update particles (16ms frame time approximation)
    const deltaTime = 0.016;
    this.particles = this.particles.filter((particle) => {
      particle.life -= deltaTime;
      if (particle.life <= 0) return false;

      particle.x += particle.vx * deltaTime;
      particle.y += particle.vy * deltaTime;

      return true;
    });
  }

  private render(): void {
    if (!this.ctx) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((particle) => {
      const alpha = particle.life / particle.maxLife;
      this.drawShootingStar(particle, alpha);
    });
  }

  private drawShootingStar(particle: Particle, alpha: number): void {
    if (!this.ctx) return;

    const gradient = this.ctx.createLinearGradient(
      particle.x,
      particle.y,
      particle.x - Math.cos(particle.angle) * particle.tailLength,
      particle.y - Math.sin(particle.angle) * particle.tailLength
    );

    gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
    gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

    this.ctx.strokeStyle = gradient;
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = 'round';

    this.ctx.beginPath();
    this.ctx.moveTo(particle.x, particle.y);
    this.ctx.lineTo(
      particle.x - Math.cos(particle.angle) * particle.tailLength,
      particle.y - Math.sin(particle.angle) * particle.tailLength
    );
    this.ctx.stroke();
  }

  private spawnShootingStar(): void {
    // Spawn from top of screen with angle between -15° and +15°
    const angle = (Math.random() * 30 - 15) * (Math.PI / 180);
    const speed = 300 + Math.random() * 200; // 300-500 px/s
    
    const x = Math.random() * this.canvas.width;
    const y = 0;

    this.particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.abs(Math.sin(angle) * speed), // Always downward
      life: 0.8, // 800ms
      maxLife: 0.8,
      angle,
      tailLength: 80,
    });
  }

  destroy(): void {
    this.stop();
    window.removeEventListener('resize', this.handleResize);
    this.particles = [];
  }
}
