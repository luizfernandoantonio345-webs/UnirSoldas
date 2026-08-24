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
          dark: '#52575e',
        },
        brand: {
          DEFAULT: '#e2681d', // laranja da marca
          hi: '#ff8534',      // laranja destaque
          ember: '#ffb673',   // brasa
        },
        copper: '#c45a0a',    // cobre escuro para gradientes de borda
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
        scroll: {
          to: { transform: 'translateX(-50%)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(226,104,29,0)' },
          '50%':       { boxShadow: '0 0 0 8px rgba(226,104,29,0.15)' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.8s cubic-bezier(0.22,1,0.36,1) forwards',
        scroll: 'scroll 26s linear infinite',
        'fade-in': 'fade-in 0.4s ease forwards',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
