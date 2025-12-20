/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tu nueva paleta personalizada
        gainsboro: "#DCDCDC",
        gold: "#FFD700",
        yellowColor: "#FEB60D",
        headingColor: "#000000", // Negro puro para encabezados
        textColor: "#000000",    // Negro puro para todo el texto
      },
      backgroundColor: {
        'main': '#DCDCDC', // Gainsboro
        'card': '#FFFFFF', // Blanco
      }
    },
  },
  plugins: [],
}