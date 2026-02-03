/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/shared-ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [require('../../packages/shared-ui/tailwind.config.js')],
  theme: {
    extend: {
      colors: {
        // Couleur principale - Bleu
        primary: {
          DEFAULT: "#062AD7", // bleu principal
          dark: "#041FA3",    // optionnel si tu veux une version plus foncée
          light: "#3D5AFE"    // optionnel si tu veux une version plus claire
        },

        // Couleur secondaire - Orange
        secondary: {
          DEFAULT: "#F76513"
        },

        // Couleurs neutres
        background: "#FAFAFA",
        gray: {
          DEFAULT: "#A6A6A6"
        },

        white: "#FFFFFF",
        black: "#000000"
      },
      fontFamily: {
        sans: ['Roboto', 'system-ui', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
