import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// For GitHub Pages project sites, build with BASE_PATH=/<repo-name>/
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/',
  server: {
    // Forward contact-form requests to the local API (npm run dev:api).
    proxy: { '/api': 'http://localhost:3001' },
  },
});
