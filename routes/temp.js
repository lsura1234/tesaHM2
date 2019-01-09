var express = require('express');
var router = express.Router();
var temp = require("../models/temp");

router.post("/receiveData", function (req, res) {
    var data = req.body
    var Temp = new temp(req.body);
    Temp.save(function(err) {
        if(err) {
          console.log(err);
          res.render("../views/employees/create");
        } else {
          console.log("Successfully created an tmep.");
          //res.redirect("/employees/show/"+employee._id);
        }
      });
    //console.log(data)
    res.send(data);
    
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
