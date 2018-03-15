const mongoose = require('mongoose');
const User = require("../models/users");
const savePage = require("../modules/savePage");
const link = require("../models/AuthenticateEmailText");
const sendEmail = require("../modules/MailToUser");


let validateEmail = function (req) {
    var username = req.body.username.trim();

    User.findOne({username: username},function (err, rst, cb) {
        if(err) console.log(err);

        //TODO get the starting bit of address.
        //req.protocol+ "//" +
        var address = req.get('host') + "/"+ "authenticatetoken/"+ rst.authToken
        sendEmail(username, 'Curlyboi account authentication', link(address), function () {
            cb;
        });
    })
};

exports.validateUser = function (req, res, next) {
    var token = req.params.authToken;

    User.findOneAndUpdate({authToken: token}, {$set:{isAuthenticated: true}},function (err) {
        if(err) console.log(err);
        res.redirect('/');
    })

}

//register user
exports.register = function(req, res) {

  //User object, if you want the user to have more 'things' in it you must add it do here and the model users.js file
  User.register(new User({

      username: req.body.username.trim()

  }), req.body.password.trim(), function(err, user) {
    if (err) {
            res.status(403).json({message: err.message});
    } else {
        validateEmail(req, res, function () {
            res.status(201).json({message: 'Registration successful, An validation email has been send.'});
        })
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

          var info = {message: ''};

        //When Failed login
          if(options.message === 'User did not verify email!'){
              info.message = 'Account not validated, An validation email has been send to your email.';
              validateEmail(req, res);
          }else if(options.message === 'Incorrect username' || options.message === 'Incorrect password' ){
              info.message = 'Invalid Login'
          }
          res.status(403).json(info)

      } else {
        req.login(user, function(err) {
          //When after logged in
          res.status(201).json(user)
        });
      }
    });
  }

};


//get login this see if the user is logged in and returns the user in the cookie
//Not super useful
exports.getLogin = function(req, res, next) {
  if (req.user) {
    res.sendStatus(201);
  } else {
    //TODO When user is not logged in
    res.sendStatus(403);
  }
};

//logs the user out
//TODO save on logout

//Save logic
exports.saveLogout = function(req,res,next){
    savePage(req, res, next);
}

exports.logout = function(req, res, next) {
  req.logout();
  res.status(201).json({message:'Logging Out'});
};
