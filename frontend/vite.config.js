import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:5000',  // Proxy API requests to the backend server for local development
    }
  },
  plugins: [react(), tailwindcss()],
  // If you need to specify the base URL for production
  base: '/', // Vercel uses the root by default
})
