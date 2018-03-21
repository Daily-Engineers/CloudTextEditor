'use strict';
const express = require('express');
const router = express.Router();
const Page = require('../models/page');
const User = require('../models/users');

//Finds all pages
router.post('/pages', function(req, res, next){
    var pages = {
        owners: [],
        editors: [],
        viewers: [],
    };
    if(req.user) {
        var username = req.user.username;
        User.findOne({username: username}).exec(function (err, user) {
            if(err){
                console.log(err);
                res.sendStatus(500);
            }else{
                Page.find({page_id: {$in:user.pages}}).exec(function (err, rst) {
                    if(err){
                        console.log(err);
                        res.sendStatus(500);
                    }else{
                        rst.forEach(function (page, index) {
                            var data = {
                                filename: page.filename,
                                page_id: page.page_id
                            };

                            if(page.owners.includes(username)){
                                pages.owners.push(data)

                            }else if(page.editors.includes(username)){
                                pages.editors.push(data)

                            }else if(page.viewers.includes(username)){
                                pages.viewers.push(data)
                            }
                        });
                    res.status(200).json(pages)
                    }
                })
            }
        });
    }
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
