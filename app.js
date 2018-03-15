'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const hbs = require('express-handlebars');
const config = require('./config/config');
const server = require('http').Server(app);
const io = require('socket.io')(server);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const socketListener = require('./modules/socketListener')(io);



//connect to database
mongoose.connect(config.getDatabaseURI());

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//cookies setup
app.use(require('express-session')({
    secret: '5hhhhh d0 n0t t311 any0n3 0ur s3cret',
    resave: false,
    saveUninitialized: false
}));

//passport setup
app.use(passport.initialize());
app.use(passport.session());

var User = require('./models/users');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//setup handlbars view engine
app.engine('handlebars', hbs({
  defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

//Define routes
app.use(require('./routes/index'));
app.use(require('./routes/pages'));
app.use(require('./routes/users'));
app.use(require('./routes/download'));
app.use(require('./routes/deleteFile'));

// Serve static files
app.use('/public', express.static('public'));


app.get('/ping',(req, res)=>res.send('pong'));
app.post('/ping',(req, res)=>res.send('pong'));

//listen on port 3000
server.listen(3000, () => {
  console.log("Listening on port 3000!");
});

module.exports = app; //for testing
