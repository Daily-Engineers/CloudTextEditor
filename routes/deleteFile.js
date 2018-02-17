/**
 * Created by ali-meysammohebbi on 2018-02-14.
 */
'use strict';
const express = require('express');
const router = express.Router();
const fs = require('fs');
const Page = require('../models/page');

router.get('/page/doc/:pageId', function (req, res) {
    // saving pageId in the variable pageID
    var pageID = req.params.pageId;

    //Search for the page
    Page.deleteOne({'page_id':pageId}, function (err, rst) {

        //if result found
        if(rst) {

            console.log("deleted");
            res.sendStatus(200);

        } else {
            fs.unlink('./doc/' + pageId + '.txt');
            res.sendStatus(404);

        }
    });


});