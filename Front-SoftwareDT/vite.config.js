import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './testSetup.js', 
  },

  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser', 
    terserOptions: {
      compress: {
        drop_console: true, 
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor-core';
            if (id.includes('axios') || id.includes('tanstack')) return 'vendor-network';
            if (id.includes('framer-motion') || id.includes('lucide')) return 'vendor-ui';
            return 'vendor-utils';
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },

  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    port: 5173,
    strictPort: true,
    host: true,
  }
});