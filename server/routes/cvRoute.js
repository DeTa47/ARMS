const express = require('express');
const router = express.Router();
const genCV = require('../controllers/CVController');

router.post('/generateCV',genCV.generateCV);

module.exports = router;