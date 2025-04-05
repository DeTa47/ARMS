const express = require('express');
const router = express.Router();
const {refresh} = require('../controllers/TokenController')

router.get('/refresh', refresh);

exports.module = router