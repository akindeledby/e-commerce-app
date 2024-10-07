const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');

// create the end points as below
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
