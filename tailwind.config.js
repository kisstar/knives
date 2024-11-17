/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './packages/**/*.{vue,js,ts,jsx,tsx}'],
  // darkMode: ['variant', '&:not(.light *)'],
  darkMode: 'selector',
  theme: {
    extend: {
      opacity: {
        hover:
          'calc(var(--v-hover-opacity) * var(--v-theme-overlay-multiplier))',
      },
      colors: {
        'c-b': 'rgba(var(--v-border-color), var(--v-border-opacity))',
      },
    },
  },
  plugins: [],
};
