const express = require('express');
const router = express.Router();

const loginSignupLogoutController = require('../controllers/LoginSignupLogoutController');

router.post('/login', loginSignupLogoutController.login);
router.post('/register', loginSignupLogoutController.register);
router.patch('/Logout', loginSignupLogoutController.Logout);

module.exports = router;