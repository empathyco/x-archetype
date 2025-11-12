import { empathyco } from '@empathyco/eslint-config'

export default empathyco({
  ignores: [
    'shims-tsx.d.ts',
    'shims-vue.d.ts',
    'jest.setup.ts',
    'cypress.config.ts',
    '**/*.js',
    '**/*.md',
  ],
})
