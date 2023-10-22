const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    fontFamily: {
      main: ['Gabarito', 'cursive'],
      sans: ['Roboto', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        primary: 'oklch(0.32 0 0)',
        accent: 'oklch(0.53 0.16 276.05)'
      }
    },
  },
  plugins: [],
}
