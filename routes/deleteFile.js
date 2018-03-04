/**
 * Created by ali-meysammohebbi on 2018-02-14.
 */
'use strict';
const express = require('express');
const router = express.Router();
const fs = require('fs');
const Page = require('../models/page');

router.post('/page/deleteFile/', function (req, res) {
    // saving pageId in the variable pageID
    var pageID = req.headers.referer.slice(-5);

    //Search for the page

    Page.deleteOne({'page_id':pageID}, function (err, rst) {

        //if result found
        if(rst) {
            res.sendStatus(200);

        } else {
            res.sendStatus(404);

        }
    });


});

module.exports = router;
