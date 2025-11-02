/**
 * Enhanced Space Background Component
 * Integrates all night-sky features:
 * - 4K Milky Way + teal nebula
 * - Parallax scrolling with spring physics
 * - Shooting stars & comets
 * - Cursor light-sphere
 * - Performance optimizations
 */

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useSpring } from 'framer-motion';
import { ParticleSystem } from '@/utils/ParticleSystem';
import { CursorLightSphere } from '@/utils/CursorLightSphere';

interface SpaceBackgroundProps {
  children?: React.ReactNode;
}

export const SpaceBackground: React.FC<SpaceBackgroundProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleSystemRef = useRef<ParticleSystem | null>(null);
  const cursorLightRef = useRef<CursorLightSphere | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const scrollEndTimeoutRef = useRef<number>();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transformations: yStars = scrollY * -0.3, yNebula = scrollY * -0.15
  const yStarsRaw = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, -300]
  );
  const yStars = useSpring(yStarsRaw, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const yNebulaRaw = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, -150]
  );
  const yNebula = useSpring(yNebulaRaw, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Detect low-end device
  const isLowEndDevice = (): boolean => {
    // Check for hardware concurrency (CPU cores)
    const cores = navigator.hardwareConcurrency || 4;
    // Check for device memory (if available)
    const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 4;
    
    return cores <= 2 || memory <= 2;
  };

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lowEnd = isLowEndDevice();

    // Initialize particle system
    if (canvasRef.current && !particleSystemRef.current) {
      particleSystemRef.current = new ParticleSystem(canvasRef.current, lowEnd);
      particleSystemRef.current.start();
    }

    // Initialize cursor light sphere
    if (!cursorLightRef.current) {
      cursorLightRef.current = new CursorLightSphere();
    }

    // Cleanup on unmount
    return () => {
      if (particleSystemRef.current) {
        particleSystemRef.current.destroy();
        particleSystemRef.current = null;
      }
      if (cursorLightRef.current) {
        cursorLightRef.current.destroy();
        cursorLightRef.current = null;
      }
    };
  }, [prefersReducedMotion]);

  // Unload canvas after scroll-end for performance
  useEffect(() => {
    const handleScroll = () => {
      if (scrollEndTimeoutRef.current) {
        clearTimeout(scrollEndTimeoutRef.current);
      }

      // Resume particle system if stopped
      if (particleSystemRef.current && !prefersReducedMotion) {
        particleSystemRef.current.start();
      }

      scrollEndTimeoutRef.current = window.setTimeout(() => {
        // Optionally stop particle system after scroll ends
        // Commented out to keep visual effects active
        // if (particleSystemRef.current) {
        //   particleSystemRef.current.stop();
        // }
      }, 2000);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollEndTimeoutRef.current) {
        clearTimeout(scrollEndTimeoutRef.current);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className="space-background-wrapper">
      {/* Fixed background layer with blur and brightness filter */}
      <motion.div
        className="space-bg-layer"
        style={{
          y: yStars,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -2,
          backgroundImage: 'url(/images/space-bg.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.7) saturate(1.2)',
          willChange: 'transform',
        }}
      />

      {/* Nebula layer with parallax */}
      <motion.div
        className="space-nebula-layer"
        style={{
          y: yNebula,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
          background: `
            radial-gradient(ellipse at 30% 40%, rgba(0, 77, 64, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 60%, rgba(0, 105, 92, 0.12) 0%, transparent 50%)
          `,
          willChange: 'transform',
        }}
      />

      {/* 40px Gaussian blur mask with radial gradient fading to #000511 */}
      <div
        className="space-edge-fade"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          background: 'radial-gradient(ellipse at center, transparent 40%, #000511 100%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      {/* Particle canvas for shooting stars and comets */}
      {!prefersReducedMotion && (
        <canvas
          ref={canvasRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
    </div>
  );
};
