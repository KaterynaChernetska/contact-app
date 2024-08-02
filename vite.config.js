import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // base: '/contact-app/',
  server: {
    proxy: {
      '/api': {
        target: 'https://live.devnimble.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
});