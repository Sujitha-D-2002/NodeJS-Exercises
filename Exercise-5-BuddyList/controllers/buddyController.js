const services = require('../services/buddyServices');
const { readFileData } = require('../utils/buddyUtils');
const logger = require('../utils/logger');

//create buddy details
const createBuddyDetails = async (req, res) => {

  var body = {
    employee_id: req.body.empId,
    real_name: req.body.realName,
    nick_name: req.body.nickName,
    dob: req.body.dob,
    hobbies: req.body.hobbies
  }
  const fileData = JSON.parse(await readFileData('./cdw_ace23_buddies.json'));
  let index = fileData.findIndex(temp => {
    return temp.empId === req.body.empId;
  });

  if (index >= 0) {
    res.send("Id already exists..!!!")
  }
  else if (body.employee_id == "" || body.real_name == "" || body.nick_name == "" || body.dob == "" || body.hobbies == "") {
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
    let response = await services.createBuddyList(req);
    if (response.status > 400) {
      logger.error(`${response.status} - ${response.message} - ${req.originalUrl} - ${req.ip}`);
      res.status(response.status).send({ message: response.message });
    }
    else if (response.status == 204) {
      logger.warn(`${response.status} - ${response.message} - ${req.originalUrl} - ${req.ip}`);
      res.status(response.status).send({ message: response.message });
    }
    else {
      res.status(response.status).send({ message: response.message });
    }

  }
}

//Display all Buddy Details
const displayAllBuddyDetails = async (req, res) => {
  let response = await services.displayAllBuddyServices();
  if (response.status > 400) {
    logger.error(`${response.status} - ${response.message} - ${req.originalUrl} - ${req.ip}`);
    res.status(response.status).send({ message: response.message });
  }
  else if (response.status == 204) {
    logger.warn(`${response.status} - ${response.message} - ${req.originalUrl} - ${req.ip}`);
    res.status(response.status).send({ message: response.message });
  }
  else {
    res.status(response.status).send({ message: response.message });
  }
}

//Display Specific Buddy Details
const displayBuddyDetails = async (req, res) => {
  if ((/^[0-9]+$/).test(req.params.id) == false) {
    res.send("ID should be in integer format..!!")
  }
  else {
    let response = await services.displayParticularBuddyServices(req);
    if (response.status > 400) {
      logger.error(`${response.status} - ${response.message} - ${req.originalUrl} - ${req.ip}`);
      res.status(response.status).send({ message: response.message });
    }
    else if (response.status == 204) {
      logger.warn(`${response.status} - ${response.message} - ${req.originalUrl} - ${req.ip}`);
      res.status(response.status).send({ message: response.message });
    }
    else {
      res.status(response.status).send({ message: response.message });
    }
  }
}

//Delete all Buddy Details
const deleteAllBuddyDetails = async (req, res) => {
  let response = await services.deleteAllBuddyDetails();
  if (response.status > 400) {
    logger.error(`${response.status} - ${response.message} - ${req.originalUrl} - ${req.ip}`);
    res.status(response.status).send({ message: response.message });
  }
  else if (response.status == 204) {
    logger.warn(`${response.status} - ${response.message} - ${req.originalUrl} - ${req.ip}`);
    res.status(response.status).send({ message: response.message });
  }
  else {
    res.status(response.status).send({ message: response.message });
  }
}

//Delete Particular Buddy Details
const deleteBuddyDetails = async (req, res) => {
  if ((/^[0-9]+$/).test(req.params.id) == false) {
    res.send("ID should be in integer format..!!")
  }
  else {
    let response = await services.deleteParticularBuddyService(req);
    if (response.status > 400) {
      logger.error(`${response.status} - ${response.message} - ${req.originalUrl} - ${req.ip}`);
      res.status(response.status).send({ message: response.message });
    }
    else if (response.status == 204) {
      logger.warn(`${response.status} - ${response.message} - ${req.originalUrl} - ${req.ip}`);
      res.status(response.status).send({ message: response.message });
    }
    else {
      res.status(response.status).send({ message: response.message });
    }
  }
}

//Update Buddy Details
const updateBuddyDetails = async (req, res) => {
  if ((/^[0-9]+$/).test(req.params.id) == false) {
    res.send("ID should be in integer format..!!")
  }
  else if ((/^[A-Za-z]+$/).test(req.body.realName) == false && (!req.body.realName == undefined)) {
    res.send("Real-Name should be in String format..!!")
  }
  else if ((/^[A-Za-z]+$/).test(req.body.nickName) == false && (!req.body.nickName == undefined)) {
    res.send("Nick-Name should be in String format..!!")
  }
  else if ((/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/).test(req.body.dob) == false && (!req.body.dob == undefined)) {
    console.log(req.body.dob);
    res.send("Invalid date format..!!")
  }
  else {
    let response = await services.updateBuddyService(req);
    if (response.status > 400) {
      logger.error(`${response.status} - ${response.message} - ${req.originalUrl} - ${req.ip}`);
      res.status(response.status).send({ message: response.message });
    }
    else if (response.status == 204) {
      logger.warn(`${response.status} - ${response.message} - ${req.originalUrl} - ${req.ip}`);
      res.status(response.status).send({ message: response.message });
    }
    else {
      res.status(response.status).send({ message: response.message });
    }
  }
}
module.exports = {
  createBuddyDetails, displayAllBuddyDetails, displayBuddyDetails, deleteAllBuddyDetails, deleteBuddyDetails, updateBuddyDetails
};