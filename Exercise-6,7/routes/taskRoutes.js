let express = require('express');
let router = express.Router();
const taskList = require('../controllers/taskControllers');
const { checkToken } = require("../utils/jwtUtils");

//Create a POST Request to add new task to the existing list
router.post('/', checkToken, taskList.createTask);

//Create a DELETE Request to delete particular task
router.delete('/:id', checkToken, taskList.deleteTaskDetailsByID)

//Create a Filter request to task
router.get('/filter', checkToken, taskList.filterTaskDetail)

//Create a Pagination request to task
router.get('/pagination', checkToken, taskList.paginationTaskDetail)

//Create a SORT request to task
router.get('/sort/:field', checkToken, taskList.sortTaskDetail)

//Create a GET Request to list all the task
router.get('/', checkToken, taskList.displayAllTask)

//Create a GET Request to list a single task
router.get('/:id', checkToken, taskList.displayTaskDetailsByID)

//Create a UPDATE Request to update particular task
router.put('/:id', checkToken, taskList.updateTaskDetails)

module.exports = router;