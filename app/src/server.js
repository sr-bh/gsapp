var express = require('express');
var app = express();

//your routes here
app.get('/', function (req, res) {
    res.send("Hello World!");
});

app.listen(80, function () {
  console.log('Example app listening on port 8080!');
});
