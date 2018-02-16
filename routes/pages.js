
'use strict';
const express = require('express');
const router = express.Router();
const Page = require('../models/page');

//Finds all pages
router.get('/pages', (req, res) => {
  Page.find({}).exec(function(err, pages) {
    res.sendStatus(pages);
  });
});

router.post('/save', async function(req, res) {
  let pageData = req.body.content;
  let newPage = new Page();
  newPage.content = req.body.content;
  newPage.page_id = await generateUniqueID();
  newPage.published_by = 'adam';
  newPage.save((err, page) => {
    if (err)
      res.sendStatus(500);
    else {
      res.json(page);
      console.log(page);
    }
  });
});

//Function generates random and guaranteed unique page IDs
async function generateUniqueID() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let iDArray = [];
  for (let i = 0; i < 5; i++) {
    iDArray.push(chars.charAt(Math.floor(Math.random() * 62)));
  }
  let pageID = iDArray.join('');
  //Invalid if there is a collision
  let invalid = await Page.find({'page_id': pageID}) < 0;
  //If there is a collision a new one is generated
  if (invalid)
    return generateUniqueID();
  else {
    return pageID;
  }
}

module.exports = router;

