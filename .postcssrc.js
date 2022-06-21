module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-nested'),
    require('postcss-import'),
    require('postcss-logical'),
    require('postcss-dir-pseudo-class'),
    require('cssnano')({ preset: ['default', { mergeLonghand: false }] })
  ]
};
