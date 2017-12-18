var express = require('express');
var path = require('path');
var compression = require('compression');

var port = 3000;
var app = express();

app.use(compression());
app.use(express.static('build'));

app.all('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  }
});