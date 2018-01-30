const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//Define routes
app.use(require('./routes/pages'));
app.use(require('./routes/users'));


app.get('/',(req,res)=>res.send('okay!'));

//listen on port 3000
app.listen(3000, ()=>{
  console.log("Listening on port 3000!");
})
