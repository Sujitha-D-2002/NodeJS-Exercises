const { writeFileData, readFileData } = require('../utils/buddyUtils');

//Create Buddy Details
let createBuddyList = async (req) => {
    const fileData = JSON.parse(await readFileData('./cdw_ace23_buddies.json'));
    let index = fileData.find(temp => {
        return temp.empId === req.body.empId;
    });

    if (index==undefined) {
        fileData.push(req.body);
        let status = await writeFileData('./cdw_ace23_buddies.json', fileData);
        if (status == "false") {
            return "File Not Found to create new buddy list";
        }
        else {
            return "Buddy Details successfully added..!!!";
        }
    }
    else {
        return "Buddy List already exist..!!!";
    }

}

//Display All Buddy Details
const displayAllBuddyServices = async () => {
    const data = JSON.parse(await readFileData('./cdw_ace23_buddies.json'));
    if (data == "false") {
        return "File Not Found. Cannot display the buddy list..!!";
    }
    else {
        if (data.length == 0) {
            return "No records found in cdw buddy list json file";
        }
        else {
            return data;
        }
    }

}

//Display Specific Buddy Details
const displayParticularBuddyServices = async (req) => {
    const fileData = JSON.parse(await readFileData('./cdw_ace23_buddies.json'));
    let index = fileData.find(temp => {
        return temp.empId === req.params.id;
    });
    console.log(index);
    if (index==undefined) {
        return "Record of buddy list not found"
    }
    else{
        return index;
    }
}

//Update Buddy Details
let flag = false;
let updateBuddyService = async (req) => {
    const fileData = JSON.parse(await readFileData('./cdw_ace23_buddies.json'));
    let index = fileData.findIndex(temp => {
        return temp.empId === req.params.id;
    });
    if (index==-1) {
        return "Record of buddy list not found"
    }
    else {
        fileData[index].nickName = req.body.nickName || fileData[index].nickName,
                fileData[index].hobbies = req.body.hobbies || fileData[index].hobbies,
                fileData[index].realName = req.body.realName || fileData[index].realName,
                fileData[index].dob = req.body.dob || fileData[index].dob
        let status = await writeFileData('./cdw_ace23_buddies.json', fileData);
        if (status == "false") {
            return "File Not Found. Cannot update the buddy list..!!";
        }
        else {
            return "Employee updated successfully\n";
        }
    }


}
//Delete All Buddy Details
let deleteAllBuddyService = async () => {
    const fileData = JSON.parse(await readFileData('./cdw_ace23_buddies.json'));
    if (fileData.length == 0) {
        return "No records found in cdw buddy list json file to delete";
    }
    else {
        fileData.splice(0);
        let status = await writeFileData('./cdw_ace23_buddies.json', fileData);
        if (status == "false") {
            return "File Not Found to delete buddy list";
        }
        else {
            return "Employee deleted successfully\n";
        }
    }
}

//Delete Specific Buddy Details
let deleteParticularBuddyService = async (req) => {

    const fileData = JSON.parse(await readFileData('./cdw_ace23_buddies.json'));
    let length=fileData.length;
    if (length == 0) {
        return "No records found in cdw buddy list json file to delete";
    }
    else {
        data=fileData.filter(temp => 
         !(temp.empId === req.params.id)
        );
        console.log(data)
        if(length!=data.length) {
            let status = await writeFileData('./cdw_ace23_buddies.json', data);
            if (status == "false") {
                return "File Not Found to delete buddy list";
            }
            else {
                return "Employee deleted successfully\n";
            }
        }
        else{
            return "Record of buddy list not found";
        }
    }
}
module.exports = { createBuddyList, displayAllBuddyServices, displayParticularBuddyServices, updateBuddyService, deleteAllBuddyService, deleteParticularBuddyService }