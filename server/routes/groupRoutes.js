const express = require('express');
const router = express.Router();
const GroupsController = require('../controllers/GroupsController');

router.get('/getGroups',GroupsController.getGroups);

module.exports = router;