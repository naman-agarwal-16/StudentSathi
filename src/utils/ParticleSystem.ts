/**
 * Particle system for shooting stars and comets
 * - White streaks every 3s, life 800ms, tail 80px, angle -15° to +15°
 * - Comet: 6px head + triangle tail, motion-blur 8px, 0.5% probability/sec
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  type: 'star' | 'comet';
  angle: number;
  tailLength: number;
}

export class ParticleSystem {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private particles: Particle[] = [];
  private lastSpawnTime: number = 0;
  private animationFrameId: number | null = null;
  private isLowEndDevice: boolean = false;
  private targetFPS: number = 60;
  private lastFrameTime: number = 0;
  private frameInterval: number;
  private handleResize: () => void;

  constructor(canvas: HTMLCanvasElement, isLowEndDevice: boolean = false) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: true });
    this.isLowEndDevice = isLowEndDevice;
    this.targetFPS = isLowEndDevice ? 30 : 60;
    this.frameInterval = 1000 / this.targetFPS;
    this.resizeCanvas();
    
    this.handleResize = this.handleResize.bind(this);
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
      this.lastFrameTime = Date.now();
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
    const now = Date.now();
    const deltaTime = now - this.lastFrameTime;

    // Throttle frame rate for low-end devices
    if (deltaTime < this.frameInterval) {
      this.animationFrameId = requestAnimationFrame(this.animate);
      return;
    }

    this.lastFrameTime = now - (deltaTime % this.frameInterval);

    this.update(deltaTime / 1000);
    this.render();
    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  private update(deltaTime: number): void {
    const now = Date.now();

    // Spawn shooting star every 3 seconds
    if (now - this.lastSpawnTime > 3000) {
      this.spawnShootingStar();
      this.lastSpawnTime = now;
    }

    // 0.5% probability per second for comet
    if (Math.random() < 0.005 * deltaTime * 1000) {
      this.spawnComet();
    }

    // Update particles
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
      
      if (particle.type === 'star') {
        this.drawShootingStar(particle, alpha);
      } else {
        this.drawComet(particle, alpha);
      }
    });
  }

  private drawShootingStar(particle: Particle, alpha: number): void {
    if (!this.ctx) return;

    const gradient = this.ctx.createLinearGradient(
      particle.x,
      particle.y,
      particle.x - particle.vx * 0.1,
      particle.y - particle.vy * 0.1
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

  private drawComet(particle: Particle, alpha: number): void {
    if (!this.ctx) return;

    // Apply motion blur effect
    this.ctx.filter = 'blur(8px)';

    // Draw head (6px circle)
    this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    this.ctx.beginPath();
    this.ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
    this.ctx.fill();

    // Draw triangle tail
    const gradient = this.ctx.createLinearGradient(
      particle.x,
      particle.y,
      particle.x - Math.cos(particle.angle) * particle.tailLength,
      particle.y - Math.sin(particle.angle) * particle.tailLength
    );

    gradient.addColorStop(0, `rgba(200, 220, 255, ${alpha * 0.8})`);
    gradient.addColorStop(1, `rgba(100, 150, 200, 0)`);

    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    
    const perpAngle = particle.angle + Math.PI / 2;
    const width = 8;
    
    this.ctx.moveTo(
      particle.x + Math.cos(perpAngle) * width,
      particle.y + Math.sin(perpAngle) * width
    );
    this.ctx.lineTo(
      particle.x - Math.cos(perpAngle) * width,
      particle.y - Math.sin(perpAngle) * width
    );
    this.ctx.lineTo(
      particle.x - Math.cos(particle.angle) * particle.tailLength,
      particle.y - Math.sin(particle.angle) * particle.tailLength
    );
    this.ctx.closePath();
    this.ctx.fill();

    // Reset filter
    this.ctx.filter = 'none';
  }

  private spawnShootingStar(): void {
    // Spawn from random edge with angle between -15° and +15° from horizontal
    const angle = (Math.random() * 30 - 15) * (Math.PI / 180);
    const speed = 200 + Math.random() * 200; // 200-400 px/s
    
    const x = Math.random() * this.canvas.width;
    const y = 0;

    this.particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.abs(Math.sin(angle) * speed), // Always downward
      life: 0.8, // 800ms
      maxLife: 0.8,
      type: 'star',
      angle,
      tailLength: 80,
    });
  }

  private spawnComet(): void {
    // Comets move diagonally across the screen
    const angle = (Math.random() * 30 - 15) * (Math.PI / 180) + Math.PI / 4;
    const speed = 150 + Math.random() * 100;
    
    const startSide = Math.random() > 0.5;
    const x = startSide ? 0 : this.canvas.width;
    const y = Math.random() * this.canvas.height * 0.5;

    this.particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed * (startSide ? 1 : -1),
      vy: Math.abs(Math.sin(angle) * speed),
      life: 1.5, // Comets live longer
      maxLife: 1.5,
      type: 'comet',
      angle,
      tailLength: 120,
    });
  }

  destroy(): void {
    this.stop();
    window.removeEventListener('resize', this.handleResize);
    this.particles = [];
  }
}
