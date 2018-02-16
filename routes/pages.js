const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Finds all pages where owner is :username
router.get('/pages/:username', (req,res)=>{
  mongoose.model('pages').find({'owner':req.params.username},(err,pages)=>{
    res.send(pages);
  })
});

//Finds all pages
router.get('/pages', (req,res)=>{
  mongoose.model('pages').find((err,pages)=>{
    res.send(pages);
  })
})




module.exports = router;
