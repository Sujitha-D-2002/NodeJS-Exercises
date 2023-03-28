// Create a DELETE Request to delete an existing buddy
let express = require('express');
let router = express.Router();

const deleteBuddy = require('../controllers/deleteBuddyController');
router.delete('/all', deleteBuddy.deleteAllBuddyDetails)

router.delete('/:id', deleteBuddy.deleteBuddyDetails)

module.exports = router;