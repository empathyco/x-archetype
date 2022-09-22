module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-nested'),
    require('postcss-import'),
    require('postcss-logical'),
    require('postcss-dir-pseudo-class'),
    require('cssnano')({ preset: ['default', { mergeLonghand: false }] })
  ]
};
