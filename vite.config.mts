// @ts-expect-error moduleResolution issue
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import injectHTML from 'vite-plugin-html-inject'
import Inspector from 'vite-plugin-vue-inspector'

export default defineConfig({
  define: {
    'process.env': {},
  },
  // eslint-disable-next-line ts/no-unsafe-call
  plugins: [injectHTML(), vue(), tailwindcss(), Inspector()],
  server: {
    port: 8080,
  },
  preview: {
    port: 8080,
  },
})
