const { DefinePlugin } = require('webpack');

module.exports = {
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.js', '.feature', '.features'],
    fallback: { "path": false, fs: 'false', child_process: 'false', readline: 'false' }
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
      new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
  ]
};
