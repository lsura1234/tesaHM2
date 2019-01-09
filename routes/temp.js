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
