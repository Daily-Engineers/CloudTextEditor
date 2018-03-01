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

router.post('/save', require('../modules/addPage'));


module.exports = router;
