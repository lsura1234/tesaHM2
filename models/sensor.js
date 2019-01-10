var mongoose = require('mongoose');

var SensorSchema = new mongoose.Schema({
  Temperature: Number,
  Humidity: Number,
  "P-IN": Number,
  "P-OUT": Number,
  Timestamp: { type : Date, default: moment().add('7','hours') }
});

module.exports = mongoose.model('SensorData', SensorSchema);
