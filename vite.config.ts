import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  server: {
    proxy: {
      '/auth': 'http://127.0.0.1:3000',
      '/api': 'http://127.0.0.1:3000',
      '/stats': 'http://127.0.0.1:3000',
    },
  },
  plugins: [react()],
});
