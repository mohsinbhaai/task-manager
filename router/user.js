const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../models/Idea');
const Task = mongoose.model('task');

//Login route
router.get('/login', (req, res) => {
    res.render('user/login')
});

//register route
router.get('/register', (req, res) => {
    res.render('user/register')
});

module.exports = router;