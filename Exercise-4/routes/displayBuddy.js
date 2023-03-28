let express = require('express');
let router = express.Router();

const createBuddy = require('../controllers/displayBuddyController');
//Create a GET Request to list all the buddy's information
router.get('/all', createBuddy.displayAllBuddyDetails)

//Create a GET Request to list a single buddy's information using his employeeId
router.get('/:id', createBuddy.displayBuddyDetails)


module.exports = router;