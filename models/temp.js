var mongoose = require('mongoose');

var TempSchema = new mongoose.Schema({
  teamID: String,
  temp: Number
});

module.exports = mongoose.model('temperature', TempSchema);
