var express = require('express');
var app = express();
var path = require('path');
//var bodyParser = require('body-parser');

//app.use(bodyParser.json());

//your routes here
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/ui', 'index.html'));
});

app.get('/ui/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', req.params.fileName));
});

app.get('/ui/images/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'images', req.params.fileName));
});

app.listen(80, function () {
  console.log('Example app listening on port 8080!');
});
