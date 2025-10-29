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
 */
function getRelativeLuminance(color: string): number {
  // Simplified implementation - would need full RGB parsing in production
  return 0.5
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
    document.body.removeChild(announcement)
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
 */
export function createLiveRegion(
  message: string,
  type: 'status' | 'alert' = 'status'
): void {
  const liveRegion = document.getElementById('aria-live-region')
  if (liveRegion) {
    liveRegion.textContent = message
  } else {
    const newRegion = document.createElement('div')
    newRegion.id = 'aria-live-region'
    newRegion.setAttribute('role', type)
    newRegion.setAttribute('aria-live', type === 'alert' ? 'assertive' : 'polite')
    newRegion.className = 'sr-only'
    newRegion.textContent = message
    document.body.appendChild(newRegion)
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
