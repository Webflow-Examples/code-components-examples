import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react({
      // Enable TypeScript support
      include: "**/*.{jsx,tsx}",
    }),
    tailwindcss()
  ],
  // Enable TypeScript support in Vite
  esbuild: {
    loader: 'tsx',
    include: /src\/.*\.[tj]sx?$/,
    exclude: []
  }
});