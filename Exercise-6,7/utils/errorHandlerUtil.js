const logger = require('../config/loggerConfig');
let userregExPattern = [
    {
        regex: /^[a-zA-Z]{1,30}$/,
        name: "User Name",
        id: "username",
    },
    {
        regex: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/,
        name: "Password",
        id: "password",
    },
];

let taskregExPattern = [
    {
        regex: /^[a-zA-Z]{1,50}$/,
        name: "Title",
        id: "title",
    },
    {
        regex: /^[a-zA-Z]{1,150}$/,
        name: "Description",
        id: "description",
    },
    {
        regex: /^[a-zA-Z]{1,30}$/,
        name: "Priority",
        id: "priority",
    },
    {
        regex: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
        name: "Due Date",
        id: "date",
    },
];
let flag = true;
let errorHandler = (data) => {
    for (temp in userregExPattern) {
        if (data[temp] == "") {
            flag = false;
            return userregExPattern[temp].name + " is Required";
        }
        else if (((userregExPattern[temp].regex).test(data[temp]) == false)) {
            flag = false;
            return userregExPattern[temp].name + " is invalid";
        }
        else {
            flag = true;
        }
    }
    return flag;
}
let taskerrorHandler = (data) => {
    for (temp in taskregExPattern) {
        if (data[temp] == "") {
            flag = false;
            return taskregExPattern[temp].name + " is Required";
        }
        else if (((taskregExPattern[temp].regex).test(data[temp]) == false)) {
            flag = false;
            return taskregExPattern[temp].name + " is invalid";
        }
        else {
            flag = true;
        }
    }
    return flag;
}

let loggererrorHandler = (req,response) => {
    if (response.status > 400) {
        logger.error(`${response.status} - ${response.message} - ${req.originalUrl} - ${req.ip}`);
      }
      else if (response.status == 201) {
        logger.warn(`${response.status} - ${response.message} - ${req.originalUrl} - ${req.ip}`);
      }
}
module.exports = { errorHandler,taskerrorHandler,loggererrorHandler };