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
    files: ['src/**/*.{ts,tsx,vue}'],
    rules: {
      // Enable the following rules progressively when the project is ready to enforce them
      'vue/no-reserved-component-names': 'off',
      'vue/valid-v-slot': 'off',
      'vue/no-deprecated-v-on-native-modifier': 'off',
      'node/prefer-global/process': 'off',
      'no-new': 'off',
      'ts/no-floating-promises': 'off',
      'ts/no-misused-promises': 'off',
      'ts/no-unsafe-member-access': 'off',
    },
  },
  {
    files: ['tests/**/*.{ts,tsx,vue}'],
    rules: {
      // Enable the following rules progressively when the project is ready to enforce them
      'ts/no-unsafe-call': 'off',
      'ts/no-unsafe-argument': 'off',
      'ts/no-unsafe-member-access': 'off',
      'ts/no-unsafe-return': 'off',
      'ts/no-namespace': 'off',
    },
  },
)
