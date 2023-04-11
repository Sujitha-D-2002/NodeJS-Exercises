const services = require('../services/buddyServices');
const { readFileData } = require('../utils/fileOperationUtils');
const logger = require('../utils/logger');

//create buddy details
const createBuddyDetails = async (req, res) => {
  logger.info(` ${req.originalUrl} - ${req.ip}`);
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
    res.json("Id already exists..!!!")
  }
  else if (body.employee_id == "" || body.real_name == "" || body.nick_name == "" || body.dob == "" || body.hobbies == "") {
    res.json("All fields are required..!!")
  }
  else if ((/^[0-9]+$/).test(body.employee_id) == false) {
    res.json("ID should be in integer format..!!")
  }
  else if ((/^[A-Za-z]+$/).test(body.real_name) == false) {
    res.json("Real-Name should be in String format..!!")
  }
  else if ((/^[A-Za-z]+$/).test(body.nick_name) == false) {
    res.json("Nick-Name should be in String format..!!")
  }
  else if ((/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/).test(body.dob) == false) {
    res.json("Invalid date format..!!")
  }
  else {
    let response = await services.createBuddyList(req);
    if (response.status > 400) {
      logger.error(`${response.status} - ${response.message} - ${req.originalUrl} - ${req.ip}`);
      res.json(response);
    }
    else if (response.status == 201) {
      logger.warn(`${response.status} - ${response.message} - ${req.originalUrl} - ${req.ip}`);
      res.json(response);
    }
    else {
      res.json(response);
    }

  }
}

//Display all Buddy Details
const displayAllBuddyDetails = async (req, res) => {
  logger.info(` ${req.originalUrl} - ${req.ip}`);
  let response = await services.displayAllBuddyServices();
  if (response.status > 400) {
    logger.error(`${response.status} - ${response.message} - ${req.originalUrl} - ${req.ip}`);
    res.json(response);
  }
  else if (response.status == 201) {
    logger.warn(`${response.status} - ${response.message} - ${req.originalUrl} - ${req.ip}`);
    res.json(response);
  }
  else {
    res.json(response);
  }
}

//Display Specific Buddy Details
const displayBuddyDetails = async (req, res) => {
  logger.info(` ${req.originalUrl} - ${req.ip}`);
  if ((/^[0-9]+$/).test(req.params.id) == false) {
    res.json("ID should be in integer format..!!")
  }
  else {
    let response = await services.displayParticularBuddyServices(req);
    if (response.status > 400) {
      logger.error(`${response.status} - ${response.message} - ${req.originalUrl} - ${req.ip}`);
      res.json(response);
    }
    else if (response.status == 201) {
      logger.warn(`${response.status} - ${response.message} - ${req.originalUrl} - ${req.ip}`);
      res.json(response);
    }
    else {
      res.json(response);
    }
  }
}

//Delete all Buddy Details
const deleteAllBuddyDetails = async (req, res) => {
  logger.info(` ${req.originalUrl} - ${req.ip}`);
  let response = await services.deleteAllBuddyDetails();
  if (response.status > 400) {
    logger.error(`${response.status} - ${response.message} - ${req.originalUrl} - ${req.ip}`);
    res.json(response);
  }
  else if (response.status == 201) {
    logger.warn(`${response.status} - ${response.message} - ${req.originalUrl} - ${req.ip}`);
    res.json(response);
  }
  else {
    res.json(response);
  }
}

//Delete Particular Buddy Details
const deleteBuddyDetails = async (req, res) => {
  logger.info(` ${req.originalUrl} - ${req.ip}`);
  if ((/^[0-9]+$/).test(req.params.id) == false) {
    res.json("ID should be in integer format..!!")
  }
  else {
    let response = await services.deleteParticularBuddyService(req);
    if (response.status > 400) {
      logger.error(`${response.status} - ${response.message} - ${req.originalUrl} - ${req.ip}`);
      res.json(response);
    }
    else if (response.status == 201) {
      logger.warn(`${response.status} - ${response.message} - ${req.originalUrl} - ${req.ip}`);
      res.json(response);
    }
    else {
      res.json(response);
    }
  }
}

//Update Buddy Details
const updateBuddyDetails = async (req, res) => {
  logger.info(` ${req.originalUrl} - ${req.ip}`);
  if ((/^[0-9]+$/).test(req.params.id) == false) {
    res.json("ID should be in integer format..!!")
  }
  else if ((/^[A-Za-z]+$/).test(req.body.realName) == false && (!req.body.realName == undefined)) {
    res.json("Real-Name should be in String format..!!")
  }
  else if ((/^[A-Za-z]+$/).test(req.body.nickName) == false && (!req.body.nickName == undefined)) {
    res.json("Nick-Name should be in String format..!!")
  }
  else if ((/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/).test(req.body.dob) == false && (!req.body.dob == undefined)) {
    res.json("Invalid date format..!!")
  }
  else {
    let response = await services.updateBuddyService(req);
    if (response.status > 400) {
      logger.error(`${response.status} - ${response.message} - ${req.originalUrl} - ${req.ip}`);
      res.json(response);
    }
    else if (response.status == 201) {
      logger.warn(`${response.status} - ${response.message} - ${req.originalUrl} - ${req.ip}`);
      res.json(response);
    }
    else {
      res.json(response);
    }
  }
}
module.exports = {
  createBuddyDetails, displayAllBuddyDetails, displayBuddyDetails, deleteAllBuddyDetails, deleteBuddyDetails, updateBuddyDetails
};