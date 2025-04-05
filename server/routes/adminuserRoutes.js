const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser } = require('../controllers/AdminUserController');

router.post('/getAllUsers', getAllUsers);
router.delete('/deleteUser/:userId', deleteUser);

module.exports = router;