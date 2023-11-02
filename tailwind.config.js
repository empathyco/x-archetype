const { xTailwindPlugin } = require('@empathyco/x-tailwindcss');
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
  plugins: [xTailwindPlugin(options)]
};
