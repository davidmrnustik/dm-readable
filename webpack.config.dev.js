require('dotenv').config();
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, 'src/index.html'),
  filename: 'index.html',
  inject: 'body'
});

const extractCSS = new ExtractTextPlugin({
  filename: '[name].css'
})

module.exports = {
  entry: {
    app: [path.resolve(__dirname, 'src/index.js')]
  },
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
    extractCSS,
    HtmlWebpackPluginConfig
  ],
  devServer: {
    historyApiFallback: true
  },
  devtool: 'inline-source-map'
}