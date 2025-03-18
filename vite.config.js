import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT || 4173, // Use Render's port or fallback to 3000
  },
  server: {
    host: true,
    port: process.env.PORT || 3000,
    allowedHosts: ['wfront.onrender.com'],
  },
});
