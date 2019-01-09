var express = require('express');
var body = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://al:allee@localhost/hwData')
  .then(() =>  console.log('connection succesful for hwData'))
  .catch((err) => console.error(err));

var temp = require('./routes/temp')

app = express();
var app = express();

app.use(body.json());
app.use('/', temp);

var server = app.listen(8080, function () {
    var port = server.address().port
    console.log('Sample test', port);
});

module.exports = app;
