import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueTypeImports from 'vite-plugin-vue-type-imports';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VueTypeImports()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
