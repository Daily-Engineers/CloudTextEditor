'use strict';
const express = require('express');
const router = express.Router();
const fs = require('fs');
const Page = require('../models/page');
const saveFile = require('../modules/saveFile');
const deleteFile = require('../modules/deleteFile');

//download page.
router.get('/page/download/:pageId', function (req, res, next) {
    var pageId = req.params.pageId;
    //TODO implemnt untitled download

    //find page
    Page.findOne({'page_id':pageId}, function (err, rst) {

        //if result found
        if(rst) {
            saveFile(rst.content, pageId, function(){
                    res.download('./temp/' + pageId + '.txt', pageId + '.txt', function (err) {
                        if (err) {
                            console.log(err);
                        }
                        deleteFile(pageId);
                    })
                });

        } else {
            res.sendStatus(404);

        }
    });

});


router.post('/page/download', function (req, res, next) {
    if(req.body.isTest == true){
        res.send('you are testing')
    }

    var pageId = "untitled";
    var content = req.body.content;
    var docSaved = req.body.isInDB
    if(docSaved == "true"){
        pageId = req.headers.referer.slice(-5);
        var page = {
            page_id: pageId,
            content: content,
            docSaved: docSaved
        }

        //TODO Make this work for untitled files
        res.status(201).json(page);
    }else {

        res.status(200)
    }
})

module.exports = router;
