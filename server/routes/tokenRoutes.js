const express = require('express');
const router = express.Router();
const TokenController = require('../controllers/TokenController')

router.get('/refresh',TokenController.refresh);

exports.module = router