// frontend/postcss.config.mjs
// Use ESM export default syntax for .mjs files

// Import the necessary plugins if needed (though often auto-detected)
// import tailwindcss from '@tailwindcss/postcss'; // Or just 'tailwindcss' might work here
// import autoprefixer from 'autoprefixer';

const config = {
  plugins: {
    // Use the specific package name if direct 'tailwindcss' fails with Turbopack
    'tailwindcss': {},
    // Or sometimes just 'tailwindcss' works here if the path is resolved correctly
    // 'tailwindcss': {},
    'autoprefixer': {},
    // You might need other PostCSS plugins depending on your setup,
    // but for basic Tailwind, this is usually enough.
  },
};

export default config;