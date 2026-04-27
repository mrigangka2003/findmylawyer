/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      colors: {
        primary: {
          50: '#fafafa',
          100: '#f4f4f5',
          500: '#ffffff',
          600: '#d4d4d8',
          900: '#18181b',
        },
        dark: {
          900: '#000000',
          800: '#09090b',
          700: '#18181b',
        }
      },
      gridTemplateColumns:{
        'auto':'repeat(auto-fill,minmax(200px,1fr))'
      }
    },
  },
  plugins: [],
}