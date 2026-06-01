import { fileURLToPath, URL } from 'node:url'
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      setupFiles: ['vitest-setup.ts'],
      environment: 'happy-dom',
      root: fileURLToPath(new URL('./', import.meta.url)),
      exclude: [...configDefaults.exclude],
      deps: {
        inline: [],
      },
    },
  }),
)
