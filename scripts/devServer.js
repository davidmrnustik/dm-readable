import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
const  config = require("../webpack.config.dev.js");

config.entry.app.unshift("webpack-dev-server/client?http://localhost:3000/");
const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {});
server.listen(3000);