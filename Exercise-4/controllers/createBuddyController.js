const fs = require('fs');

const createBuddyDetails = (req, res) => {
  var body = {
    employee_id: req.body.empId,
    real_name: req.body.realName,
    nick_name: req.body.nickName,
    dob: req.body.dob,
    hobbies: req.body.hobbies
  }
  const fileData = JSON.parse(fs.readFileSync('./cdw_ace23_buddies.json'));
  fileData.push(body);
  fs.writeFile('./cdw_ace23_buddies.json', JSON.stringify(fileData), function (err) {

    if (err) { throw err }
    res.send("Buddy Details successfully added..!!!")
  })

};

module.exports = {
  createBuddyDetails
};