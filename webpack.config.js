const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: "./client/main.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, 'public/build/'),
    filename: "./bundle.js",
    publicPath: "build/"
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public/'),
    compress: true,
    port: 9000,
    watchContentBase: true,
    progress: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      },
    }
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }]
      },
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|ttf)$/,
        use: "url-loader?name=[name].[ext]"
      }
    ]
  }
};