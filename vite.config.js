import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';
import postcssNesting from 'postcss-nesting';
import { defineConfig } from 'vite'


const pageData = {
    '/index.html': {
        title: 'Авторизация',
    },
    '/pages/chat/chat.html': {
        title: 'Список чатов',
        chats: [
            { name: 'Продажа цветов', count: 20, photo: '/assets/img/photo2.jfif', url: '/pages/page404/page404.html' },
            { name: 'Береги природу', count: 999, photo: '/assets/img/photo2.jpg', url: '/pages/page404/page404.html' },
            { name: 'Родительский коммитет', photo: '/assets/img/photo1.jfif', url: '/pages/page404/page404.html'  },
            { name: 'Группа Волшебники, детский сад №27 г. Таганрог, Ростовская обоасти', photo: '/assets/img/photo3.jfif', url: '/pages/page404/page404.html'  }
        ]
    },
    '/pages/profile/profile.html': {
        title: 'Профиль',
    },
    '/pages/registration/registration.html': {
        title: 'Регистрация',
    },
    '/pages/page404/page404.html': {
        title: 'Ошибка',
    },
    '/pages/page500/page500.html': {
        title: 'Ошибка',
    }
};

export default defineConfig({
    server: {
        port: '3000'
    },
    root: resolve(__dirname, 'src'),
    build: {
        outDir: resolve(__dirname, 'dist'),
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                registration: resolve(__dirname, 'src/pages/registration/registration.html'),
                profile: resolve(__dirname, 'src/pages/profile/profile.html'),
                page404: resolve(__dirname, 'src/pages/page404/page404.html'),
                page500: resolve(__dirname, 'src/pages/page500/page500.html'),
                chats: resolve(__dirname, 'src/pages/chat/chat.html'),
            }
        }
    },
    plugins: [
        handlebars({
            context(pagePath) {
                return pageData[pagePath];
            },
            partialDirectory: resolve(__dirname, 'src/partials'),
        })
    ]
})
