'use strict';
const express = require('express');
const router = express.Router();
const auth = require("../modules/AuthController.js");
const User = require("../models/users");
const Page = require('../models/page');

// route for register action
router.post('/register', auth.register);

// route for login action
router.post('/login', auth.login);

router.get('/login', auth.getLogin);

// route for logout action
router.get('/logout', auth.logout);

//Route allows ajax queries for searching users
router.get('/users', (req, res) => {
    User.find({
        username: RegExp('^' + req.query.search, "i")
    }, (err, users) => {
        if (err)
            console.log(err);
        if (users.length < 1)
            res.sendStatus(404);
        else
            res.json(users);
    });
});

//TODO check that poster is owner
router.post('/users/addViewer/:username', (req, res) => {
    let pageID = req.headers.referer.slice(-5);
    let username = req.params.username;
    User.findOneAndUpdate({
        'username': username
    }, {
        $push: {
            pages: pageID
        }
    }, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
    }, (err, model) => {
        if (err) {
            console.error(err);
            res.sendStatus(409)
        } else {
            Page.update({
                page_id: pageID,
                viewers: {
                    $nin: [username]
                }
            }, {
                $push: {
                    viewers: username
                }
            }, (err, update) => {
                if (update.nModified == 0)
                    res.sendStatus(409);
                else
                    res.sendStatus(200);
            });
        }
    });
});

module.exports = router;
