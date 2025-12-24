/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../../apps/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0528d6",   // Bleu électrique
        secondary: "#F76513", // Orange vif
        dark: "#0f1323",      // Noir bleuté
        light: "#FAFAFA",     // Gris très clair
      },
      borderRadius: {
        'modern': '2rem',     // 32px
        'huge': '3rem',       // 48px
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};