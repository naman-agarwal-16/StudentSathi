import { useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// Five teal hex codes for the night sky theme
const TEAL_COLORS = {
  primary: '#14b8a6',    // teal-500
  dark: '#0f766e',       // teal-700
  darker: '#115e59',     // teal-800
  light: '#2dd4bf',      // teal-400
  glow: '#5eead4',       // teal-300
};

// Helper function to convert hex to RGB values
const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
};

const NightSkyLanding = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax transformations with reduced motion support
  const yStars = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, -300]
  );
  
  const yNebula = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, -150]
  );

  const titleScale = useTransform(
    scrollYProgress,
    [0, 0.5],
    [1, 0.8]
  );

  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.3],
    [1, 0]
  );

  // Memoize star field generation to avoid recalculating on every render
  const starsBoxShadow = useMemo(() => generateStars(200, TEAL_COLORS), []);

  // Memoize RGB values for gradient
  const darkerRgb = useMemo(() => hexToRgb(TEAL_COLORS.darker), []);

  // Cleanup: unload layers after scroll-end
  useEffect(() => {
    let scrollTimeout: number;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        // Layers can be unloaded here for performance if needed
      }, 1000);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-x-hidden"
      style={{ 
        scrollSnapType: 'y mandatory',
      }}
    >
      {/* Background Layer: Gradient-based Night Sky */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{ y: yNebula }}
      >
        {/* Deep space gradient base layer */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 20% 50%, rgba(15, 118, 110, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 30%, rgba(20, 184, 166, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 80%, rgba(17, 94, 89, 0.12) 0%, transparent 50%),
              linear-gradient(180deg, #0a0e1a 0%, #111827 30%, #0f1419 60%, #0a0e1a 100%)
            `,
            mixBlendMode: 'normal',
          }}
        />
        
        {/* Nebula-like second layer with screen blend */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 30% 40%, rgba(94, 234, 212, 0.08) 0%, transparent 40%),
              radial-gradient(circle at 70% 60%, rgba(45, 212, 191, 0.06) 0%, transparent 40%),
              radial-gradient(circle at 50% 20%, rgba(15, 118, 110, 0.1) 0%, transparent 35%),
              radial-gradient(ellipse at 40% 70%, rgba(20, 184, 166, 0.05) 0%, transparent 50%)
            `,
            mixBlendMode: 'screen',
          }}
        />

        {/* Milky way dust simulation with mask */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg, 
                rgba(94, 234, 212, 0.03) 0%, 
                rgba(20, 184, 166, 0.05) 20%,
                rgba(15, 118, 110, 0.04) 40%,
                transparent 60%,
                rgba(17, 94, 89, 0.06) 80%,
                rgba(94, 234, 212, 0.03) 100%
              )
            `,
            mixBlendMode: 'screen',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 100%)',
          }}
        />

        {/* Final teal accent layer */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, rgba(17, 24, 39, 0.95) 0%, rgba(${darkerRgb.r}, ${darkerRgb.g}, ${darkerRgb.b}, 0.3) 50%, rgba(17, 24, 39, 0.95) 100%)`,
          }}
        />
      </motion.div>

      {/* Stars Layer */}
      <motion.div
        className="fixed inset-0 z-10 pointer-events-none"
        style={{ y: yStars }}
      >
        <div className="stars-container">
          <div 
            className="stars-pseudo"
            style={{ boxShadow: starsBoxShadow }}
          />
        </div>
      </motion.div>

      {/* Section 1: Hero Title Card */}
      <section 
        className="relative min-h-screen flex items-center justify-center z-20"
        style={{ scrollSnapAlign: 'start' }}
      >
        <motion.div
          style={{ 
            scale: titleScale,
            opacity: titleOpacity 
          }}
          className="text-center px-6 max-w-4xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.2, 
              type: "spring",
              stiffness: 50,
              damping: 20
            }}
            className="text-6xl md:text-8xl font-bold mb-6 tracking-tight"
            style={{ 
              color: TEAL_COLORS.glow,
              textShadow: `0 0 30px ${TEAL_COLORS.primary}, 0 0 60px ${TEAL_COLORS.dark}`,
            }}
          >
            StudentSathi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.3,
              type: "spring",
              stiffness: 50,
              damping: 20
            }}
            className="text-xl md:text-3xl mb-8"
            style={{ color: TEAL_COLORS.light }}
          >
            Navigate Your Academic Journey Through the Stars
          </motion.p>
        </motion.div>
      </section>

      {/* Section 2: Feature Card */}
      <section 
        className="relative min-h-screen flex items-center justify-center z-20"
        style={{ scrollSnapAlign: 'start' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 20
          }}
          className="glassmorphism-card max-w-2xl mx-6 p-8 md:p-12"
          style={{
            background: 'rgba(17, 24, 39, 0.4)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: `2px solid ${TEAL_COLORS.primary}`,
            borderRadius: '24px',
            boxShadow: `0 0 40px ${TEAL_COLORS.primary}50, 0 0 80px ${TEAL_COLORS.dark}30, inset 0 0 60px ${TEAL_COLORS.darker}20`,
          }}
        >
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: TEAL_COLORS.glow }}
          >
            AI-Powered Analytics
          </h2>
          <p 
            className="text-lg md:text-xl mb-8 leading-relaxed"
            style={{ color: TEAL_COLORS.light }}
          >
            Transform student engagement with real-time insights, predictive alerts, 
            and comprehensive learning analytics that illuminate the path to success.
          </p>
          
          {/* CTA Button with star-field hover */}
          <Button
            onClick={() => navigate('/login')}
            className="star-field-button w-full md:w-auto px-8 py-6 text-lg font-semibold transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${TEAL_COLORS.dark}, ${TEAL_COLORS.primary})`,
              border: `2px solid ${TEAL_COLORS.primary}`,
              color: 'white',
              borderRadius: '12px',
              boxShadow: `0 0 20px ${TEAL_COLORS.primary}60`,
            }}
          >
            Explore the Platform
          </Button>
        </motion.div>
      </section>

      {/* Section 3: Stats Card */}
      <section 
        className="relative min-h-screen flex items-center justify-center z-20"
        style={{ scrollSnapAlign: 'start' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 80,
            damping: 20
          }}
          className="glassmorphism-card max-w-4xl mx-6 p-8 md:p-12"
          style={{
            background: 'rgba(17, 24, 39, 0.4)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: `2px solid ${TEAL_COLORS.primary}`,
            borderRadius: '24px',
            boxShadow: `0 0 40px ${TEAL_COLORS.primary}50, 0 0 80px ${TEAL_COLORS.dark}30, inset 0 0 60px ${TEAL_COLORS.darker}20`,
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { value: '10K+', label: 'Active Students' },
              { value: '500+', label: 'Institutions' },
              { value: '99.9%', label: 'Uptime' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
              >
                <div 
                  className="text-5xl md:text-6xl font-bold mb-2"
                  style={{ 
                    color: TEAL_COLORS.glow,
                    textShadow: `0 0 20px ${TEAL_COLORS.primary}`,
                  }}
                >
                  {stat.value}
                </div>
                <div 
                  className="text-lg"
                  style={{ color: TEAL_COLORS.light }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <style>{`
        /* Stars with box-shadow and twinkling animation */
        .stars-container {
          width: 100%;
          height: 100%;
          background: transparent;
          position: relative;
        }

        .stars-pseudo {
          position: absolute;
          top: 0;
          left: 0;
          width: 2px;
          height: 2px;
          background: transparent;
          animation: twinkle 4s ease-in-out infinite, hue-drift 8s linear infinite;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.8); }
        }

        @keyframes hue-drift {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }

        /* Star-field button hover effect */
        .star-field-button {
          position: relative;
          overflow: hidden;
        }

        .star-field-button::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, ${TEAL_COLORS.glow}40 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .star-field-button:hover::before {
          opacity: 1;
          animation: star-field-rotate 3s linear infinite;
        }

        @keyframes star-field-rotate {
          0% { transform: rotate(0deg) scale(1); }
          100% { transform: rotate(360deg) scale(1.2); }
        }

        .star-field-button:hover {
          box-shadow: 0 0 30px ${TEAL_COLORS.primary}, 0 0 60px ${TEAL_COLORS.glow}80 !important;
          transform: translateY(-2px);
        }

        /* Glassmorphism card subtle pulse */
        .glassmorphism-card {
          animation: card-glow 4s ease-in-out infinite;
        }

        @keyframes card-glow {
          0%, 100% { box-shadow: 0 0 40px ${TEAL_COLORS.primary}50, 0 0 80px ${TEAL_COLORS.dark}30, inset 0 0 60px ${TEAL_COLORS.darker}20; }
          50% { box-shadow: 0 0 50px ${TEAL_COLORS.primary}70, 0 0 100px ${TEAL_COLORS.dark}50, inset 0 0 80px ${TEAL_COLORS.darker}30; }
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

// Helper function to generate 200 stars with random positions
function generateStars(count: number, colors: typeof TEAL_COLORS): string {
  const stars: string[] = [];
  const tealShades = [colors.primary, colors.light, colors.glow, '#ffffff', colors.dark];
  
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 2000);
    const y = Math.floor(Math.random() * 2000);
    const size = Math.random() < 0.7 ? 1 : Math.random() < 0.9 ? 2 : 3;
    const color = tealShades[Math.floor(Math.random() * tealShades.length)];
    stars.push(`${x}px ${y}px ${size}px ${color}`);
  }
  
  return stars.join(', ');
}

export default NightSkyLanding;
