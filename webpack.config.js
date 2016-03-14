const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
//const ExtractTextPlugin = require("extract-text-webpack-plugin")

var webPackConfig = {
  devtool: 'source-map',
  entry: [
    './index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: '/node_modules/'
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.less$/,
        loader: "style!css!less",
        exclude: '/node_modules/'
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff',
        exclude: '/node_modules/'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream',
        exclude: '/node_modules/'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file',
        exclude: '/node_modules/'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml',
        exclude: '/node_modules/'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192',
        exclude: '/node_modules/'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  webPackConfig.plugins.push(new CleanWebpackPlugin(['dist']))
  //webPackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin())
  webPackConfig.plugins.push(new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './templates/index.html',
    inject: 'body',
    hash: true
  }))
}

module.exports = webPackConfig;

