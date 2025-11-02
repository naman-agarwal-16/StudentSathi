import { ReactNode } from 'react';

interface SpaceLayoutProps {
  children: ReactNode;
}

export const SpaceLayout = ({ children }: SpaceLayoutProps) => {
  return (
    <div className="space-layout-wrapper">
      {/* Static 4K Milky Way background - fixed to viewport back-layer */}
      <div 
        className="space-background"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundImage: 'url(/images/sky-1-placeholder.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -2,
          animation: 'space-drift 200s linear infinite',
          willChange: 'transform',
        }}
      />

      {/* Overlay for depth and teal accent */}
      <div
        className="space-overlay"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: `
            radial-gradient(ellipse at 30% 40%, rgba(20, 184, 166, 0.05) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 60%, rgba(15, 118, 110, 0.04) 0%, transparent 50%),
            linear-gradient(180deg, rgba(4, 47, 46, 0.3) 0%, transparent 50%, rgba(4, 47, 46, 0.4) 100%)
          `,
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />

      {/* Glass-morphism content card */}
      <div 
        className="space-content-card"
        style={{
          minHeight: '100vh',
          background: 'rgba(0, 77, 64, 0.08)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid #00BFA5',
          boxShadow: '0 0 30px rgba(0, 191, 165, 0.2), inset 0 0 50px rgba(0, 77, 64, 0.1)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {children}
      </div>

      <style>{`
        /* Subtle 0.5px/s x/y drift via CSS animation to avoid GPU cost */
        @keyframes space-drift {
          0% { 
            transform: translate(0, 0); 
          }
          25% { 
            transform: translate(-50px, 50px); 
          }
          50% { 
            transform: translate(-100px, 0); 
          }
          75% { 
            transform: translate(-50px, -50px); 
          }
          100% { 
            transform: translate(0, 0); 
          }
        }

        .space-layout-wrapper {
          position: relative;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .space-background {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};
