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
      if(req.user && page.published_by === req.user.username){
      res.render('editor', {
        page: page,
        docSaved: true,
        user:req.user
      });
      }else{
        res.status(403).send('<h1>You do not have permission to view this page</h1><p>Please <a href="/">sign in</a> to continue</p>');
      }
    } else {
      res.status(404).send('<h1>Wow there, Cowboy Neil. It looks like you are lost! 🤠</h1>');
    }
  });
});


module.exports = router;
