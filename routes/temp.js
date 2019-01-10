var express = require('express');
var router = express.Router();
var temp = require("../models/temp");

router.post("/receiveData", async function (req, res) {
  var data = req.body
  var id = data.DevEUI_uplink.payload_parsed.frames[0].value
  var temp = data.DevEUI_uplink.payload_parsed.frames[1].value
  var dataHW = await temp.create({teamID: id, temp})
  res.send(dataHW);
  res.end()
})

router.get("/showData", async function (req, res) {
  var data = await temp.find({})
  res.send(data)
  res.end()
})
router.post("/addData", async function (req, res) {
  var newData = req.body
  var data = await temp.create(newData)
  res.send(data)
  res.end()
})
router.put("/editData/:teamID", async function (req, res) {
    var id = req.params.teamID
    var newTemp = req.body
    var data = await temp.updateOne({teamID: id}, {temp: newTemp.temp})
    if(data.n === 0){
      res.send("Don't have this ID")
    } else {
      res.send("Edited Success")
    }
    res.end()
})
router.delete("/deleteData/:teamID", async function (req, res) {
    var id = req.params.teamID
    var data = await temp.deleteOne({teamID: id})
    if(data.n === 0){
      res.send("Don't have this ID")
    } else {
      res.send("Deleted Successful")
    }
    res.end()
})

module.exports = router;
