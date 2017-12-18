var webpack = require('webpack');
var webpackConfig = require('../webpack.config.prod.js');
var colors = require('colors');

process.env.NODE_ENV = 'production';

console.log('Preparing for production environment. This will take a moment...'.blue);

webpack(webpackConfig).run((err, stats) => {
  if (err) {
    console.log(err.bold.red);
    return 1;
  }

  var info = stats.toJson();

  if (info.hasErrors) {
    return info.errors.map(error => console.log(error.red));
  }

  if (info.hasWarnings) {
    console.log('There are following warnings: '.bold.yellow);
    info.warnings.map(warning => console.log(warning.yellow));
  }

  console.log(`Webpack stats info: ${stats}`);

  console.log(`App has been compiled in production mode`.green);

  return 0;

});