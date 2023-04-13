let express = require('express');
let router = express.Router();
const userList = require('../controllers/userControllers');

//Create a POST Request to add new user to the existing list-Register
router.post('/', userList.registerNewUser);

//Create a GET Request to list a single user-Login
router.get('/',userList.loginUser)


module.exports = router;