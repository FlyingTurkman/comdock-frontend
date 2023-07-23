/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#006378',
          50: '#BAF3FF',
          100: '#97EDFF',
          200: '#4FE0FF',
          300: '#08D4FF',
          400: '#009EBF',
          500: '#006378',
          600: '#005669',
          700: '#004A59',
          800: '#003D4A',
          900: '#00313B',
          950: '#002A33'
        },
        info: '#0ea5e9',
        success: '#4CB050',
        error: '#D32F2E',
        warning: '#FF9700'
      }
    },
  },
  plugins: [],
};

