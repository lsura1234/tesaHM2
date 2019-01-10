var mongoose = require('mongoose');
var moment = require('moment')

var SensorSchema = new mongoose.Schema({
  Temperature: Number,
  Humidity: Number,
  "P-IN": Number,
  "P-OUT": Number,
  Timestamp: { type : Date, default: Date.now }
});

module.exports = mongoose.model('SensorData', SensorSchema);
