/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ["custom", "sans-serif"],
        "custom-bold": ["custom-bold", "sans-serif"],
      },
      animation: {
        chevron: 'chevron 3s infinite linear',
      },
      keyframes: {
          chevron: {
              '0%': {
                opacity: '0%'
              },
              '20%': {
                opacity: '100%'
              },
              '30%': {
                transform: 'translateY(0)',
                opacity: '100%'
              },
              '50%': {
                transform: 'translateY(12px)',
                opacity: '100%'
              },
              '60%': {
                transform: 'translateY(12px)',
                opacity: '100%'
              },
              '70%': {
                transform: 'translateY(12px)',  
                opacity: '0%'
              },
              '100%': {
                transform: 'translateY(10px)',  
                opacity: '0%'
              }
          },
      },
    },
  },
  plugins: [],
}