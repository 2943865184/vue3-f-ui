import baseConfig from './vite.base.config';
import { defineConfig } from 'vite';
// import copy from 'rollup-plugin-copy'

export default defineConfig({
  ...baseConfig,
  build: {
    outDir: 'docs',
  },

});
