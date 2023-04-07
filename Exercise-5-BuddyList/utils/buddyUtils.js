const fs = require('fs');
const logger = require('../utils/logger');
//Read file
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
//Write File
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