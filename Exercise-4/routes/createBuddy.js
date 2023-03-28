//Create a POST Request to add new buddy information to the existing list
let express = require('express');
let router = express.Router();

const createBuddy = require('../controllers/createBuddyController');
router.post('/addbuddy', createBuddy.createBuddyDetails);

module.exports = router;