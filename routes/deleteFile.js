/**
 * Created by ali-meysammohebbi on 2018-02-14.
 */
'use strict';
const express = require('express');
const router = express.Router();
const fs = require('fs');
const Page = require('../models/page');
const User = require('../models/users');
router.post('/page/deleteFile/', function (req, res) {
    // saving pageId in the variable pageID
    var pageID = req.headers.referer.slice(-5);

    var username = 'guest';
    if(req.user){
        username = req.user.username;
    }

    //Search for the page
    Page.deleteOne({page_id:pageID, owners: {$in: [username, 'guest']}}, function (err, rst) {
        //if result found
        if(rst) {
            res.sendStatus(200);
            User.findOneAndUpdate({username:username},{ $pull: { pages : pageID }}).exec((err,user)=>{});
        } else {
            res.status(404).send('<h1>You do not have permission to delete this page</h1><p>Please <a href="/">sign in</a> to continue</p>');

        }
    });


});

router.get('/test',(req,res)=>{
})

module.exports = router;
