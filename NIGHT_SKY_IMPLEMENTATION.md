# Night Sky Experience Implementation

## Overview
This implementation creates a photo-real night-sky experience across the StudentSathi site with parallax scrolling, particle effects, and glass-morphism UI.

## Components

### 1. SpaceBackground Component (`src/components/SpaceBackground.tsx`)
- **Full-viewport background** with fixed attachment
- **Parallax scrolling**: yStars = scrollY * -0.3, yNebula = scrollY * -0.15
- **Performance optimizations**:
  - 60fps spring animations via Framer Motion
  - Throttled to 30fps on low-end devices (≤2 CPU cores or ≤2GB RAM)
  - Respects `prefers-reduced-motion`
  - Canvas cleanup after scroll-end

### 2. Particle System (`src/utils/ParticleSystem.ts`)
- **Shooting stars**: 
  - Spawn every 3 seconds
  - 800ms lifetime
  - 80px tail
  - Angle: -15° to +15°
  - White color with gradient tail
- **Comets**:
  - 0.5% probability per second
  - 6px head + triangle tail
  - 8px motion blur
  - Longer lifetime (1.5s)
  - Blue-tinted tail

### 3. Cursor Light Sphere (`src/utils/CursorLightSphere.ts`)
- 24px radial gradient (white)
- 12px blur
- 0.6 opacity
- RAF-based smooth tracking
- Auto-hide after 1 second of inactivity

### 4. Glass UI Cards (Global CSS)
- **Properties**:
  - `backdrop-filter: blur(32px)`
  - `background: rgba(0, 77, 64, 0.10)`
  - `border: 1px solid rgba(0, 191, 165, 0.70)`
  - `box-shadow: 0 0 48px rgba(0, 191, 165, 0.30)`
- **Classes**:
  - `.glass-card` - Basic glass card
  - `.glass-card-hover` - Glass card with hover effects

## Background Image Generation

### Generated Asset
- **File**: `/public/images/space-bg.webp`
- **Size**: 88.88 KB (under 200KB target)
- **Resolution**: 4K (3840 x 2160)
- **Features**:
  - 6000 randomly positioned stars (1px white, varying brightness)
  - Multiple teal nebula gradients (#004D40, #00695C, #00897B, #00796B)
  - Brighter teal accents (#26A69A, #4DB6AC)

### Regenerating the Background
Run the following command to regenerate the space background:
```bash
node generate-space-bg.cjs
```

This will:
1. Generate a 4K canvas with stars and nebulae
2. Export as PNG
3. Convert to WebP with 85% quality using Sharp
4. Save to `/public/images/space-bg.webp`
5. Clean up the temporary PNG file

## Visual Effects

### CSS Filters
- **Background**: `brightness(0.7) saturate(1.2)`
- **Edge fade**: 40px Gaussian blur with radial-gradient to #000511

### Parallax Layers
1. **Stars layer** (z-index: -2): Scrolls at -0.3x speed
2. **Nebula layer** (z-index: -1): Scrolls at -0.15x speed
3. **Edge fade** (z-index: 0): Fixed, creates depth
4. **Particles** (z-index: 1): Fixed canvas overlay
5. **Content** (z-index: 2): Normal scroll

## Performance Features

### Device Detection
```typescript
const isLowEndDevice = (): boolean => {
  const cores = navigator.hardwareConcurrency || 4;
  const memory = navigator.deviceMemory || 4;
  return cores <= 2 || memory <= 2;
};
```

### Frame Rate Management
- **High-end devices**: 60fps
- **Low-end devices**: 30fps (automatically throttled)
- **Reduced motion**: All animations disabled

### Cleanup
- Particle system stops after scroll-end (with 2s timeout)
- Canvas contexts properly cleaned up on unmount
- RAF loops cancelled on component unmount

## Usage

### Apply Space Background to a Page
```tsx
import { SpaceBackground } from '@/components/SpaceBackground';

function MyPage() {
  return (
    <SpaceBackground>
      <div className="glass-card p-8">
        {/* Your content */}
      </div>
    </SpaceBackground>
  );
}
```

### Use Glass UI Cards
```tsx
// Basic glass card
<div className="glass-card p-6">
  Content
</div>

// Glass card with hover effect
<div className="glass-card-hover p-6">
  Content
</div>
```

## Browser Support
- Modern browsers with WebP support
- Fallback for browsers without `backdrop-filter`
- Respects user's motion preferences
- Canvas 2D API required for particle effects

## Dependencies
- `framer-motion` - Parallax scrolling and animations
- `canvas` (dev) - Background image generation
- `sharp` (dev) - WebP conversion

## Performance Targets
- ✅ WebP image < 200KB (achieved: 88.88 KB)
- ✅ 60fps on modern devices
- ✅ 30fps throttling on low-end devices
- ✅ Respects `prefers-reduced-motion`
- 🎯 Lighthouse score ≥ 95 (requires testing)

## Color Palette (Teal Theme)
- Primary: `#14b8a6` (teal-500)
- Dark: `#0f766e` (teal-700)
- Darker: `#115e59` (teal-800)
- Light: `#2dd4bf` (teal-400)
- Glow: `#5eead4` (teal-300)
- Nebula: `#004D40` (teal-900)
- Border: `#00BFA5` (custom teal)
