var express = require('express');
var router = express.Router();
var temp = require("../models/temp");

router.post("/receiveData", function (req, res) {

})

router.get("/showData", function (res, req) {
  var data = temp.find()
  console.log(data)
})
router.post("/addData", function (req, res) {

})
router.put("/editData/:teamID", function (req, res) {
    var id = parseInt(req.params.teamID)
    console.log(id);

})
router.put("/deleteData/:teamID", function (req, res) {
    var id = parseInt(req.params.teamID)
})

module.exports = router;
