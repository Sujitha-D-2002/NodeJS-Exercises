const { writeFileData, readFileData } = require('../utils/fileOperationUtils');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const httpResponse=require('../utils/httpResponsesUtil');
const { RESPONSE_MESSAGES, RETURNED_VALUES } = require("../config/constants");

//Create User Details
let registerUserServices = async (req) => {

  try {
    const fileData = JSON.parse(await readFileData('./user-details.json'));
    let res;
    const salt = genSaltSync(10);
    req.body.password = hashSync(req.body.password, salt);
    fileData.push(req.body);
    let fileStatus = await writeFileData('./user-details.json', fileData);
    if (fileStatus == "false") {
      res = { status: 404, message: "File Not Found to create new User list" }
      return res;
    }
    else {
      res = { status: 200, message: "User Details successfully added..!!!" }
      return res;
    }
  }
  catch (err) {
    res = { status: 404, message: "User list not found..!!!" + err }
    return res;
  }

}

const loginUserServices = async (req) => {
  try {
    let res;
    const fileData = JSON.parse(await readFileData('./user-details.json'));
    let data = fileData.find(temp => {
      return temp.username === req.body.username &&  compareSync(req.body.password, temp.password);
    });
    if (data == undefined) {
      res = { status: 500, message: "Invalid username or password" }
      return res;
    }
    else {
      //const jsontoken = jwt.sign({username:req.body.username}, 'Sirius1234', {expiresIn : '1h'});
      const jsontoken = sign({ result: req.body }, process.env.JWT_KEY, {
        expiresIn: "1h"
    });
      res = { status: 200, message: "Logged In Successfully...!!!", token: jsontoken }
      return res;
    }
  }
  catch (err) {
    res = { status: 404, message: "Buddy list not found..!!! " + err }
    return res;
  }
}
module.exports={registerUserServices,loginUserServices}