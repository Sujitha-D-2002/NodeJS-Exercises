const errorHandle = require('../utils/errorHandlerUtil');
const userServices = require('../services/userServices');
const { readFileData } = require('../utils/fileOperationUtils');
const logger = require('../config/loggerConfig');

const registerNewUser = async (req, res) => {
    logger.info(` ${req.originalUrl} - ${req.ip}`);
    var body = [req.body.username, req.body.password]

    let validate = errorHandle.errorHandler(body);
    if (validate == true) {
        try {
            const fileData = JSON.parse(await readFileData('./user-details.json'));
            let index = fileData.findIndex(temp => {
                return temp.username === req.body.username;
            });
            if (index == -1) {
                let response = await userServices.registerUserServices(req);
                res.status(response.status).json({ message: response.message });
            }
            else {
                res.json({ message: "Username already exists..!!!" });
            }
        }
        catch (err) {
            logger.error(`${response.status} - ${response.message} - ${req.originalUrl} - ${req.ip}`);
            res.json({ message: "File not found" });
        }
    }
    else {
        res.send(validate);
    }

}

const loginUser = async (req, res) => {
    logger.info(` ${req.originalUrl} - ${req.ip}`);
    var body = [req.body.username, req.body.password]

    let validate = errorHandle.errorHandler(body);
    if (validate == true) {
        try {
            let response = await userServices.loginUserServices(req);
            res.status(response.status).json({ message: response.message, token: response.token });
        }
        catch (err) {
            logger.error(`${response.status} - ${response.message} - ${req.originalUrl} - ${req.ip}`);
            res.json({ message: "File not found" });
        }
    }
    else {
        res.send(validate)
    }
}

module.exports = { loginUser, registerNewUser }