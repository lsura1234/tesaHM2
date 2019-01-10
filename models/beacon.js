var mongoose = require('mongoose');
var moment = require('moment')

var BeaconSchema = new mongoose.Schema({
  "P-IN": Number,
  "P-OUT": Number,
  Timestamp: { type : Date, default: moment().add('7','hours')}
});

module.exports = mongoose.model('BeaconData', BeaconSchema);
