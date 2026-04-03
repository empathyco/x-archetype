import { empathyco } from '@empathyco/eslint-config'

export default empathyco({
  ignores: [
    'shims-tsx.d.ts',
    'shims-vue.d.ts',
    'vite-env.d.ts',
    'cypress.config.ts',
    '**/*.js',
    '**/*.md',
  ],
})
