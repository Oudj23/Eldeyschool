import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // default, change if deploying to subdirectory
  build: {
    outDir: 'dist',
  }
});
