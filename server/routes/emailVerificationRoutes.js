const EmailVerificationController = require('../controllers/EmailVerificationController');
const express = require('express');
const router = express.Router();

router.patch('/verifyUser', EmailVerificationController.verifyUser);
router.post('/sendVerifMail', EmailVerificationController.sendVerifMail);

module.exports = router