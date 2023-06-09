/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      sm: '0.8rem',
      md: '1.3rem',
      lg: '2rem',
      base: '1rem',
      xl: '2.8rem',
      '2xl': '3.4rem',
      '3xl': '4.3rem',
    },
    extend: {},
  },
  plugins: [],
}

