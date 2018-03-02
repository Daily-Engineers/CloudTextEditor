'use strict';
const express = require('express');
const router = express.Router();
const Page = require('../models/page');
//Serve landing page
router.get('/', (req, res) => res.render('editor', {docSaved : false, user:req.user}));


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


module.exports = router;
