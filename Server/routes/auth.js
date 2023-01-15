const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

router.post('/logIn', authController.logIn);

router.post('/register', authController.register);

router.post('/resetPassword', authController.resetPassword);

module.exports = router;
