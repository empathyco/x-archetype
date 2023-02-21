const { xTailwindPlugin, oldDsPlugin } = require('@empathyco/x-tailwindcss');
const options = require('./src/tailwind/plugin-options');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.vue',
    'node_modules/@empathyco/x-components/**/components/**/*.js'
  ],
  prefix: 'x-',
  important: true,
  plugins: [xTailwindPlugin(options), oldDsPlugin],
  // In order to avoid conflicting class names with the old design system while the new XDS is being developed
  // we are disabling all corePlugins from tailwindcss but `fontSize`, `fontWeight`, `lineHeight` and `textColor`.
  // You can check that tailwindcss is still working by checking the style of the heading `Test controls`
  // below the `Start` button on the `x-components` internal demo app.
  // See https://github.com/empathyco/x/pull/655#discussion_r948923711
  corePlugins: [
    'alignItems',
    'alignContent',
    'backgroundColor',
    'borderRadius',
    'display',
    'flex',
    'flexDirection',
    'flexGrow',
    'flexShrink',
    'flexWrap',
    'fontSize',
    'fontWeight',
    'gap',
    'gridAutoColumns',
    'gridAutoFlow',
    'gridAutoRows',
    'gridColumn',
    'gridColumnEnd',
    'gridColumnStart',
    'gridRow',
    'gridRowEnd',
    'gridRowStart',
    'gridTemplateColumns',
    'gridTemplateRows',
    'height',
    'justifyContent',
    'justifyItems',
    'justifySelf',
    'lineHeight',
    'margin',
    'maxHeight',
    'minHeight',
    'overflow',
    'padding',
    'preflight',
    'textAlign',
    'textColor',
    'verticalAlign',
    'width',
    'wordBreak',
    'zIndex'
  ]
};
