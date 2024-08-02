import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // base: "/contact-app",
  plugins: [react()],

  server: {
    cors: false,
    proxy: {
      '/api': {
        target: 'https://live.devnimble.com/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
