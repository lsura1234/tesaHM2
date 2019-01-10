var express = require('express');
var body = require('body-parser');
app = express();
var mongoose = require('mongoose')
app.use(body.json());
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://tgr:12345678@localhost/tgr2019')
  .then(() =>  console.log('connection succesful for tgr2019'))
  .catch((err) => console.error(err));

var temp = require('./routes/temp')
var sensor = require('./routes/hackAthon/sensor')
var line = require('./routes/hackAthon/line')

app = express();
var app = express();

app.use(body.json());
app.use('/', temp);
app.use('/sensor', sensor);
app.use('/line', line);

var server = app.listen(8080, function () {
    var port = server.address().port
    console.log('Sample test', port);
});

module.exports = app;
