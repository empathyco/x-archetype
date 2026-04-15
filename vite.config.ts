import type { PluginOption } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import visualizer from 'rollup-plugin-visualizer'
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
      const stringInjector = '(cssCode) => window.xCSSInjector.addStyle({ source: cssCode });'
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

// TODO - Tailwind 4 + ShadowRoot issue enclosing @supports block. Especially
//  the `-webkit-hyphens: none` condition. `@supports ((-webkit-hyphens: none) and`
//  To avoid issues with Chrome and Safari, we replace the whole `@supports` block.
// https://github.com/tailwindlabs/tailwindcss/issues/15005#issuecomment-3722970702
// https://github.com/tailwindlabs/tailwindcss/discussions/15556#discussioncomment-15063817
function injectCssCode(cssCode: string) {
  const normalizedCssCodeForShadowRoot = cssCode
    // BUILD
    .replace(
      '(((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b))))',
      '(display: block)',
    )
    // DEV
    .replace(
      '((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b))))',
      '(display: block)',
    )
  return window.xCSSInjector.addStyle({ source: normalizedCssCodeForShadowRoot })
}

export default defineConfig({
  base: './',
  build: {
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
      topExecutionPriority: false, // Wait until `window.xCSSInjector` is created.
      dev: { enableDev: true },
      injectCodeFunction: injectCssCode,
    }),
    visualizer(),
  ],
  server: { port: 8080 },
  preview: { port: 8080 },
})
