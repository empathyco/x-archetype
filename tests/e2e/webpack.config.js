module.exports = {
  resolve: {
    extensions: ['.ts', '.js', '.feature', '.features']
  },
  node: { fs: 'empty', child_process: 'empty', readline: 'empty' },
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
  }
};
