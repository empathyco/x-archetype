const { ProvidePlugin } = require('webpack');

module.exports = {
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.js', '.feature', '.features'],
    fallback: { path: 'path-browserify', fs: false, child_process: false, readline: false }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.feature$/,
        use: [
          {
            loader: 'cypress-cucumber-preprocessor/loader'
          }
        ]
      },
      {
        test: /\.features$/,
        use: [
          {
            loader: 'cypress-cucumber-preprocessor/lib/featuresLoader'
          }
        ]
      },
      {
        test: /@empathyco\/x-components.+\.js$/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new ProvidePlugin({
      process: 'process/browser'
    })
  ]
};
