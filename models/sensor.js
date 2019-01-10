var mongoose = require('mongoose');

var SchemaTypes = mongoose.Schema.Types;
var TempSchema = new mongoose.Schema({
  Temperature: {
    type: SchemaTypes.Double
},
  Humidity: {
    type: SchemaTypes.Double
},
  "P-IN": Number,
  "P-OUT": Number,
  Timestamp: { type : Date, default: Date.now }
});

module.exports = mongoose.model('SensorData', TempSchema);
