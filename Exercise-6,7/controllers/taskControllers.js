const taskServices = require('../services/taskServices');
const { readFileData } = require('../utils/fileOperationUtils');
const logger = require('../config/loggerConfig');
const errorHandle = require('../utils/errorHandlerUtil');


//create task details
const createTask = async (req, res) => {
    logger.info(` ${req.originalUrl} - ${req.ip}`);
    var body = [req.body.title, req.body.description, req.body.priority, req.body.date];
    let validate = errorHandle.taskerrorHandler(body);
    if (validate == true) {
        const fileData = JSON.parse(await readFileData('./task-management.json'));
        let index = fileData.findIndex(temp => {
            return temp.taskid === req.body.taskid;
        });
        if (index == -1) {
            let response = await taskServices.createTaskServices(req);
            errorHandle.loggererrorHandler(req,response)
            res.json(response);
        }
        else {
            res.json("Task-ID already exists..!!!");
        }
    }
    else {
        res.json(validate);
    }
}

//Display all Task Details
const displayAllTask = async (req, res) => {
    logger.info(` ${req.originalUrl} - ${req.ip}`);
    let response = await taskServices.displayAllTaskServices(req);
    errorHandle.loggererrorHandler(req,response)
    res.json(response);
}

//Display Specific task Details
const displayTaskDetailsByID = async (req, res) => {
    logger.info(` ${req.originalUrl} - ${req.ip}`);
    let response = await taskServices.displayParticularTaskServices(req);
    errorHandle.loggererrorHandler(req,response)
    res.json(response);
}

//Delete Particular Task Details
const deleteTaskDetailsByID = async (req, res) => {
    logger.info(` ${req.originalUrl} - ${req.ip}`);
    let response = await taskServices.deleteParticularTaskService(req);
    errorHandle.loggererrorHandler(req,response)
    res.json(response);
}

//Update Task Details
const updateTaskDetails = async (req, res) => {
    logger.info(` ${req.originalUrl} - ${req.ip}`);
    let response = await taskServices.updateTaskService(req);
    errorHandle.loggererrorHandler(req,response)
    res.json(response);
}
//Sort Task
const sortTaskDetail = async (req, res) => {
    logger.info(` ${req.originalUrl} - ${req.ip}`);
    let response = await taskServices.sortTaskDetails(req);
    errorHandle.loggererrorHandler(req,response)
    res.json(response);

}
//Filter task
const filterTaskDetail = async (req, res) => {
    logger.info(` ${req.originalUrl} - ${req.ip}`);
    let response = await taskServices.filterTaskDetails(req);
    errorHandle.loggererrorHandler(req,response)
    res.json(response);

}

//Pagination task
const paginationTaskDetail = async (req, res) => {
    logger.info(` ${req.originalUrl} - ${req.ip}`);
    let response = await taskServices.paginationTask(req);
    errorHandle.loggererrorHandler(req,response)
    // res.status(response.status).json({ page: response.page, limit: response.limit, message: response.message });
    res.json(response);

}
module.exports = {
    createTask, displayAllTask, displayTaskDetailsByID, displayTaskDetailsByID, deleteTaskDetailsByID, updateTaskDetails, sortTaskDetail, filterTaskDetail, paginationTaskDetail
};