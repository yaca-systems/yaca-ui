import * as path from 'path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    base: './',
    build: {
        outDir: './dist/assets',
        emptyOutDir: true
    },
    resolve: {
        alias: [
            {
                find: '@', replacement: path.resolve(__dirname, './src')
            }
        ]
    }
});
