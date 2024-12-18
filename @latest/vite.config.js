import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist/public', // Ensure the frontend is built into a public directory
    emptyOutDir: true, // Clear the output directory before each build
  },
  server: {
    port: 8080,
  },
});

