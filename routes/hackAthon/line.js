var express = require('express');
var router = express.Router();
var beacon = require("../../models/beacon");

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
  //sendData
  
  sendDate = dataHW.Timestamp.toString();
  
  month = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  showMonth = sendDate.substr(4, 3)
  showMonth = month.indexOf(showMonth)

  year = sendDate.substr(11, 4)
  day = sendDate.substr(8, 2)
  hour = sendDate.substr(16, 2)
  min = sendDate.substr(19, 2)
  sec = sendDate.substr(22, 2)
  if (hour < 7) {
    day--
    hour = 24 - 7 + parseInt(hour)
  }
  if (showMonth < 10) {
    showMonth = `0${showMonth}`
  }
  sendDate = `${year}-${showMonth}-${day} ${hour}:${min}:${sec}`;
  showdata = {}
  showdata["beacon"] = { "datetime": sendDate, "status": type }
  console.log(showdata)

  res.send(showdata)
  beacon.findById(dataHW._id, function (err, Filed) {
    Filed.Timestamp=`${year}-${showMonth}-${day}T${hour}:${min}:${sec}`
    Filed.save(function (err, updateDate) {
      if (err) return handleError(err);
      console.log(updateDate)
    })
  })
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
