/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Colores de marca
        gainsboro: "#DCDCDC",
        gold: "#FFD700",
        yellowColor: "#FEB60D",
        headingColor: "#000000",
        textColor: "#000000",
        
        // Alias semánticos para mayor rapidez al programar
        brand: {
          main: "#DCDCDC",
          accent: "#FFD700",
        },
        
        // Forzar transparencia y fondos limpios
        transparent: 'transparent',
        white: '#FFFFFF',
        black: '#000000',
      },
      // Centralizamos los fondos aquí también para usar la sintaxis bg-main o bg-card
      backgroundColor: {
        main: "#DCDCDC",
        card: "#FFFFFF",
      },
      // Útil para los efectos de desenfoque que usas en el Header
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
};