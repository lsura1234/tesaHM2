var express = require('express');
var router = express.Router();
var beacon = require("../../models/beacon");
var sensor = require("../../models/sensor");
var moment = require("moment")

router.post("/putSanam", async function (req, res) {
  var data = req.body
  var type = data.beacon.type
  if (type === "enter") {
    p_in = 1, p_out = 0
  }
  else if (type === "leave") {
    p_in = 0, p_out = 1
  }
  var dataHW = await beacon.create({ "P-IN": p_in, "P-OUT": p_out })
  res.send(dataHW)

  res.end()
})

router.get("/adminMon", async function (req, res) {
  // find data in beaconData
 var beacons = await beacon.find({
  Timestamp: {
    $gte: new Date((Date.now() - (parseInt(1) * 60 * 60 * 1000)))
  }
})
  var p_in =  beacons.map(item => item['P-IN']).reduce((prev, next) => prev + next)
  var p_out =  beacons.map(item => item['P-OUT']).reduce((prev, next) => prev + next);
  beacons = {
    p_in,
    p_out
  }
 // find lastest data
  var sensors = await sensor.findOne().sort({ field: 'asc', Timestamp: -1 }).limit(1)
  res.send({beacons, sensors})
  res.end()
})

router.get("/getSanam", async function (req, res) {
  // var data = req.body
  // var id = data.DevEUI_uplink.payload_parsed.frames[0].value
  // var temp = data.DevEUI_uplink.payload_parsed.frames[1].value
  // var dataHW = await temp.create({teamID: id, temp})
  // res.send(dataHW);
  var hours = req.query.hours
  res.end(hours)
})

router.get("/predict", async function (req, res) {
  // var data = req.body
  // var id = data.DevEUI_uplink.payload_parsed.frames[0].value
  // var temp = data.DevEUI_uplink.payload_parsed.frames[1].value
  // var dataHW = await temp.create({teamID: id, temp})
  // res.send(dataHW);
  res.end()
})
module.exports = router;
