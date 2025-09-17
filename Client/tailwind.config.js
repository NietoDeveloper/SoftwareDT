// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      // If using src directory: './src/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
      extend: {
        colors: { // Example custom colors - adapt to your brand
          primary: {
            light: '#67e8f9', // Lighter cyan
            DEFAULT: '#06b6d4', // Cyan 600
            dark: '#0e7490',   // Darker cyan
          },
          secondary: {
            light: '#f9a8d4', // Lighter pink
            DEFAULT: '#ec4899', // Pink 500
            dark: '#be185d',   // Darker pink
          },
          neutral: { // Shades of gray
            light: '#f3f4f6', // gray-100
            DEFAULT: '#6b7280', // gray-500
            dark: '#1f2937',   // gray-800
          }
        },
        fontFamily: { // Example custom fonts (ensure they are loaded)
          sans: ['Inter', 'sans-serif'], // Example using Inter
          // serif: ['Merriweather', 'serif'],
        },
        // Add more extensions: spacing, borderRadius, etc.
      },
    },
    plugins: [
       require('@tailwindcss/forms'), // Useful plugin for form styling resets
    ],
  }