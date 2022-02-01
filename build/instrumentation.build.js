import buble from '@rollup/plugin-buble';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import path from 'path';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import sourcemaps from 'rollup-plugin-sourcemaps';
import styles from 'rollup-plugin-styles';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import visualizer from 'rollup-plugin-visualizer';
import vue from 'rollup-plugin-vue';
import polyFillsWrapper from '../node_modules/@empathyco/x-components/build-helpers/plugins/polyfills-wrapper.plugin';

const jsOutputDirectory = path.join(process.cwd(), 'dist');

const postCSSPlugins = [autoprefixer(), cssnano({ preset: ['default', { mergeLonghand: false }] })];

/**
 * Creates a rollup configuration for projects that use X-Components. This configuration can be customized with the options object.
 *
 * @param {boolean} extractCss - If true, the build will generate a `.css` and a `.js` file.
 * @param {string} outputCss - If `extractCss` is true, the build will generate a `.css` in this path.
 * @param {import('rollup').InputOptions} input - Overrides the entry file. Check http://rollupjs.org/guide/en/#input
 * @param {import('rollup').OutputOptions} output - Overrides the output settings. Check http://rollupjs.org/guide/en/#outputdir
 * @param {Record<string, Record<string, unknown>>} plugins - A dictionary that allows overriding specific plugin configurations.
 *
 * @returns {import('rollup').RollupOptions}
 */
export function createConfig({
  extractCss = false,
  outputCss = './styles.css',
  input = path.join(process.cwd(), 'src/main.ts'),
  output,
  plugins = {}
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
      ...plugins[pluginName]
    };
  }

  return {
    input,
    output: {
      dir: jsOutputDirectory,
      format: 'es',
      sourcemap: true,
      assetFileNames: '[name][extname]',
      entryFileNames: 'app.js',
      ...output
    },
    plugins: [
      del(
        mergeConfig('del', {
          targets: [`${jsOutputDirectory}/*`]
        })
      ),
      copy({
        targets: [{ src: ['public/**', '!public/index.html'], dest: 'dist/' }]
      }),
      // Resolving plugins
      replace(
        mergeConfig('replace', {
          'process.env.NODE_ENV': JSON.stringify('production')
        })
      ),
      commonjs(mergeConfig('commonjs')),
      resolve(
        mergeConfig('resolve', {
          browser: true
        })
      ),
      // Code transpiling plugins
      vue(
        mergeConfig('vue', {
          css: !extractCss, // css: false = extract; css: true = no extract.
          needMap: false,
          style: {
            postcssPlugins: postCSSPlugins
          }
        })
      ),
      typescript(
        mergeConfig('typescript', {
          tsconfigOverride: {
            exclude: ['node_modules', '**/*.spec.ts', '*test*']
          }
        })
      ),
      json(),
      buble(
        mergeConfig('buble', {
          include: ['**/*.js', '**/*.mjs']
        })
      ),
      styles(
        mergeConfig('styles', {
          mode: extractCss ? ['extract', outputCss] : 'inject',
          plugins: postCSSPlugins
        })
      ),
      htmlTemplate(
        mergeConfig('htmlTemplate', {
          template: path.resolve(process.cwd(), 'public/index.html'),
          attrs: ["type='module'"]
        })
      ),
      sourcemaps(mergeConfig('sourcemaps')),
      polyFillsWrapper(mergeConfig('polyfillsWrapper')),
      terser(
        mergeConfig('terser', {
          output: { comments: false }
        })
      ),
      /* Can't calculate real minified size with `sourcemap: true` and `gzipSize: true`:
       https://github.com/btd/rollup-plugin-visualizer/issues/72 */
      visualizer(mergeConfig('visualizer', { sourcemap: true }))
    ]
  };
}

export default createConfig();
