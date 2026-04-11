import type { Config } from 'tailwindcss';

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
        sans:    ['var(--font-inter)', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['var(--font-cormorant)', 'Garamond', 'Georgia', 'serif'],
        mono:    ['var(--font-jetbrains-mono)', 'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', 'Consolas', 'Courier New', 'monospace'],
      },
      colors: {
        // ── Royal deep backgrounds — velvet-black with purple depth ──
        navy: {
          50:  '#f5f0ff',
          100: '#ebe0ff',
          200: '#d6c0ff',
          300: '#b899ff',
          400: '#9a6fff',
          500: '#7c44f5',
          600: '#3d2e6b',
          700: '#271d48',
          800: '#1a1232',
          900: '#120b26',
          950: '#0d0819',
          975: '#07050f'   // royal velvet — near-black with deep purple warmth
        },
        // ── Warm dark surfaces ───────────────────────────────────────
        charcoal: {
          50:  '#fdf8f0',
          100: '#faefd8',
          200: '#f3d99a',
          300: '#e8b84d',
          400: '#c99a20',
          500: '#a07818',
          600: '#7a5a10',
          700: '#5c4208',
          800: '#1c1608',
          900: '#110e05',
          950: '#0a0803',
          975: '#07050f'
        },
        // ── Royal Gold — proper metallic gold, not orange ────────────
        midnight: {
          50:  '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#f5e6a3',   // pale gold
          400: '#d4af37',   // classic metallic gold — the royal accent
          500: '#b8960c',   // deep gold
          600: '#9a7d0a',   // darkest gold for fills
          700: '#7a6008',
          800: '#5c4606',
          900: '#3d2e04',
          950: '#1e1702',
          975: '#0f0c01'
        },
        // ── Neutral text scale ───────────────────────────────────────
        slate: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
          975: '#07050f'
        }
      },
      boxShadow: {
        soft:     '0 20px 80px rgba(7, 5, 15, 0.7)',
        premium:  '0 25px 100px -12px rgba(7, 5, 15, 0.85)',
        luxury:   '0 35px 120px -40px rgba(7, 5, 15, 0.94)',
        deep:     '0 50px 150px -50px rgba(7, 5, 15, 0.97)',
        midnight: '0 24px 80px -16px rgba(212, 175, 55, 0.22)'  // gold glow
      },
      animation: {
        'fade-in':  'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'glow':     'glow 3s ease-in-out infinite alternate'
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        glow: {
          '0%':   { boxShadow: '0 0 20px rgba(212, 175, 55, 0.25)' },
          '100%': { boxShadow: '0 0 32px rgba(212, 175, 55, 0.5)' }
        }
      }
    }
  },
  plugins: []
};

export default config;
