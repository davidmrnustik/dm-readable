/*
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
const config = require("../webpack.config.dev.js");

config.entry.app.unshift("webpack-dev-server/client?http://localhost:8000/");
const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {});
server.listen(8000);
*/

import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';

const port = 8000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.all('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
  // res.render(path.join( __dirname, '../src/index.js'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});