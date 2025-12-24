/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Neo-brutalism colors
      colors: {
        'brutal-cream': '#FFFEF0',
        'brutal-offwhite': '#F5F5DC',
        'brutal-yellow': '#FEF08A',
        'brutal-blue': '#0057FF',
        'brutal-red': '#FF6B6B',
        'brutal-green': '#22C55E',
        'brutal-purple': '#A855F7',
        'brutal-black': '#1A1A1A',
        'brutal-charcoal': '#3D3D3D',
      },

      // Typography
      fontFamily: {
        'heading': ['Space Grotesk', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'display': ['Bebas Neue', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },

      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['2rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.5rem', { lineHeight: '2.75rem' }],
        '5xl': ['3.5rem', { lineHeight: '1.1' }],
        '6xl': ['4.5rem', { lineHeight: '1' }],
        '7xl': ['6rem', { lineHeight: '1' }],
        '8xl': ['8rem', { lineHeight: '0.95' }],
        '9xl': ['10rem', { lineHeight: '0.9' }],
        'display': ['12rem', { lineHeight: '0.85' }],
      },

      // Brutalist borders
      borderWidth: {
        '3': '3px',
        '4': '4px',
        '6': '6px',
      },

      // Hard offset shadows
      boxShadow: {
        'brutal-sm': '2px 2px 0px 0px #1A1A1A',
        'brutal': '4px 4px 0px 0px #1A1A1A',
        'brutal-md': '6px 6px 0px 0px #1A1A1A',
        'brutal-lg': '8px 8px 0px 0px #1A1A1A',
        'brutal-xl': '12px 12px 0px 0px #1A1A1A',
        'brutal-blue': '4px 4px 0px 0px #0057FF',
        'brutal-yellow': '4px 4px 0px 0px #FEF08A',
        'brutal-red': '4px 4px 0px 0px #FF6B6B',
        'brutal-hover': '6px 6px 0px 0px #1A1A1A',
        'brutal-active': '2px 2px 0px 0px #1A1A1A',
        'none': 'none',
      },

      // Animation timing
      transitionDuration: {
        '50': '50ms',
        '100': '100ms',
        '150': '150ms',
      },
    },
  },
  plugins: [],
}
