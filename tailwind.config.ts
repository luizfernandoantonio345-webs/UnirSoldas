import type { Config } from 'tailwindcss';

/**
 * Design tokens da UnirSoldas.
 * Paleta derivada da própria marca: aço escuro + laranja industrial.
 * Manter os tokens aqui garante um único ponto de verdade para o tema.
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#08090a',
        ink: '#0e0f11',
        charcoal: '#141618',
        plate: '#1c1e21',
        line: '#26282c',
        steel: {
          DEFAULT: '#82878e',
          light: '#b9bec4',
        },
        brand: {
          DEFAULT: '#e2681d', // laranja da marca
          hi: '#ff8534',      // laranja destaque
          ember: '#ffb673',   // brasa
        },
        paper: '#f4f2eb',
      },
      fontFamily: {
        display: ['Anton', 'sans-serif'],
        cond: ['"Barlow Condensed"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      maxWidth: { content: '1220px' },
      keyframes: {
        'slide-up': {
          from: { transform: 'translateY(105%)' },
          to: { transform: 'translateY(0)' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.8s cubic-bezier(0.22,1,0.36,1) forwards',
      },
    },
  },
  plugins: [],
};

export default config;
