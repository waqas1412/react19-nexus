/**
 * Futuristic Theme Configuration
 * Neon colors, glassmorphism, and cyberpunk aesthetics
 */

export const theme = {
  colors: {
    // Neon accents
    neon: {
      cyan: '#00f0ff',
      pink: '#ff006e',
      purple: '#8b5cf6',
      green: '#00ff88',
      yellow: '#ffeb3b',
    },
    
    // Dark backgrounds
    dark: {
      900: '#0a0a0f',
      800: '#13131a',
      700: '#1a1a24',
      600: '#24242e',
    },
    
    // Glass effects
    glass: {
      light: 'rgba(255, 255, 255, 0.05)',
      medium: 'rgba(255, 255, 255, 0.1)',
      strong: 'rgba(255, 255, 255, 0.15)',
    },
  },
  
  effects: {
    glow: {
      sm: '0 0 10px',
      md: '0 0 20px',
      lg: '0 0 40px',
    },
    
    blur: {
      sm: '4px',
      md: '8px',
      lg: '16px',
    },
  },
  
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    
    easing: {
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
} as const;

export type Theme = typeof theme;
