const { writeFileData, readFileData } = require('../utils/buddyUtils');

//Create Buddy Details
let createBuddyList = async (req) => {

  try {
    const fileData = JSON.parse(await readFileData('./cdw_ace23_buddies.json'));
    let res;
    fileData.push(req.body);
    let status = await writeFileData('./cdw_ace23_buddies.json', fileData);
    if (status == "false") {
      res = { status: 404, message: "File Not Found to create new buddy list" }
      return res;
    }
    else {
      res = { status: 201, message: "Buddy Details successfully added..!!!" }
      return res;
    }
  }
  catch (err) {
    res = { status: 404, message: "Buddy list not found..!!!"+err }
    return res;
  }

}

//Display All Buddy Details
const displayAllBuddyServices = async () => {
  try {
    let res;
    const data = JSON.parse(await readFileData('./cdw_ace23_buddies.json'));
    if (data == "false") {
      res = { status: 500, message: "File Not Found. Cannot display the buddy list..!!" }
      return res;
    }
    else {
      if (data.length == 0) {
        res = { status: 204, message: "No records found in cdw buddy list json file" }
        return res;
      }
      else {
        res = { status: 200, message: data }
        return res;
      }
    }
  }
  catch (err) {
    res = { status: 404, message: "Buddy list not found..!!!"+err }
    return res;
  }

}

//Display Specific Buddy Details
const displayParticularBuddyServices = async (req) => {
  try {
    let res;
    const fileData = JSON.parse(await readFileData('./cdw_ace23_buddies.json'));
    let data = fileData.find(temp => {
      return temp.empId === req.params.id;
    });
    if (data == undefined) {
      res = { status: 204, message: "Record of buddy list not found" }
      return res;
    }
    else {
      res = { status: 200, message: data }
      return res;
    }
  }
  catch (err) {
    res = { status: 404, message: "Buddy list not found..!!! "+err }
    return res;
  }
}

//Update Buddy Details
let updateBuddyService = async (req) => {
  try {
    let res;
    const fileData = JSON.parse(await readFileData('./cdw_ace23_buddies.json'));
    let index = fileData.findIndex(temp => {
      return temp.empId === req.params.id;
    });
    if (index == -1) {
      res = { status: 204, message: "Record of buddy list not found" }
      return res;
    }
    else {
      fileData[index].nickName = req.body.nickName || fileData[index].nickName,
        fileData[index].hobbies = req.body.hobbies || fileData[index].hobbies,
        fileData[index].realName = req.body.realName || fileData[index].realName,
        fileData[index].dob = req.body.dob || fileData[index].dob
      let status = await writeFileData('./cdw_ace23_buddies.json', fileData);
      if (status == "false") {
        res = { status: 404, message: "File Not Found. Cannot update the buddy list..!!" }
        return res;
      }
      else {
        res = { status: 200, message: "Employee updated successfully" }
        return res;
      }
    }
  }
  catch (err) {
    res = { status: 404, message: "Buddy list not found..!!!"+err }
    return res;
  }

}
//Delete All Buddy Details
let deleteAllBuddyService = async () => {
  try {
    let res;
    const fileData = JSON.parse(await readFileData('./cdw_ace23_buddies.json'));
    if (fileData.length == 0) {
      res = { status: 404, message: "No records found in cdw buddy list json file to delete" }
      return res;
    }
    else {
      fileData.splice(0);
      let status = await writeFileData('./cdw_ace23_buddies.json', fileData);
      if (status == "false") {
        res = { status: 404, message: "File Not Found to delete buddy list" }
        return res;
      }
      else {
        res = { status: 200, message: "Employee deleted successfully" }
        return res;
      }
    }
  }
  catch (err) {
    res = { status: 404, message: "Buddy list not found..!!!"+err}
    return res;
  }
}

//Delete Specific Buddy Details
let deleteParticularBuddyService = async (req) => {
  try {
    const fileData = JSON.parse(await readFileData('./cdw_ace23_buddies.json'));
    let length = fileData.length;
    if (length == 0) {
      res = { status: 204, message: "No records found in cdw buddy list json file to delete" }
      return res;
    }
    else {
      data = fileData.filter(temp =>
        !(temp.empId === req.params.id)
      );
      console.log(data)
      if (length != data.length) {
        let status = await writeFileData('./cdw_ace23_buddies.json', data);
        if (status == "false") {
          res = { status: 404, message: "File Not Found to delete buddy list" }
          return res;
        }
        else {
          res = { status: 200, message: "Employee deleted successfully" }
          return res;
        }
      }
      else {
        res = { status: 204, message: "Buddy record not found" }
        return res;
      }
    }
  }
  catch (err) {
    res = { status: 404, message: "Buddy list not found..!!!"+err }
    return res;
  }
}
module.exports = { createBuddyList, displayAllBuddyServices, displayParticularBuddyServices, updateBuddyService, deleteAllBuddyService, deleteParticularBuddyService }