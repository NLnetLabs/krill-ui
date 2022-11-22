import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const api = {
  target: 'https://127.0.0.1:3000',
  secure: false,
};

export default defineConfig({
  base: '/',
  server: {
    proxy: {
      '/auth': api,
      '/api': api,
      '/stats': api,
      '/ta': api,
      '/testbed': api,
    },
  },
  plugins: [react()],
});
