const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  name: String
});

mongoose.model('users', usersSchema);
