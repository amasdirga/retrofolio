import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  // Fix: Use '.' instead of process.cwd() to avoid TypeScript error about 'cwd' missing on 'Process'
  const env = loadEnv(mode, '.', '');
  
  return {
    plugins: [react()],
    define: {
      // Safely expose the API_KEY to the client-side code during build
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    },
    base: './', // Ensures assets are linked correctly on GitHub Pages
  };
});