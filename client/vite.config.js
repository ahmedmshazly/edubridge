import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API endpoints to the backend server
      '/api': 'https://api-beta-jet.vercel.app',
    },
  },
});
