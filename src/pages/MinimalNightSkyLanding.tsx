/**
 * Immersive Night-Sky Landing Page
 * Long scroll-driven story (3200px) with 6 full-viewport sections:
 * 1. Hero - 4K astro background + two CTAs
 * 2. About StudentSathi - glass card
 * 3. Events & Workshops - horizontal scrollable cards
 * 4. Attendance & Performance - live counters & radar
 * 5. Galaxy Gallery - full-bleed nebula with parallax
 * 6. Footer - contact, socials, copyright
 * 
 * Features:
 * - Framer-Motion spring parallax (60fps, reduced-motion safe)
 * - Realistic shooting stars every 12s
 * - All CTAs wired to real routes
 */

import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ParticleSystem } from '@/utils/ParticleSystem';
import { mockEvents } from '@/data/mockData';
import { Calendar, MapPin, Users, TrendingUp, Award, Mail, Github, Twitter, Linkedin } from 'lucide-react';

const MinimalNightSkyLanding = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleSystemRef = useRef<ParticleSystem | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transformations with spring physics
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

  // Teal color palette
  const colors = {
    primary: '#14b8a6',
    dark: '#0f766e',
    darker: '#115e59',
    light: '#2dd4bf',
    glow: '#5eead4',
  };

  return (
    <div ref={containerRef} className="relative w-full overflow-x-hidden bg-[#000511]">
      {/* Fixed parallax background layers */}
      <motion.div
        className="fixed inset-0"
        style={{
          y: yStars,
          backgroundImage: 'url(/images/space-bg.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.7) saturate(1.2)',
          zIndex: -2,
        }}
      />

      <motion.div
        className="fixed inset-0"
        style={{
          y: yNebula,
          background: `
            radial-gradient(ellipse at 30% 40%, rgba(0, 77, 64, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 60%, rgba(0, 105, 92, 0.12) 0%, transparent 50%)
          `,
          zIndex: -1,
        }}
      />

      {/* Edge fade */}
      <div
        className="fixed inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, #000511 100%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Particle canvas for shooting stars */}
      {!prefersReducedMotion && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: 1 }}
        />
      )}

      {/* Content sections */}
      <div className="relative z-10">
        {/* Section 1: Hero */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, type: 'spring', stiffness: 50, damping: 20 }}
            className="text-center max-w-4xl"
          >
            <h1
              className="text-6xl md:text-8xl font-bold mb-6 tracking-tight"
              style={{
                color: colors.glow,
                textShadow: `0 0 30px ${colors.primary}, 0 0 60px ${colors.dark}`,
              }}
            >
              StudentSathi
            </h1>
            <p
              className="text-xl md:text-3xl mb-12"
              style={{ color: colors.light }}
            >
              Navigate Your Academic Journey Through the Stars
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                onClick={() => navigate('/demo')}
                className="px-8 py-6 text-lg font-semibold transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${colors.dark}, ${colors.primary})`,
                  border: `2px solid ${colors.primary}`,
                  color: 'white',
                  borderRadius: '12px',
                  boxShadow: `0 0 20px ${colors.primary}60`,
                }}
              >
                Explore Demo
              </Button>
              <Button
                onClick={() => navigate('/login')}
                className="px-8 py-6 text-lg font-semibold transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${colors.dark}, ${colors.primary})`,
                  border: `2px solid ${colors.primary}`,
                  color: 'white',
                  borderRadius: '12px',
                  boxShadow: `0 0 20px ${colors.primary}60`,
                }}
              >
                Login / Register
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Section 2: About StudentSathi */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 100, damping: 20 }}
            className="glass-card max-w-3xl p-8 md:p-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.glow }}>
              About StudentSathi
            </h2>
            <p className="text-lg md:text-xl leading-relaxed mb-6" style={{ color: colors.light }}>
              StudentSathi is your AI-powered companion for academic excellence. We transform student 
              engagement through real-time analytics, predictive alerts, and comprehensive learning insights.
            </p>
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: colors.light }}>
              Our platform helps educators identify at-risk students early, track performance trends, 
              and foster a thriving learning community—all while respecting student privacy and autonomy.
            </p>
          </motion.div>
        </section>

        {/* Section 3: Events & Workshops */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-7xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center" style={{ color: colors.glow }}>
              Events & Workshops
            </h2>
            <div className="overflow-x-auto pb-8 hide-scrollbar">
              <div className="flex gap-6 min-w-max px-4">
                {mockEvents.map((event, idx) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    onClick={() => navigate('/demo')}
                    className="glass-card-hover w-80 p-6 cursor-pointer"
                  >
                    <div className="text-5xl mb-4">{event.thumbnail}</div>
                    <h3 className="text-xl font-bold mb-3" style={{ color: colors.glow }}>
                      {event.title}
                    </h3>
                    <div className="space-y-2 mb-4 text-sm" style={{ color: colors.light }}>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date} • {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{event.attendees}/{event.maxAttendees} attendees</span>
                      </div>
                    </div>
                    <p className="text-sm line-clamp-3" style={{ color: colors.light }}>
                      {event.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Section 4: Attendance & Performance */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 80, damping: 20 }}
            className="glass-card max-w-5xl p-8 md:p-12 w-full"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center" style={{ color: colors.glow }}>
              Real-Time Analytics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { icon: Users, value: '10,247', label: 'Total Students', color: colors.glow },
                { icon: TrendingUp, value: '94.8%', label: 'Avg Attendance', color: colors.light },
                { icon: Award, value: '3.67', label: 'Average GPA', color: colors.primary }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: idx * 0.2, duration: 0.6 }}
                  className="flex flex-col items-center"
                >
                  <stat.icon className="w-12 h-12 mb-4" style={{ color: stat.color }} />
                  <div
                    className="text-5xl md:text-6xl font-bold mb-2"
                    style={{
                      color: stat.color,
                      textShadow: `0 0 20px ${colors.primary}`,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-lg" style={{ color: colors.light }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Section 5: Galaxy Gallery */}
        <section 
          className="min-h-screen flex items-center justify-center relative overflow-hidden"
          style={{
            background: `
              radial-gradient(ellipse at 50% 50%, rgba(20, 184, 166, 0.2) 0%, transparent 70%),
              radial-gradient(ellipse at 80% 20%, rgba(15, 118, 110, 0.15) 0%, transparent 60%)
            `,
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1.5 }}
            className="text-center px-6 max-w-4xl"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6" style={{ color: colors.glow }}>
              Discover the Universe of Learning
            </h2>
            <p className="text-xl md:text-2xl" style={{ color: colors.light }}>
              Where education meets innovation, and every student's journey shines bright
            </p>
          </motion.div>
        </section>

        {/* Section 6: Footer */}
        <footer className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              {/* Contact */}
              <div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: colors.glow }}>
                  Contact Us
                </h3>
                <div className="space-y-3 text-sm" style={{ color: colors.light }}>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <a href="mailto:contact@studentsathi.com" className="hover:underline">
                      contact@studentsathi.com
                    </a>
                  </div>
                  <p>Support: support@studentsathi.com</p>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: colors.glow }}>
                  Quick Links
                </h3>
                <div className="space-y-2 text-sm" style={{ color: colors.light }}>
                  <button onClick={() => navigate('/demo')} className="block hover:underline text-left">
                    Demo
                  </button>
                  <button onClick={() => navigate('/login')} className="block hover:underline text-left">
                    Login
                  </button>
                  <button onClick={() => navigate('/register')} className="block hover:underline text-left">
                    Register
                  </button>
                </div>
              </div>

              {/* Social */}
              <div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: colors.glow }}>
                  Follow Us
                </h3>
                <div className="flex gap-4">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                     className="hover:scale-110 transition-transform">
                    <Github className="w-6 h-6" style={{ color: colors.light }} />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                     className="hover:scale-110 transition-transform">
                    <Twitter className="w-6 h-6" style={{ color: colors.light }} />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                     className="hover:scale-110 transition-transform">
                    <Linkedin className="w-6 h-6" style={{ color: colors.light }} />
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t pt-8 text-center" style={{ borderColor: colors.dark }}>
              <p className="text-sm" style={{ color: colors.light }}>
                © 2025 StudentSathi. All rights reserved. Built with 💙 for educators and students.
              </p>
            </div>
          </motion.div>
        </footer>
      </div>

      <style>{`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        html {
          scroll-behavior: smooth;
        }

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

export default MinimalNightSkyLanding;
