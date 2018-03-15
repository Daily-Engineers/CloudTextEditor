'use strict';
const express = require('express');
const router = express.Router();
const Page = require('../models/page');

//Finds all pages
router.get('/pages', (req, res) => {
  Page.find({}).exec(function(err, pages) {
      //TODO do something with pages, since this crashes the site
      //res.sendStatus(pages);
      res.sendStatus(200);
  });
});

//if save is successful go to next function, if save fails will send status 500 to res.
router.post('/save', require('../modules/savePage'), function (req, res, next) {
    res.sendStatus(202);
});


module.exports = router;
