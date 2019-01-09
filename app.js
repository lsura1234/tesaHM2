var express = require('express');
var _ = require('lodash')
var body = require('body-parser');
app = express();
var app = express();

app.use(body.json());
app.post("/receiveData", function (req, res) {

})
app.get("/showData", function (res, req) {

})
app.post("/addData", function (req, res) {

})
app.put("/editData/:teamID", function (req, res) {
    var id = parseInt(req.params.teamID)
    console.log(id);

})
app.put("/deleteData/:teamID", function (req, res) {
    var id = parseInt(req.params.teamID)
})
var server = app.listen(8080, function () {
    var port = server.address().port
    console.log('Sample test', port);
});



//var  = require('path');
//var favicon = require('serve-favicon');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');
// var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost/hwDATA')
//   .then(() =>  console.log('connection succesful'))
//   .catch((err) => console.error(err));

// var index = require('./routes/index');
// var users = require('./routes/users');
// var employees = require('./routes/employees');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
// app.use('/users', users);
// app.use('/employees', employees);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

//module.exports = app;
