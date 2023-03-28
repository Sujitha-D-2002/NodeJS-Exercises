const fs = require('fs');

const deleteAllBuddyDetails = (req, res) => {
    fs.unlink('./cdw_ace23_buddies.json', (err) => {
        if (err) { throw err }
        res.status(200).json({
            message: "Deleted Successfully"
        })
    })
}

const deleteBuddyDetails = (req, res) => {
    const fileData = JSON.parse(fs.readFileSync('./cdw_ace23_buddies.json'));
    const id = req.params.id;
    let requiredIndex = -1;
    const removeById = (fileData, id) => {
        requiredIndex = fileData.findIndex(temp => {
            return temp.employee_id === id;
        });
        if (requiredIndex === -1) {
            return false;
        };
        return !!fileData.splice(requiredIndex, 1);
    };
    removeById(fileData, id);
    fs.writeFile(filePath, JSON.stringify(fileData, null, 2), (err) => {
        if (err)
            console.log(err);
        else {
            res.send("Employee deleted successfully\n");
        }
    });
    //  res.send(fileData);
}

module.exports = {
    deleteAllBuddyDetails, deleteBuddyDetails
}