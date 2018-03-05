const mongoose = require('mongoose');
const User = require("../models/users");



//register user
exports.register = function(req, res) {
  console.log("registering: ");

  //User object, if you want the user to have more 'things' in it you must add it do here and the model users.js file
  User.register(new User({

    username: req.body.username.trim(),

    //TODO get date for when account is created.
    //dateCreated:


  }), req.body.password.trim(), function(err, user) {
    if (err) {
      //TODO When failed register

      console.log(err);
      return res.send(err);
    } else {


      //TODO When successful register
      res.status(200);
    }
  });
};

//login
exports.login = function(req, res, next) {

  if (req.user) {

    //if user is already logged in
    res.status(201).json(req.user);
  } else {

    User.authenticate()(req.body.username.trim(), req.body.password, function(err, user, options) {
      if (err)
        //When error
        return next(err);
      if (user === false) {
        //When Failed login
        res.status(403).json({
          message: options.message
        })

      } else {
        req.login(user, function(err) {

          //TODO fix this gross as shit.
          req.user.hash = null;
          req.user.salt = null;
          req.user.authToken = null;
          req.user.isAuthenticated = null;

          //When after logged in
          res.status(201).json(user)
        });
      }
    });
  }

};


//get login this see if the user is logged in and returns the user in the cookie
//Not super useful
exports.getLogin = function(req, res) {
  console.log(req.user);
  if (req.user) {
    //TODO When user is logged in
    return res.send(req.user);

  } else {
    //TODO When user is not logged in
    res.sendStatus(403);
  }
};

//logs the user out
//TODO save on logout
exports.logout = function(req, res, next) {
  req.logout();
  res.status(201).json({
    message: 'logged out'
  })
};
