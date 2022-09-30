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
    },
    output: {
      devtoolModuleFilenameTemplate: ({ resourcePath, hash, query }) =>
        resourcePath.match(/\.vue$/) && !query.match(/type=script/)
          ? `webpack-generated:///${resourcePath}?${hash}`
          : `sources://${resourcePath}`,
      devtoolFallbackModuleFilenameTemplate: 'webpack:///[resource-path]?[hash]'
    }
  }
});
