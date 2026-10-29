import type { Config } from 'tailwindcss';

/**
 * Darkroom theme.
 * - ink:       warm photographic blacks (backgrounds and surfaces)
 * - paper:     warm off-white of a photo print (text and light accents)
 * - safelight: darkroom red (REC dot, highlights, focus)
 *
 * The legacy palette names (navy, midnight, charcoal) are kept as aliases so
 * older components pick up the new look without rewriting every class.
 */
const ink = {
  50: '#f6f3ee',
  100: '#e9e4dc',
  200: '#cfc8bd',
  300: '#a8a197',
  400: '#7d776f',
  500: '#57524c',
  600: '#3a3632',
  700: '#2a2724',
  800: '#1d1b19',
  900: '#151412',
  950: '#0f0e0d',
  975: '#0a0908'
};

const paper = {
  50: '#fdfcf9',
  100: '#f8f5ef',
  200: '#f1ece3',
  300: '#e8e2d6',
  400: '#ddd5c6',
  500: '#c9bfad',
  600: '#a89d89',
  700: '#857a67',
  800: '#5f5749',
  900: '#3a352d',
  950: '#211e19',
  975: '#13110e'
};

const safelight = {
  50: '#fff1f0',
  100: '#ffdcd9',
  200: '#ffb5ae',
  300: '#ff8479',
  400: '#f5554a',
  500: '#e2352b',
  600: '#bf241c',
  700: '#981d17',
  800: '#6e1712',
  900: '#45100c',
  950: '#2a0907',
  975: '#170504'
};

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './sections/**/*.{js,ts,jsx,tsx}',
    './data/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'Times New Roman', 'serif'],
        mono: ['var(--font-mono)', 'SF Mono', 'Menlo', 'Consolas', 'monospace']
      },
      colors: {
        ink,
        paper,
        safelight,
        // legacy aliases
        navy: ink,
        charcoal: ink,
        midnight: paper,
        slate: {
          50: '#f8f6f2',
          100: '#f1eee8',
          200: '#e4dfd6',
          300: '#cbc4b8',
          400: '#9c958a',
          500: '#78726a',
          600: '#57524c',
          700: '#3a3632',
          800: '#26231f',
          900: '#171513',
          950: '#0d0c0b',
          975: '#0a0908'
        }
      },
      boxShadow: {
        soft: '0 20px 80px rgba(0, 0, 0, 0.6)',
        premium: '0 25px 100px -12px rgba(0, 0, 0, 0.8)',
        luxury: '0 35px 120px -40px rgba(0, 0, 0, 0.9)',
        deep: '0 50px 150px -50px rgba(0, 0, 0, 0.95)',
        midnight: '0 24px 80px -24px rgba(0, 0, 0, 0.9)',
        print: '0 1px 0 rgba(255,255,255,0.04) inset, 0 30px 60px -30px rgba(0,0,0,0.9)'
      },
      letterSpacing: {
        camera: '0.28em'
      }
    }
  },
  plugins: []
};

export default config;
