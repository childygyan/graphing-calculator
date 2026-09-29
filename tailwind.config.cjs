const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  // Dark mode is toggled via a `dark` class on <html>, set before first paint
  // by an inline script (see src/layouts/BaseLayout.astro). No FOUC.
  darkMode: 'class',
  theme: {
    extend: {
      // "brand" is an alias of the indigo scale: our own product identity.
      colors: {
        brand: colors.indigo,
      },
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
