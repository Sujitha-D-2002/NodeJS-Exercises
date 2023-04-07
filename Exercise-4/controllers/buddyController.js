const services = require('../services/buddyServices');

//Create Buddy Details
const createBuddyDetails = async(req, res) => {

  var body = {
    employee_id: req.body.empId,
    real_name: req.body.realName,
    nick_name: req.body.nickName,
    dob: req.body.dob,
    hobbies: req.body.hobbies
  }
  if (body.employee_id == "" || body.real_name == "" || body.nick_name == "" || body.dob == "" || body.hobbies == "") {
    res.send("All fields are required..!!")
  }
  else if ((/^[0-9]+$/).test(body.employee_id) == false) {
    res.send("ID should be in integer format..!!")
  }
  else if ((/^[A-Za-z]+$/).test(body.real_name) == false) {
    res.send("Real-Name should be in String format..!!")
  }
  else if ((/^[A-Za-z]+$/).test(body.nick_name) == false) {
    res.send("Nick-Name should be in String format..!!")
  }
  else if ((/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/).test(body.dob) == false) {
    res.send("Invalid date format..!!")
  }
  else {
    let response=await services.createBuddyList(req);
    res.send({message:response});
  }
}

//Display all Buddy Details
const displayAllBuddyDetails = async(req, res) => {
  let response=await services.displayAllBuddyServices(req);
    res.send({message:response});
}

//Display Specific Buddy Details
const displayBuddyDetails = async(req, res) => {
  if ((/^[0-9]+$/).test(req.params.id) == false) {
    res.send("ID should be in integer format..!!")
  }
  else {
    let response=await services.displayParticularBuddyServices(req);
    res.send({message:response});
  }
}

//Delete all Buddy Details
const deleteAllBuddyDetails = async(req, res) => {
  let response=await services.deleteAllBuddyService();
  res.send({message:response});
}

//Delete Particular Buddy Details
const deleteBuddyDetails = async(req, res) => {
  if ((/^[0-9]+$/).test(req.params.id) == false) {
    res.send("ID should be in integer format..!!")
  }
  else {
    let response=await services.deleteParticularBuddyService(req);
    res.send({message:response});
  }
}

//Update Buddy Details
const updateBuddyDetails = async(req, res) => {
  if ((/^[0-9]+$/).test(req.params.id) == false) {
      res.send("ID should be in integer format..!!")
  }
  else if ((/^[A-Za-z]+$/).test(req.body.realName) == false && (!req.body.realName==undefined)) {
      res.send("Real-Name should be in String format..!!")
  }
  else if ((/^[A-Za-z]+$/).test(req.body.nickName) == false && (!req.body.nickName==undefined)) {
      res.send("Nick-Name should be in String format..!!")
  }
  else if ((/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/).test(req.body.dob) == false && (!req.body.dob==undefined)) {
      console.log(req.body.dob);
      res.send("Invalid date format..!!")
  }
  else {
    let response=await services.updateBuddyService(req);
    res.send({message:response});
  }
}
module.exports = {
  createBuddyDetails, displayAllBuddyDetails, displayBuddyDetails, deleteAllBuddyDetails, deleteBuddyDetails, updateBuddyDetails
};