import * as fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import vue3 from '@vitejs/plugin-vue'
import copy from 'rollup-plugin-copy'
import del from 'rollup-plugin-delete'
import htmlTemplate from 'rollup-plugin-generate-html-template'
import sourcemaps from 'rollup-plugin-sourcemaps'
import styles from 'rollup-plugin-styles'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'

/**
 * Creates a rollup configuration for projects that use X-Components. This configuration can be
 * customized with the options object.
 *
 * @param {boolean} extractCss - If true, the build will generate a `.css` and a `.js` file.
 * @param {import('rollup').InputOptions} input - Overrides the entry file. Check
 *   http://rollupjs.org/guide/en/#input
 * @param {import('rollup').OutputOptions} output - Overrides the output settings. Check
 *   http://rollupjs.org/guide/en/#outputdir
 * @param {Record<string, Record<string, unknown>>} plugins - A dictionary that allows overriding
 *   specific plugin configurations.
 *
 * @returns {import('rollup').RollupOptions}
 */
export function createConfig({
  input = path.join(process.cwd(), 'src/main.ts'),
  output,
  plugins = {},
  prePlugins = [],
  postPlugins = [],
} = {}) {
  /**
   * Merges a default config with the user one coming from this rollup plugin options.
   *
   * @param {string} pluginName - The plugin name for finding the config.
   * @param {Config} defaultConfig - The default config for the plugin
   * @return {Config} The merged config.
   */
  function mergeConfig(pluginName, defaultConfig = {}) {
    return {
      ...defaultConfig,
      ...plugins[pluginName],
    }
  }

  const mergedOutput = {
    dir: path.join(process.cwd(), 'dist'),
    format: 'es',
    sourcemap: true,
    assetFileNames: '[name][extname]',
    entryFileNames: 'app.js',
    ...output,
  }

  return {
    input,
    output: mergedOutput,
    preserveEntrySignatures: false,
    plugins: [
      ...prePlugins,
      del(
        mergeConfig('del', {
          targets: [`${mergedOutput.dir}/*`],
        }),
      ),
      copy({
        targets: [{ src: ['public/**'], dest: `${mergedOutput.dir}` }],
      }),
      // Resolving plugins
      replace(
        mergeConfig('replace', {
          'process.env.NODE_ENV': JSON.stringify('production'),
          'process.env.VUE_APP_DEVELOPMENT_DOCKER': JSON.stringify(
            !!process.env.VUE_APP_DEVELOPMENT_DOCKER,
          ),
          STRIP_SSR_INJECTOR: true,
          preventAssignment: true,
        }),
      ),
      commonjs(mergeConfig('commonjs')),
      resolve(
        mergeConfig('resolve', {
          browser: true,
        }),
      ),
      // Code transpiling plugins
      vue3(
        mergeConfig('vue3', {
          template: {
            compilerOptions: {
              whitespace: 'condense',
            },
          },
        }),
      ),
      styles(mergeConfig('styles')),
      typescript(
        mergeConfig('typescript', {
          check: false,
          tsconfigOverride: {
            exclude: ['node_modules', '**/*.spec.ts', '*test*'],
          },
        }),
      ),
      json(),
      htmlTemplate(
        mergeConfig('htmlTemplate', {
          template: path.resolve(process.cwd(), 'index.html'),
          // Replace vars to make compatible the same `index.html` for dev Vite & build Rollup.
          replaceVars: {
            '<script type="module" src="./src/main.ts"></script>': '',
            '<load src="node_modules/@empathyco/x-archetype-utils/dist/home/home-template.html" />':
              fs.readFileSync(
                'node_modules/@empathyco/x-archetype-utils/dist/home/home-template.html',
              ),
          },
          attrs: ["type='module'"],
        }),
      ),
      sourcemaps(mergeConfig('sourcemaps')),
      terser(
        mergeConfig('terser', {
          output: { comments: false },
        }),
      ),
      ...postPlugins,
    ],
  }
}
