const express = require('express');
const router = express.Router();

require('dotenv').config();
const { signup, login } = require('../controllers/auth.controller.js');

router.post('/register', signup, (req, res) => {}); 

router.post('/login', login, (req, res) => {});

module.exports = router;