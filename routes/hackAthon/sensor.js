var express = require('express');
var router = express.Router();

router.post("/putSanam", async function (req, res) {
  // var data = req.body
  // var id = data.DevEUI_uplink.payload_parsed.frames[0].value
  // var temp = data.DevEUI_uplink.payload_parsed.frames[1].value
  // var dataHW = await temp.create({teamID: id, temp})
  // res.send(dataHW);
  res.end()
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
