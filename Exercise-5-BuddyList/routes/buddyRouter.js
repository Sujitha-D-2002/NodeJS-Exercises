let express = require('express');
let router = express.Router();
const buddyList = require('../controllers/buddyController');

//Create a POST Request to add new buddy information to the existing list
router.post('/', buddyList.createBuddyDetails);

//Create a DELETE Request to delete all buddy information
router.delete('/', buddyList.deleteAllBuddyDetails)

//Create a DELETE Request to delete particular buddy information
router.delete('/:id', buddyList.deleteBuddyDetails)

//Create a GET Request to list all the buddy's information
router.get('/', buddyList.displayAllBuddyDetails)

//Create a GET Request to list a single buddy's information using his employeeId
router.get('/:id', buddyList.displayBuddyDetails)

//Create a UPDATE Request to update particular buddy information
router.put('/:id', buddyList.updateBuddyDetails)


module.exports = router;