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
        // Mantenemos los anteriores por si los usas en detalles técnicos
        primaryColor: "#0067FF", // Corregido el hex que faltaba un dígito
        yellowColor: "#FEB60D",
        purpleColor: "#9771FF",
        IrisBlue: "#01B5C5",
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