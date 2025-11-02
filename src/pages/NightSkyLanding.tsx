import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { SpaceBackground } from '@/components/SpaceBackground';

// Five teal hex codes for the night sky theme
const TEAL_COLORS = {
  primary: '#14b8a6',    // teal-500
  dark: '#0f766e',       // teal-700
  darker: '#115e59',     // teal-800
  light: '#2dd4bf',      // teal-400
  glow: '#5eead4',       // teal-300
};

const NightSkyLanding = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const [particlePositions, setParticlePositions] = useState<{x: number; y: number}[]>([]);

  // Generate particles on button hover
  const handleButtonHover = () => {
    if (prefersReducedMotion) return;
    const particles: {x: number; y: number}[] = [];
    for (let i = 0; i < 6; i++) {
      particles.push({
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
      });
    }
    setParticlePositions(particles);
  };

  return (
    <SpaceBackground>
      <div className="relative w-full overflow-x-hidden">
        {/* Section 1: Hero Title Card */}
        <section className="relative min-h-screen flex items-center justify-center z-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.2, 
              type: "spring",
              stiffness: 50,
              damping: 20
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

        {/* Section 2: Feature Card with glass morphism */}
        <section className="relative min-h-screen flex items-center justify-center z-20">
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
            className="glass-card max-w-2xl mx-6 p-8 md:p-12"
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
            
            {/* CTA Button with particle burst */}
            <div className="relative inline-block">
              <Button
                onClick={() => navigate('/login')}
                onMouseEnter={handleButtonHover}
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
              
              {/* Particle burst on hover */}
              {!prefersReducedMotion && particlePositions.map((pos, idx) => (
                <motion.div
                  key={idx}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ 
                    x: pos.x, 
                    y: pos.y, 
                    opacity: 0,
                    scale: 0
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full pointer-events-none"
                  style={{
                    background: TEAL_COLORS.glow,
                    boxShadow: `0 0 10px ${TEAL_COLORS.primary}`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </section>

        {/* Section 3: Stats Card */}
        <section className="relative min-h-screen flex items-center justify-center z-20">
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
            className="glass-card max-w-4xl mx-6 p-8 md:p-12"
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
    </SpaceBackground>
  );
};

export default NightSkyLanding;
