require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, 'src/index.html'),
  filename: 'index.html',
  inject: 'body'
});

const UglifyJSPluginConfig = new UglifyJSPlugin({
  test: /\.js/,
  sourceMap: true
});

const extractCSS = new ExtractTextPlugin({
  filename: '[name].css'
})

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};


module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [
          path.resolve(__dirname, "src")
        ],
        exclude: [
          path.resolve(__dirname, "node_modules")
        ],
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: extractCSS.extract({
          use: [{
            loader: "css-loader"
          }],
          fallback: "style-loader"
        })
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=/fonts/[name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    extractCSS,
    HtmlWebpackPluginConfig,
    new webpack.DefinePlugin(GLOBALS),
    UglifyJSPluginConfig
  ]
}