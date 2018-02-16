const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const hbs = require('express-handlebars');
const config = require('./config/config');
const uri = config.getDatabaseURI();

//connect to database
mongoose.connect(uri);
//Loads all mongoose models
fs.readdirSync(__dirname + '/models').forEach((filename) => {
  require(__dirname + '/models/' + filename)
})

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//setup handlbars view engine
app.engine('handlebars', hbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Define routes
app.use(require('./routes/pages'));
app.use(require('./routes/users'));
app.use(require('./routes/download'));

// Serve static files
app.use('/public', express.static('public'));

//Serve landing page
app.get('/', (req, res) => res.render('editor'));


//listen on port 3000
app.listen(3000, () => {
  console.log("Listening on port 3000!");
})
