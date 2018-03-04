const mongoose = require('mongoose');
const passportLocalMongooseEmail = require('passport-local-mongoose-email');
const Schema = mongoose.Schema;


//Schema for users model, this is stored in database as well as the session, if you add or remove anything copy changes to the AuthController register or everything will brake.
var userSchema = new Schema({
    email: String,
    dateCreated: Date
});


//the fallowing already exits

//username
//salt
//hash (this is the hashed password it will be null)
//authToken this is a token used for email authentication
//isAuthenticated has the user authenticated their account

var options = ({usernameUnique: true, usernameLowerCase: true});
userSchema.plugin(passportLocalMongooseEmail, options);

module.exports = mongoose.model('user', userSchema);
