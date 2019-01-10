var express = require('express');
var router = express.Router();
var beacon = require("../../models/beacon");
var sensor = require("../../models/sensor");
var moment = require("moment")

router.post("/putSanam", async function (req, res) {
  var data = req.body
  var type = data.beacon.type

  var beacons = await beacon.find({
    Timestamp: {
      $gte: new Date((Date.now() - (parseInt(1) * 60 * 60 * 1000)))
    }
  })
  var p_in = beacons.map(item => item['P-IN']).reduce((prev, next) => prev + next, 0)
  var p_out = beacons.map(item => item['P-OUT']).reduce((prev, next) => prev + next, 0);
  beacons = {
    p_in,
    p_out,
    amount: p_in - p_out
  }

  if (beacons.amount >= 2 && type === "enter") {
    res.send({
      msg: 'จำนวนคนเกิน กรุณาเชิญคนออกจากบริเวณ'
    })
  } else {
    var pIn = 0
    var pOut = 0
    if (type === "enter") {
      pIn = 1
    }
    else if (type === "leave") {
      pOut = 1
    }
    var dataHW = await beacon.create({ "P-IN": pIn, "P-OUT": pOut })
    // // sendData
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
    //set2 8 ->08
    if (hour < 10) {
      hour = `0${hour}`
    }
    if (showMonth < 10) {
      showMonth = `0${showMonth}`
    }
    if (day < 10) {
      day = `0${day}`
    }
    sendDate = `${year}-${showMonth}-${day} ${hour}:${min}:${sec}`;
    showdata = {}
    showdata["beacon"] = { "datetime": sendDate, "status": type }

    hour = parseInt(hour) + 14
    if (parseInt(hour) > 23) {
      hour = parseInt(hour) - 24
      day = parseInt(day) + 1
    }
    if (hour < 10) {
      hour = `0${hour}`
    }
    if (day < 10) {
      day = `0${day}`
    }
    console.log("day is " + day + " time :" + hour)
    console.log(dataHW._id)
    await beacon.update({_id: dataHW._id}, {Timestamp: `${year}-${showMonth}-${day}T${hour}:${min}:${sec}`})
    var nowData = await beacon.find({_id: dataHW._id})
    res.send(nowData)
  }
    res.end()
  })

router.get("/adminMon", async function (req, res) {
  // find data in beaconData
  var beacons = await beacon.find({
    Timestamp: {
      $gte: new Date((Date.now() - (parseInt(1) * 60 * 60 * 1000)))
    }
  })
  var p_in = beacons.map(item => item['P-IN']).reduce((prev, next) => prev + next)
  var p_out = beacons.map(item => item['P-OUT']).reduce((prev, next) => prev + next);
  beacons = {
    p_in,
    p_out
  }
  // find lastest data
  var sensors = await sensor.findOne().sort({ field: 'asc', Timestamp: -1 }).limit(1)
  res.send({ beacons, sensors })
  res.end()
})

router.get("/getSanam", async function (req, res) {
  let hours = parseInt(req.query.hours)
  let nowHours = new Date().getTime() + (7 * 1000 * 60 * 60)

  let now = moment(nowHours).subtract({ 'minutes': 'm' }).format('hh');
  console.log(now, nowHours)
  let lessData = await beacon.findOne().sort({ field: 'desc', Timestamp: +1 }).limit(1)
  let oldData = moment(new Date(lessData.Timestamp).getTime()).subtract({ 'minutes': 'm' }).format('hh');
  console.log(oldData, new Date(lessData.Timestamp).getTime())

  if (now - oldData < hours && now - oldData !== 0) {
    res.status(500)
    res.send({
      msg: 'bad values >> not enough data'
    })
  } else {
    beacon.find({
      Timestamp: {
        $gte: new Date((Date.now() - (hours * 60 * 60 * 1000)))
      }
    }).sort('-Timestamp').exec(function (err, payload) {
      if (err) {
        res.status(401)
        res.send({
          msg: 'bad values >> not value: hours'
        })
      }
      // console.log(payload);
      let arrPayload = []
      for (var i = 0; i < hours; i++) {
        arrPayload[i] = 0
      }
      let checkTime = 0
      payload.map((value) => {
        if (value.Timestamp >= Date.now() - (parseInt(checkTime + 1) * 60 * 60 * 1000)) {
          if (value["P-IN"] > 0)
            arrPayload[checkTime]++
        } else {
          checkTime++
          if (value["P-IN"] > 0)
            arrPayload[checkTime]++
        }
      })
      testData = arrPayload.map((data) => (
        data.toString()
      ))
      dataSend = {}
      dataSend["number_of_tourist"] = testData
      res.send(dataSend)
      res.end()
    })
  }

})

router.get("/predict", async function (req, res) {
  res.send()
  res.end()
})

module.exports = router;
