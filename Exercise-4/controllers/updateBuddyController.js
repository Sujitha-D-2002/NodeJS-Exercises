const fs = require('fs');

const updateBuddyDetails = (req, res) => {
    const fileData = JSON.parse(fs.readFileSync('./cdw_ace23_buddies.json'));
    for (let temp in fileData) {
        let nickName = fileData[temp].nick_name;
        let hobbies = fileData[temp].hobbies;
        if (fileData[temp].employee_id == req.params.id) {
            fileData[temp].nick_name = req.body.nickName || nickName,
                fileData[temp].hobbies = req.body.hobbies || hobbies
        }
        fs.writeFile(filePath, JSON.stringify(fileData, null, 2), (err) => {
            if (err)
                console.log(err);
            else {
                res.send("Employee updated successfully\n");
            }
        });
    }

}
module.exports = {
    updateBuddyDetails
}