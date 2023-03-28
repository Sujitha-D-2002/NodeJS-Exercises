//Create a PUT Request to update the existing buddy information like nickname, hobbies

let express = require('express');
let router = express.Router();

const updateBuddy = require('../controllers/updateBuddyController');
router.put('/:id', updateBuddy.updateBuddyDetails)
module.exports = router;