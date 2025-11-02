/**
 * Cursor light-sphere effect
 * - 24px radial-gradient white, blur 12px, opacity 0.6
 * - RAF with mouse tracking, hide on idle >1s
 */

export class CursorLightSphere {
  private element: HTMLDivElement;
  private isVisible: boolean = false;
  private lastMoveTime: number = 0;
  private idleTimeout: number = 1000; // 1 second
  private animationFrameId: number | null = null;
  private currentX: number = 0;
  private currentY: number = 0;
  private targetX: number = 0;
  private targetY: number = 0;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'cursor-light-sphere';
    this.setupStyles();
    document.body.appendChild(this.element);
    
    this.bindEvents();
    this.animate();
  }

  private setupStyles(): void {
    this.element.style.cssText = `
      position: fixed;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%);
      filter: blur(12px);
      pointer-events: none;
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.3s ease;
      transform: translate(-50%, -50%);
      will-change: transform, opacity;
    `;
  }

  private bindEvents(): void {
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseenter', this.handleMouseEnter);
    document.addEventListener('mouseleave', this.handleMouseLeave);
  }

  private handleMouseMove = (e: MouseEvent): void => {
    this.targetX = e.clientX;
    this.targetY = e.clientY;
    this.lastMoveTime = Date.now();

    if (!this.isVisible) {
      this.show();
    }
  };

  private handleMouseEnter = (): void => {
    this.show();
  };

  private handleMouseLeave = (): void => {
    this.hide();
  };

  private show(): void {
    this.isVisible = true;
    this.element.style.opacity = '1';
  }

  private hide(): void {
    this.isVisible = false;
    this.element.style.opacity = '0';
  }

  private animate = (): void => {
    // Smooth interpolation for cursor position
    const lerp = (start: number, end: number, factor: number): number => {
      return start + (end - start) * factor;
    };

    this.currentX = lerp(this.currentX, this.targetX, 0.15);
    this.currentY = lerp(this.currentY, this.targetY, 0.15);

    this.element.style.left = `${this.currentX}px`;
    this.element.style.top = `${this.currentY}px`;

    // Check for idle state
    const now = Date.now();
    if (this.isVisible && now - this.lastMoveTime > this.idleTimeout) {
      this.hide();
    }

    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  destroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }

    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseenter', this.handleMouseEnter);
    document.removeEventListener('mouseleave', this.handleMouseLeave);

    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}
