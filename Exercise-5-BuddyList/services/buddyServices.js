const { writeFileData, readFileData } = require('../utils/fileOperationUtils');
const httpResponse = require('../utils/httpResponsesUtil')
const { RESPONSE_MESSAGES } = require("../config/constants");


//Create Buddy Details
let createBuddyList = async (req) => {

  try {
    const fileData = JSON.parse(await readFileData('./cdw_ace23_buddies.json'));
    fileData.push(req.body);
    let status = await writeFileData('./cdw_ace23_buddies.json', fileData);
    if (status == "false") {
      return httpResponse.httpNotFoundResponse(RESPONSE_MESSAGES.NOT_FOUND_MSG);
    }
    else {
      return httpResponse.httpSuccessResponse(RESPONSE_MESSAGES.BUDDY_CREATED_MSG);
    }
  }
  catch (err) {
    return httpResponse.httpNotFoundResponse(RESPONSE_MESSAGES.NOT_FOUND_MSG);
  }

}

//Display All Buddy Details
const displayAllBuddyServices = async () => {
  try {
    const data = JSON.parse(await readFileData('./cdw_ace23_buddies.json'));
    if (data == "false") {
      return httpResponse.httpNotFoundResponse(RESPONSE_MESSAGES.NOT_FOUND_MSG);
    }
    else {
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

//Display Specific Buddy Details
const displayParticularBuddyServices = async (req) => {
  try {
    const fileData = JSON.parse(await readFileData('./cdw_ace23_buddies.json'));
    let data = fileData.find(temp => {
      return temp.empId === req.params.id;
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

//Update Buddy Details
let updateBuddyService = async (req) => {
  try {
    const fileData = JSON.parse(await readFileData('./cdw_ace23_buddies.json'));
    let index = fileData.findIndex(temp => {
      return temp.empId === req.params.id;
    });
    if (index == -1) {
      return httpResponse.httpNoDataFoundResponse();
    }
    else {
      fileData[index].nickName = req.body.nickName || fileData[index].nickName,
        fileData[index].hobbies = req.body.hobbies || fileData[index].hobbies,
        fileData[index].realName = req.body.realName || fileData[index].realName,
        fileData[index].dob = req.body.dob || fileData[index].dob
      let status = await writeFileData('./cdw_ace23_buddies.json', fileData);
      if (status == "false") {
        return httpResponse.httpNotFoundResponse(RESPONSE_MESSAGES.NOT_FOUND_MSG);
      }
      else {
        return httpResponse.httpSuccessResponse(RESPONSE_MESSAGES.BUDDY_UPDATED_MSG);
      }
    }
  }
  catch (err) {
    return httpResponse.httpNotFoundResponse(RESPONSE_MESSAGES.NOT_FOUND_MSG);
  }

}
//Delete All Buddy Details
let deleteAllBuddyService = async () => {
  try {
    const fileData = JSON.parse(await readFileData('./cdw_ace23_buddies.json'));
    if (fileData.length == 0) {
      return httpResponse.httpNoDataFoundResponse();
    }
    else {
      fileData.splice(0);
      let status = await writeFileData('./cdw_ace23_buddies.json', fileData);
      if (status == "false") {
        return httpResponse.httpNotFoundResponse(RESPONSE_MESSAGES.NOT_FOUND_MSG);
      }
      else {
        return httpResponse.httpSuccessResponse(RESPONSE_MESSAGES.BUDDY_DELETED_MSG);
      }
    }
  }
  catch (err) {
    return httpResponse.httpNotFoundResponse(RESPONSE_MESSAGES.NOT_FOUND_MSG);
  }
}

//Delete Specific Buddy Details
let deleteParticularBuddyService = async (req) => {
  try {
    const fileData = JSON.parse(await readFileData('./cdw_ace23_buddies.json'));
    let length = fileData.length;
    if (length == 0) {
      return httpResponse.httpNoDataFoundResponse();
    }
    else {
      data = fileData.filter(temp =>
        !(temp.empId === req.params.id)
      );
      if (length != data.length) {
        let status = await writeFileData('./cdw_ace23_buddies.json', data);
        if (status == "false") {
          return httpResponse.httpNotFoundResponse(RESPONSE_MESSAGES.NOT_FOUND_MSG);
        }
        else {
          return httpResponse.httpSuccessResponse(RESPONSE_MESSAGES.BUDDY_DELETED_MSG);
        }
      }
      else {
        return httpResponse.httpNoDataFoundResponse();
      }
    }
  }
  catch (err) {
    return httpResponse.httpNotFoundResponse(RESPONSE_MESSAGES.NOT_FOUND_MSG);
  }
}
module.exports = { createBuddyList, displayAllBuddyServices, displayParticularBuddyServices, updateBuddyService, deleteAllBuddyService, deleteParticularBuddyService }