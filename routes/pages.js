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

router.post('/save', require('../modules/savePage'));

router.post('/namefile', function (req, res, next) {
    var filename = req.body.filename;
    var filter = /^[a-z0-9]+$/i;

    if(filename != '' && filter.test(filename)){
        var pageId = req.headers.referer.slice(-5);
        Page.findOneAndUpdate({page_id:pageId}, {filename: filename},function (err, rst) {
            if(err){
                console.log(err);
                res.sendStatus(500)
            }else{
                res.sendStatus(201);
            }
        })
    }else{
     res.sendStatus(500);
    }
});


module.exports = router;
