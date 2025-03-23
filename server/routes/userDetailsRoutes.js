const express = require('express');
const router = express.Router();
const userDetails = require('../controllers/UserDetailsController');

router.patch('/userDetails',userDetails.updateUserDetails);
router.post('/getuserDetails',userDetails.getUserDetailsById);

module.exports = router;