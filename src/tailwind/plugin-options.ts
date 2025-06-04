import type { Config } from 'tailwindcss/types/config'
import { xTailwindPlugin } from '@empathyco/x-tailwindcss'

/**
 * TODO Pending the second step of the migration to x-tailwindcss 2.x
 * Define the theme instead of extending it.
 *
 * Example: https://github.com/empathyco/motive-market/blob/main/tailwind/plugin-options.ts
 */
const tailwindConfig: Config = {
  content: [
    './public/index.html',
    './src/**/*.vue', // Scan tailwind classes from our components
    'node_modules/@empathyco/x-components/**/components/**/*.js', // Scan tailwind classes from x-components
  ],
  prefix: 'x-', // Prefix customer classes with "x"
  plugins: [xTailwindPlugin],
  theme: {
    extend: {
      // Redefine x-tailwindcss theme
      // eslint-disable-next-line unused-imports/no-unused-vars
      x: (theme: (param: string) => string) => ({}),
      // Extend customer theme with x-tailwindcss theme (prefixed also with "x")
      /* eslint-disable ts/no-unsafe-return */
      fontFamily: plugin => plugin.theme('x.fontFamily'),
      fontSize: plugin => plugin.theme('x.fontSize'),
      screens: plugin => plugin.theme('x.screens'),
      spacing: plugin => plugin.theme('x.spacing'),
      colors: plugin => plugin.theme('x.colors'),
      borderRadius: plugin => plugin.theme('x.borderRadius'),
      borderWidth: plugin => plugin.theme('x.borderWidth'),
      lineHeight: plugin => plugin.theme('x.lineHeight'),
      strokeWidth: plugin => plugin.theme('x.strokeWidth'),
      letterSpacing: plugin => plugin.theme('x.letterSpacing'),
      aspectRatio: plugin => plugin.theme('x.aspectRatio'),
      /* eslint-enable ts/no-unsafe-return */
    },
  },
}

export default tailwindConfig
