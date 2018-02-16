'use strict';
const express = require('express');
const router = express.Router();
const fs = require('fs');
const Page = require('../models/page');



//download page.
router.get('/page/download/:pageId', function (req, res, next) {
    var pageId = req.params.pageId;

    //create blank file in dir temp, with pageId as name.
    var fws = fs.createWriteStream('./temp/' + pageId + '.txt');

    //find page
    Page.findOne({'page_id':pageId}, function (err, rst) {

        //if result found
        if(rst) {

            fws.write(rst.content);  //write content to file
            fws.end();  //write file.

            //send file to client.
            res.download('./temp/' + pageId + '.txt', pageId + '.txt', function (err) {
                if (err) {
                    console.log(err)
                }
                try {
                    //try to delete file.
                    fs.unlinkSync('./temp/' + pageId + '.txt');
                } catch (err) {
                    console.log('Error: File delete failed');
                }
            });

        } else {
            fws.end();
            fs.unlink('./temp/' + pageId + '.txt');
            res.sendStatus(404);

        }
    });

});


//Needs to be worked on.
router.get('/page/download', function (req, res, next) {
    res.send('File not found');
});

module.exports = router;
