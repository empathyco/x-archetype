import type { PluginOption } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

function getChunkFileName(name: string) {
  switch (name) {
    case 'custom-main-modal':
      return 'x-empty-search-[hash].js'
    case 'index':
      return 'x-search-[hash].js'
    default:
      return '[name]-[hash].js'
  }
}

function overrideXCssInjector(): PluginOption {
  return {
    name: 'override-x-css-injector',
    enforce: 'pre',
    transform(code: string, id: string) {
      const stringInjector = '(css) => window.xCSSInjector.addStyle({ source: css });'
      /* Replace the X CSS injector by xCSSInjector only for vite BUILD (look for ID). */
      if (id.includes('node_modules/@empathyco/x-components/tools/inject-css.js')) {
        return code.replace('export default injectCss', `export default ${stringInjector}`)
      }
      /* Replace the X CSS injector by xCSSInjector only for vite DEV (look for CODE). */
      if (code.includes('// node_modules/@empathyco/x-components/tools/inject-css.js')) {
        return code.replace(
          'var inject_css_default = injectCss;',
          `var inject_css_default = ${stringInjector}`,
        )
      }
    },
  }
}

export default defineConfig({
  define: {},
  build: {
    minify: false,
    rollupOptions: {
      output: {
        format: 'es',
        assetFileNames: '[name][extname]',
        entryFileNames: 'app.js',
        chunkFileNames: ({ name }) => getChunkFileName(name),
      },
    },
  },
  plugins: [
    overrideXCssInjector(),
    vue(),
    tailwindcss(),
    cssInjectedByJsPlugin({
      injectCode: cssCode => `window.xCSSInjector.addStyle({ source: ${cssCode} });`,
      topExecutionPriority: false, // Wait until `window.xCSSInjector` is created.
      dev: { enableDev: true },
    }),
  ],
  server: { port: 8080 },
  preview: { port: 8080 },
})
