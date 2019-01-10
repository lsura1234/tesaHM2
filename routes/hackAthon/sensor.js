var express = require('express');
var router = express.Router();
var sensor = require("../../models/sensor");

router.post("/putSanam", async function (req, res) {
  var data = req.body
  var Temperature = 0
  var Humidity = 0
  data.data.DevEUI_uplink.payload_parsed.frames.map(data => {
    if(data.typeString === 'Temperature Sensor'){
      Temperature = data.value
    } else if(data.typeString === 'Humidity Sensor'){
      Humidity = data.value
    }
  })

  var dataHW = await sensor.create({Temperature,Humidity})
  res.send(dataHW);
  res.end()
})

module.exports = router;
