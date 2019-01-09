var express = require('express');
var router = express.Router();
var temp = require("../models/temp");

router.post("/receiveData", function (req, res) {

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
router.put("/editData/:teamID", function (req, res) {
    var id = parseInt(req.params.teamID)
    console.log(id);

})
router.put("/deleteData/:teamID", function (req, res) {
    var id = parseInt(req.params.teamID)
})

module.exports = router;
