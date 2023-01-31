const express = require('express');
const router = express.Router();

require('dotenv').config();
const { save, queries, query, shareQuery } = require('../controllers/user.controller.js');

router.post('/save', save, (req, res) => {});

router.get('/', queries, (req, res) => {});

router.get('/:id', query, (req, res) => {});

router.post('/share', shareQuery, (req, res) => {});

module.exports = router;