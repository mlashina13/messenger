import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: '3000',
  },
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
      },
    },
  },
  plugins: [
    handlebars(),
  ],
});
