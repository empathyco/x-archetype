module.exports = {
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
};
