import { empathyco } from '@empathyco/eslint-config'

export default empathyco(
  { ignores: ['shims-tsx.d.ts', 'shims-vue.d.ts', 'jest.setup.ts', '**/*.js'] },
  {
    rules: {
      'vuejs-accessibility/no-autofocus': 'off',
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    files: ['*-icon*.vue', 'logo.vue'],
    rules: {
      'max-len': 'off',
    },
  },
)
