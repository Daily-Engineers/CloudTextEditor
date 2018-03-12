'use strict';
const express = require('express');
const router = express.Router();
const auth = require("../modules/AuthController.js");

//TODO dev statments for logging in users before we had login page
router.get('/reg', function(req, res){res.render('auth', {user: req.user})});


// route for register action
router.post('/register', auth.register);

// route for login action
router.post('/login', auth.login);

router.get('/login', auth.getLogin);

// route for logout action
router.get('/logout', auth.saveLogout,auth.logout);

router.get('/authenticatetoken/:authToken', auth.validateUser);

module.exports = router;
