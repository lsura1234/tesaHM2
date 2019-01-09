var express = require('express');
var body = require('body-parser');
app = express();
var mongoose = require('mongoose')
app.use(body.json());
mongoose.Promise = global.Promise;

<<<<<<< HEAD
mongoose.connect('mongodb://al:allee@localhost/hwData')
=======
mongoose.connect('mongodb://al:allee@localhost/hwDATA')
>>>>>>> 279304bd6189f7a93287ce9c1ef66174ede002ba
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
