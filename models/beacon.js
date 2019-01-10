var mongoose = require('mongoose');

var TempSchema = new mongoose.Schema({
  "P-IN": Number,
  "P-OUT": Number,
  Timestamp: { type : Date, default: Date.now }
});

module.exports = mongoose.model('BeaconData', TempSchema);
