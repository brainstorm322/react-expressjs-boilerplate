const path = require('path');
const entryFile = path.resolve(__dirname, 'src', 'client', 'index.js');
const outputDir = path.resolve(__dirname, 'src', 'client', 'dist');

const webpack = require('webpack');

module.exports = {
  entry: ['babel-polyfill', entryFile],
  output: {
    filename: './bundle.js',
    path: outputDir
  },
  module: {
    rules: [

      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: '.src/client/dist',
    hot: true,
    proxy: {
      '/': 'http://localhost:3000',
      '/api': 'http://localhost:3000',
      '/auth': 'http://localhost:3000'
    }
  }
};