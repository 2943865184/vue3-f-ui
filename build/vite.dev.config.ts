import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import baseConfig from './vite.base.config';

export default defineConfig({
    ...baseConfig,
    server: {
        open: '../public/index.html'
    }
})
