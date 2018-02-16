const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');



//download page.
router.get('/page/download/:pageId', function (req, res, next) {
    var pageId = req.params.pageId;

    //create blank file in dir temp, with pageId as name.
    var fws = fs.createWriteStream('./temp/' + pageId + '.txt');

    //find page
    mongoose.model('pages').find({'page_id':pageId}, function (err, rst) {

        //if not page with pageId is found
        if(rst.length < 1) {    //this is in a separate if statement to allow for better handling latter
            fs.unlink('./temp/' + pageId + '.txt');
            res.redirect('/page/download/error')

        }else if (rst.length > 1) {     //if more that one page with said pageId is returned. This should not happen.
            console.log('Error: Mltiple entries '+rst.length);   //Error: 0xME = multiple entries.
            fs.unlink('./temp/' + pageId + '.txt');
            res.redirect('/page/download/error')

        } else {

            fws.write(rst[0].content);  //write content to file
            fws.end();  //write file.

            //send file to client.
            res.download('./temp/' + pageId + '.txt', pageId + '.txt', function (err) {
            if (err) {
                console.log(err)
            } else
                try {
                    //try to delete file.
                    fs.unlinkSync('./temp/' + pageId + '.txt');
                } catch (err) {
                    console.log('Error: File delete failed');
                }
            });
        }
    });

});


//Needs to be worked on.
router.get('/page/download/error', function (req, res, next) {
    res.send('File not found');
});

module.exports = router;
