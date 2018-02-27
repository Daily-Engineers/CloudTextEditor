const mongoose = require('mongoose');
const User = require("../models/users");


//register user
exports.register = function (req, res) {
    console.log("registering: ");

    //User object, if you want the user to have more 'things' in it you must add it do here and the model users.js file
    User.register(new User({

        username: req.body.username


    }), req.body.password, function (err, user) {
        if (err) {
            //TODO When failed register

            console.log(err);
            return res.send(err);

        } else {

            //TODO When successful register
            res.send({
                success: true,
                user: user
            });
        }
    });
};

//login
exports.login = function (req, res, next) {

    User.authenticate()(req.body.username, req.body.password, function (err, user, options) {
        if (err)
            //TODO When error
            return next(err);
        if (user === false) {
            //TODO When Failed login

            res.send({
                message: options.message,
                success: false
            });

        } else {
            req.login(user, function (err) {
                req.user.hash = null;
                //TODO When after logged in
                res.send({
                    success: true,
                    user: user,
                });

            });
        }
    });

};


//get login this see if the user is logged in and returns the user in the cookie
//Not super useful
exports.getLogin = function (req, res) {
    console.log(req.user);
    if (req.user) {
        //TODO When user is logged in
        return res.send({
            success: true,
            user: req.user
        });

    }else {
        //TODO When user is not logged in
        res.send({
            success: false,
            message: 'not authorized'
        });
    }
};

//logs the user out
exports.logout = function (req, res, next){
    req.logout();
    return next();
};


