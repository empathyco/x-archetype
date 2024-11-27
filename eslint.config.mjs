import { empathyco } from '@empathyco/eslint-config'

export default empathyco(
  { ignores: ['shims-tsx.d.ts', 'shims-vue.d.ts', 'jest.setup.ts', '**/*.js'] },
  {
    rules: {
      'vuejs-accessibility/no-autofocus': 'off',
      'vue/multi-word-component-names': 'off',
      'node/prefer-global/process': 'off',
    },
  },
)
