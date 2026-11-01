import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /*
         * The approved GGM identity, the same tokens the client portal uses, so
         * the two properties cannot drift. Added ALONGSIDE brand.* rather than
         * replacing it: every other page still paints from brand.*, and a
         * palette swap underneath them would redesign pages nobody has reviewed.
         *
         * Gold is for rules and small marks only. #C6A875 on ivory measures
         * about 2:1, so it must never carry text. Where gold type is wanted,
         * ggm.gold-ink is the accessible one.
         */
        ggm: {
          forest: '#173D32',
          'forest-deep': '#102A23',
          ivory: '#F6F3ED',
          paper: '#FFFEFA',
          charcoal: '#2E2E2E',
          sage: '#8CA699',
          'sage-surface': '#E5ECE7',
          gold: '#C6A875',
          'gold-ink': '#8A6A2B',
          line: '#E2DFD7',
          muted: '#5A615A',
        },
        brand: {
          // Greens (from logo)
          forest: '#1a5c1a',
          green: '#3a8a2d',
          lime: '#7dc242',
          'lime-light': '#a8e063',
          'green-pale': '#f0fdf4',
          // Purples
          purple: '#7c3aed',
          'purple-vivid': '#9333ea',
          'purple-light': '#c4b5fd',
          'purple-pale': '#faf5ff',
          // Oranges
          orange: '#ea580c',
          'orange-bright': '#f97316',
          'orange-pale': '#fff7ed',
          // Neutrals
          'dark': '#0d1117',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        body: ['var(--font-figtree)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.7s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
      },
    },
  },
  plugins: [],
}

export default config
