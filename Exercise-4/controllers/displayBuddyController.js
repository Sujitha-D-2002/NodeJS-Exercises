const fs = require('fs');

const displayAllBuddyDetails = (req, res) => {
  fs.readFile('./cdw_ace23_buddies.json', 'utf-8', (err, data) => {
    if (err) { throw err }
    console.log(data)
    res.send(data);
  })
}

const displayBuddyDetails = (req, res) => {
  const fileData = JSON.parse(fs.readFileSync('./cdw_ace23_buddies.json'));
  for (let temp in fileData) {
    console.log(req.params.id)
    console.log(fileData[temp])
    if (fileData[temp].employee_id == req.params.id) {
      res.send(fileData[temp]);
    }
  }

}
module.exports = {
  displayAllBuddyDetails, displayBuddyDetails
}