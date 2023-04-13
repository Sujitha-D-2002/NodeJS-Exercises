const { writeFileData, readFileData } = require('../utils/fileOperationUtils');
const jwt = require("jsonwebtoken");
const url = require('url');
const querystring = require('querystring');
require('dotenv').config()

const httpResponse = require('../utils/httpResponsesUtil')
const { RESPONSE_MESSAGES } = require("../config/constants");

//Create Task Services
const createTaskServices = async (req) => {
  try {
    const fileData = JSON.parse(await readFileData('./task-management.json'));
    var authorization = req.headers.authorization.split(' ')[1],
      decoded;
    decoded = jwt.verify(authorization, process.env.JWT_KEY);
    req.body.username = decoded.result.username;
    fileData.push(req.body);
    let fileStatus = await writeFileData('./task-management.json', fileData);
    if (fileStatus == "false") {
      return httpResponse.httpNotFoundResponse(RESPONSE_MESSAGES.NOT_FOUND_MSG);
    }
    else {
      return httpResponse.httpSuccessResponse(RESPONSE_MESSAGES.TASK_CREATED_MSG);
    }
  }
  catch (err) {
    return httpResponse.httpNotFoundResponse(RESPONSE_MESSAGES.NOT_FOUND_MSG);
  }

}

//Display All Task Details
const displayAllTaskServices = async (req) => {
  try {
    var authorization = req.headers.authorization.split(' ')[1],
      decoded;
    decoded = jwt.verify(authorization, process.env.JWT_KEY);
    let data = JSON.parse(await readFileData('./task-management.json'));
    if (data == "false") {
      return httpResponse.httpNotFoundResponse(RESPONSE_MESSAGES.NOT_FOUND_MSG);
    }
    else {
      data = data.filter(temp => {
        return temp.username === decoded.result.username;
      });
      if (data.length == 0) {
        return httpResponse.httpNoDataFoundResponse();
      }
      else {
        return httpResponse.httpSuccessResponse(RESPONSE_MESSAGES.SUCCESS_MSG, data);
      }
    }
  }
  catch (err) {
    return httpResponse.httpNotFoundResponse(RESPONSE_MESSAGES.NOT_FOUND_MSG);
  }

}

//Display Specific task Details
const displayParticularTaskServices = async (req) => {
  try {
    var authorization = req.headers.authorization.split(' ')[1],
      decoded;
    decoded = jwt.verify(authorization, process.env.JWT_KEY);
    const fileData = JSON.parse(await readFileData('./task-management.json'));
    let data = fileData.find(temp => {
      return temp.taskid === req.params.id && temp.username === decoded.result.username;
    });
    if (data == undefined) {
      return httpResponse.httpNoDataFoundResponse();
    }
    else {
      return httpResponse.httpSuccessResponse(RESPONSE_MESSAGES.SUCCESS_MSG, data);
    }
  }
  catch (err) {
    return httpResponse.httpNotFoundResponse(RESPONSE_MESSAGES.NOT_FOUND_MSG);
  }
}

//Update Task Service
let updateTaskService = async (req) => {
  try {
    var authorization = req.headers.authorization.split(' ')[1],
      decoded;
    decoded = jwt.verify(authorization, process.env.JWT_KEY);
    const fileData = JSON.parse(await readFileData('./task-management.json'));
    let index = fileData.findIndex(temp => {
      return temp.taskid === req.params.id && temp.username === decoded.result.username;
    });
    if (index == -1) {
      return httpResponse.httpNoDataFoundResponse();
    }
    else {
      fileData[index].title = req.body.title || fileData[index].title,
        fileData[index].description = req.body.description || fileData[index].description,
        fileData[index].priority = req.body.priority || fileData[index].priority,
        fileData[index].date = req.body.date || fileData[index].date,
        fileData[index].comments = (fileData[index].comments).push(req.body.comments) || fileData[index].comments
      let status = await writeFileData('./task-management.json', fileData);
      if (status == "false") {
        return httpResponse.httpNotFoundResponse(RESPONSE_MESSAGES.NOT_FOUND_MSG);
      }
      else {
        return httpResponse.httpSuccessResponse(RESPONSE_MESSAGES.TASK_UPDATED_MSG);
      }
    }
  }
  catch (err) {
    return httpResponse.httpNotFoundResponse(RESPONSE_MESSAGES.NOT_FOUND_MSG);
  }

}

//Delete Specific task Details
let deleteParticularTaskService = async (req) => {
  try {
    let fileData = JSON.parse(await readFileData('./task-management.json'));
    let length = fileData.length;
    if (length == 0) {
      return httpResponse.httpNoDataFoundResponse();
    }
    else {
      var authorization = req.headers.authorization.split(' ')[1],
        decoded;
      decoded = jwt.verify(authorization, process.env.JWT_KEY);
      let data = fileData.findIndex(temp => {
        return temp.taskid === req.params.id && temp.username === decoded.result.username;
      });
      fileData.splice(data, 1);
      if (data >= 0) {
        let status = await writeFileData('./task-management.json', fileData);
        if (status == "false") {
          return httpResponse.httpNotFoundResponse(RESPONSE_MESSAGES.NOT_FOUND_MSG);
        }
        else {
          return httpResponse.httpSuccessResponse(RESPONSE_MESSAGES.TASK_DELETED_MSG);
        }
      }
      else {
        return httpResponse.httpNotFoundResponse(RESPONSE_MESSAGES.NOT_FOUND_MSG);
      }
    }
  }
  catch (err) {
    return httpResponse.httpNotFoundResponse(RESPONSE_MESSAGES.NOT_FOUND_MSG);
  }
}

//Sort Task Details
let sortTaskDetails = async (req) => {
  try {
    let fileData = JSON.parse(await readFileData('./task-management.json'));
    var authorization = req.headers.authorization.split(' ')[1],
      decoded;
    decoded = jwt.verify(authorization, process.env.JWT_KEY);
    function sortByProperty(field) {
      return function (a, b) {
        if (a[field] > b[field])
          return 1;
        else if (a[field] < b[field])
          return -1;

        return 0;
      }
    }
    fileData = fileData.filter(temp => {
      return temp.username === decoded.result.username;
    });
    fileData.sort(sortByProperty(req.params.field));
    return httpResponse.httpSuccessResponse(RESPONSE_MESSAGES.TASK_FOUND_MSG, fileData);
  }
  catch (err) {
    return httpResponse.httpNotFoundResponse(RESPONSE_MESSAGES.NOT_FOUND_MSG);
  }
}

//Filter Task Details
let filterTaskDetails = async (req) => {
  try {
    let fileData = JSON.parse(await readFileData('./task-management.json'));
    var authorization = req.headers.authorization.split(' ')[1],
      decoded;
    decoded = jwt.verify(authorization, process.env.JWT_KEY);
    let parsedUrl = url.parse(req.originalUrl);
    let paramsVal = querystring.parse(parsedUrl.query);

    console.log(paramsVal);
    fileData = fileData.filter(temp => {
      return temp.username === decoded.result.username && temp.title== paramsVal.title;
    });
    return httpResponse.httpSuccessResponse(RESPONSE_MESSAGES.TASK_FOUND_MSG, fileData);
  }
  catch (err) {
    return httpResponse.httpNotFoundResponse(RESPONSE_MESSAGES.NOT_FOUND_MSG);
  }
}

//Pagination
let paginationTask = async (req) => {
  try {
    var authorization = req.headers.authorization.split(' ')[1],
      decoded;
    decoded = jwt.verify(authorization, process.env.JWT_KEY);
    let data = JSON.parse(await readFileData('./task-management.json'));
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    if (data == "false") {
      return httpResponse.httpNotFoundResponse(RESPONSE_MESSAGES.NOT_FOUND_MSG);
    }
    else {
      data = data.filter(temp => {
        return temp.username === decoded.result.username;
      });
      const records = data.slice(skip, skip + limit);
      if (records.length == 0) {
        return httpResponse.httpNoDataFoundResponse();
      }
      else if (records.length < limit) {
        return httpResponse.httpNotFoundResponse(RESPONSE_MESSAGES.DATA_INSUFFICIENT);
      }
      else {
        // res = {
        //   page: page,
        //   limit: limit,
        // }
        return httpResponse.httpSuccessResponse(RESPONSE_MESSAGES.TASK_FOUND_MSG, records);
      }
    }
  }
  catch {
    return httpResponse.httpNotFoundResponse(RESPONSE_MESSAGES.NOT_FOUND_MSG);
  }
}
module.exports = { createTaskServices, displayAllTaskServices, deleteParticularTaskService, displayParticularTaskServices, updateTaskService, sortTaskDetails, filterTaskDetails, paginationTask }