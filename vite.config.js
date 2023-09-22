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
        login: resolve(__dirname, 'src/pages/login/login.html'),
        registration: resolve(__dirname, 'src/pages/registration/registration.html'),
        profile: resolve(__dirname, 'src/pages/profile/profile.html'),
        page404: resolve(__dirname, 'src/pages/page404/page404.html'),
        page500: resolve(__dirname, 'src/pages/page500/page500.html'),
        chats_list: resolve(__dirname, 'src/pages/chats-list/chats-list.html'),
      },
    },
  },
  plugins: [
    handlebars(),
  ],
});
