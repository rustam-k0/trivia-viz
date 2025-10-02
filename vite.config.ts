import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite просто обрабатывает CSS, Tailwind через PostCSS встроено
export default defineConfig({
  plugins: [react()],
});
