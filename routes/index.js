'use strict';
const express = require('express');
const router = express.Router();
const Page = require('../models/page');
const auth = require("../modules/AuthController.js");

//Serve landing page
router.get('/', (req, res) => res.render('editor', {docSaved : false}));


router.get('/doc/:page_id', (req, res) => {
  Page.findOne({
    'page_id': req.params.page_id
  }).exec((err, page) => {
    if (page) {
      res.render('editor', {
        page: page,
        docSaved: true
      });
    } else {
      res.status(404).send('<h1>Wow there, Cowboy Neil. It looks like you are lost! 🤠</h1>');
    }
  });
});



//TODO dev statments for logging in users before we had login page
router.get('/reg', function(req, res){res.render('auth', {user: req.user})});


// route for register action
router.post('/register', auth.register);

// route for login action
router.post('/login', auth.login);

router.get('/login', auth.getLogin);

// route for logout action
router.get('/logout', auth.logout);


module.exports = router;

