import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import Inspector from 'vite-plugin-vue-inspector';
import injectHTML from 'vite-plugin-html-inject';

export const vueDocsPlugin = {
  name: 'vue-docs',
  transform(code: string, id: string) {
    return !/vue&type=docs/.test(id) ? undefined : `export default ''`;
  }
};

export default defineConfig({
  plugins: [injectHTML(), vue(), vueDocsPlugin, Inspector()],
  server: {
    port: 8080
  },
  preview: {
    port: 8080
  }
});
