/**
 * Minimal Night-Sky Landing Page
 * - Clean 4K astro-photo background (fixed, cover, brightness 0.7)
 * - 40px radial blur mask
 * - Realistic shooting star every 12s
 * - Two centered buttons: "Demo" & "Login / Register"
 * - No parallax, no glass cards, no cursor effects
 */

import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ParticleSystem } from '@/utils/ParticleSystem';

const MinimalNightSkyLanding = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleSystemRef = useRef<ParticleSystem | null>(null);

  useEffect(() => {
    // Initialize particle system for shooting stars
    if (canvasRef.current && !particleSystemRef.current) {
      particleSystemRef.current = new ParticleSystem(canvasRef.current);
      particleSystemRef.current.start();
    }

    // Cleanup on unmount
    return () => {
      if (particleSystemRef.current) {
        particleSystemRef.current.destroy();
        particleSystemRef.current = null;
      }
    };
  }, []);

  // Button style configuration
  const buttonStyle = {
    backgroundColor: '#00796B',
    color: '#ffffff',
    borderRadius: '16px',
    border: 'none',
    boxShadow: '0 4px 20px rgba(0, 121, 107, 0.3)',
  };

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>, isEnter: boolean) => {
    if (isEnter) {
      e.currentTarget.style.boxShadow = '0 6px 30px rgba(0, 121, 107, 0.6)';
      e.currentTarget.style.transform = 'translateY(-2px)';
    } else {
      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 121, 107, 0.3)';
      e.currentTarget.style.transform = 'translateY(0)';
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Fixed 4K background with brightness filter and blur mask */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(/images/space-bg.webp)',
          filter: 'brightness(0.7)',
          zIndex: -2,
        }}
      />

      {/* 40px radial blur mask */}
      <div
        className="fixed inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, #000000 100%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />

      {/* Particle canvas for shooting stars */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Centered content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-8 px-4">
          {/* Title */}
          <h1
            className="text-6xl md:text-8xl font-bold tracking-tight"
            style={{
              color: '#ffffff',
              textShadow: '0 0 20px rgba(0, 121, 107, 0.5)',
            }}
          >
            StudentSathi
          </h1>

          {/* Subtitle */}
          <p
            className="text-xl md:text-2xl text-center max-w-2xl"
            style={{ color: '#e0e0e0' }}
          >
            Navigate Your Academic Journey
          </p>

          {/* Buttons */}
          <div className="flex gap-6 mt-4">
            <Button
              onClick={() => navigate('/demo')}
              className="px-8 py-6 text-lg font-semibold transition-all duration-300"
              style={buttonStyle}
              onMouseEnter={(e) => handleButtonHover(e, true)}
              onMouseLeave={(e) => handleButtonHover(e, false)}
            >
              Demo
            </Button>

            <Button
              onClick={() => navigate('/login')}
              className="px-8 py-6 text-lg font-semibold transition-all duration-300"
              style={buttonStyle}
              onMouseEnter={(e) => handleButtonHover(e, true)}
              onMouseLeave={(e) => handleButtonHover(e, false)}
            >
              Login / Register
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinimalNightSkyLanding;
