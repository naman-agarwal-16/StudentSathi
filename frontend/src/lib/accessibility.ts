/**
 * Accessibility utilities for WCAG 2.2 compliance
 */

/**
 * Generate ARIA labels for interactive elements
 */
export function generateAriaLabel(text: string, context?: string): string {
  return context ? `${text} - ${context}` : text
}

/**
 * Check if an element has sufficient color contrast
 * WCAG 2.2 Level AA requires:
 * - Normal text: 4.5:1
 * - Large text: 3:1
 */
export function checkColorContrast(
  foreground: string,
  background: string,
  isLargeText = false
): boolean {
  const ratio = calculateContrastRatio(foreground, background)
  return isLargeText ? ratio >= 3 : ratio >= 4.5
}

/**
 * Calculate contrast ratio between two colors
 */
function calculateContrastRatio(color1: string, color2: string): number {
  const l1 = getRelativeLuminance(color1)
  const l2 = getRelativeLuminance(color2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Get relative luminance of a color
 * Following WCAG 2.2 formula
 */
function getRelativeLuminance(hexColor: string): number {
  // Remove # if present
  const hex = hexColor.replace('#', '')
  
  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255
  
  // Apply gamma correction
  const rs = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4)
  const gs = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4)
  const bs = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4)
  
  // Calculate luminance
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

/**
 * Keyboard navigation helpers
 */
export const keyboardNav = {
  /**
   * Handle keyboard navigation for lists
   */
  handleArrowKeys: (
    event: React.KeyboardEvent,
    currentIndex: number,
    totalItems: number,
    onNavigate: (index: number) => void
  ) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        onNavigate(Math.min(currentIndex + 1, totalItems - 1))
        break
      case 'ArrowUp':
        event.preventDefault()
        onNavigate(Math.max(currentIndex - 1, 0))
        break
      case 'Home':
        event.preventDefault()
        onNavigate(0)
        break
      case 'End':
        event.preventDefault()
        onNavigate(totalItems - 1)
        break
    }
  },

  /**
   * Handle Enter and Space for clickable elements
   */
  handleActivation: (
    event: React.KeyboardEvent,
    callback: () => void
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      callback()
    }
  },
}

/**
 * Screen reader announcements
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const announcement = document.createElement('div')
  announcement.setAttribute('role', 'status')
  announcement.setAttribute('aria-live', priority)
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message
  
  document.body.appendChild(announcement)
  
  setTimeout(() => {
    if (announcement.parentNode === document.body) {
      document.body.removeChild(announcement)
    }
  }, 1000)
}

/**
 * Focus management utilities
 */
export const focusManagement = {
  /**
   * Trap focus within a modal or dialog
   */
  trapFocus: (element: HTMLElement) => {
    const focusableElements = element.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    element.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    })
  },

  /**
   * Return focus to previous element
   */
  returnFocus: (element: HTMLElement) => {
    element.focus()
  },
}

/**
 * ARIA live region helpers
 * Creates or updates a persistent live region for screen reader announcements
 * Note: This is different from announceToScreenReader which creates temporary announcements
 */
export function updateLiveRegion(
  message: string,
  type: 'status' | 'alert' = 'status'
): void {
  let liveRegion = document.getElementById('aria-live-region')
  
  if (liveRegion) {
    liveRegion.textContent = message
    liveRegion.setAttribute('role', type)
    liveRegion.setAttribute('aria-live', type === 'alert' ? 'assertive' : 'polite')
  } else {
    liveRegion = document.createElement('div')
    liveRegion.id = 'aria-live-region'
    liveRegion.setAttribute('role', type)
    liveRegion.setAttribute('aria-live', type === 'alert' ? 'assertive' : 'polite')
    liveRegion.className = 'sr-only'
    liveRegion.textContent = message
    document.body.appendChild(liveRegion)
  }
}

/**
 * Skip link utilities for keyboard navigation
 */
export function createSkipLink(targetId: string, text: string = 'Skip to main content'): HTMLAnchorElement {
  const skipLink = document.createElement('a')
  skipLink.href = `#${targetId}`
  skipLink.className = 'skip-link sr-only focus:not-sr-only'
  skipLink.textContent = text
  return skipLink
}
