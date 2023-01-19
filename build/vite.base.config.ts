import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md'
import path from 'path'

export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/], // <--
    }),
    Markdown(),
  ],
  resolve: {
    alias: {
      "@packages": path.resolve(__dirname, '../packages'),
      "@examples": path.relative(__dirname, '../examples'),
      "@public": path.relative(__dirname, '../public')
    }
  }
})
