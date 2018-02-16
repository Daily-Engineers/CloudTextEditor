'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Page = require('../models/page');

//Serve landing page
router.get('/', (req, res) => res.render('editor'));

router.get('/:page_id', (req, res) => {
  Page.findOne({
    'page_id': req.params.page_id
  }).exec((err, page) => {
    res.render('editor', {
      page: page,
      docSaved: true
    });
  });
});


module.exports = router;
