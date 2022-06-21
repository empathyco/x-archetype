const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: ['@empathyco/x-components'],
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.ts|js|vue$/,
          enforce: 'pre',
          use: ['source-map-loader']
        }
      ]
    }
  }
});
