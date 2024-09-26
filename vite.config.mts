import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import Inspector from 'vite-plugin-vue-inspector';
import injectHTML from 'vite-plugin-html-inject';

export default defineConfig({
  define: {
    'process.env': {}
  },
  plugins: [injectHTML(), vue(), Inspector()],
  server: {
    port: 8080
  },
  preview: {
    port: 8080
  }
});
