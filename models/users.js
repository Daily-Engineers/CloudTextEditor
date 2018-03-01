const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;


//Schema for users model, this is stored in database as well as the session, if you add or remove anything copy changes to the AuthController register or everything will brake.
var userSchema = new Schema({

});

//the fallowing already exits
//username
//salt
//hash (this is the hashed password it will be null)
var options = ({usernameUnique: true, usernameLowerCase: true});
userSchema.plugin(passportLocalMongoose, options);

module.exports = mongoose.model('user', userSchema);
