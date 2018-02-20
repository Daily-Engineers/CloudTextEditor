'use strict';
const express = require('express');
const router = express.Router();
const fs = require('fs');
const Page = require('../models/page');



var saveFile = function (res, content, fileName) {

    var fws = fs.createWriteStream('./temp/' + fileName + '.txt');

    fws.write(content);
    fws.end()
    fws.on('finish', function () {

        res.download('./temp/' + fileName + '.txt', fileName + '.txt', function (err) {
            if (err) {
                console.log(err)
            }
            try {
                //try to delete file.
                fs.unlinkSync('./temp/' + fileName + '.txt');
            } catch (err) {
                console.log('Error: File delete failed');
            }
        });
    })
}

//download page.
router.get('/page/download/:pageId', function (req, res, next) {
    var pageId = req.params.pageId;
    //TODO implemnt untitled download




    //find page
    Page.findOne({'page_id':pageId}, function (err, rst) {

        //if result found
        if(rst) {
            saveFile(res, rst.content, pageId);

        } else {
            res.sendStatus(404);

        }
    });

});


router.post('/page/download', function (req, res, next) {


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

        //saveFile(res, content, pageId);
    }
})

module.exports = router;
