var express = require('express');
var router = express.Router();
var sensor = require("../../models/sensor");

router.post("/putSanam", async function (req, res) {
  var data = req.body
  var Temperature = 0
  var Humidity = 0
  var pIn = 0
  var pOut = 0
  data.DevEUI_uplink.payload_parsed.frames.map(data => {
    if(data.typeString === 'Temperature Sensor'){
      Temperature = data.value
    } else if(data.typeString === 'Humidity Sensor'){
      Humidity = data.value
    } else if(data.channel === 4){
      pIn = data.value
    } else if(data.channel === 5){
      pOut = data.value
    } 
  })

  var dataHW = await sensor.create({Temperature ,Humidity ,'P-IN': pIn,'P-OUT': pOut})
  res.send(dataHW);
  console.log(data)
  res.end()
})

module.exports = router;
