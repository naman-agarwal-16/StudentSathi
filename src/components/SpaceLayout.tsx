import { ReactNode } from 'react';
import { SpaceBackground } from './SpaceBackground';

interface SpaceLayoutProps {
  children: ReactNode;
}

export const SpaceLayout = ({ children }: SpaceLayoutProps) => {
  return (
    <SpaceBackground>
      <div className="space-layout-wrapper">
        {/* Glass-morphism content card with new global styles */}
        <div 
          className="glass-card space-content-card"
          style={{
            minHeight: '100vh',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {children}
        </div>

        <style>{`
          .space-layout-wrapper {
            position: relative;
            min-height: 100vh;
            overflow-x: hidden;
          }

          /* Reduced motion support */
          @media (prefers-reduced-motion: reduce) {
            * {
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
