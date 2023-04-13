const fs = require('fs');
/*
* In readFileData function => @params file path
* Reads file data and return the value 
*/
const readFileData = function async(filePath) {
    return new Promise((resolve, reject) => {

        fs.readFile(filePath, 'utf-8', function (err, data) {
            if (err) {
                reject("false");
            }
            else {
                resolve(data);
            }
        });

    })
}

/*
* In writeFileData function => @params file path, data
* Write file data in the given file path
*/
let writeFileData = function async(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data), function (err) {
            if (err) {
                reject("false");
            }
            else {
                resolve("true");
            }
        });
    })
}
module.exports = { writeFileData, readFileData };