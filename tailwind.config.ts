import type { Config } from 'tailwindcss';

// Shared tokens keep marketing and authenticated surfaces visually consistent.
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: { canvas: '#F9FAFB', surface: '#FFFFFF', ink: '#111827', muted: '#6B7280', line: '#E5E7EB', mint: '#EAF4EE' },
    fontFamily: { sans: ['Inter', 'Arial', 'Helvetica', 'sans-serif'] },
    boxShadow: { crisp: '0 1px 2px rgba(0,0,0,0.04)' },
    letterSpacing: { heading: '-0.055em' },
  } }, plugins: [],
} satisfies Config;
