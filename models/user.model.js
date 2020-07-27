const mongoose = require('mongoose');

// User info Schema
const UserSchema = new mongoose.Schema({
  username: String,
  userID: String,
  email: String,
  password: String,
  date: {
    type: Date,
    default: Date.now
  },
  userType: {
    type: String,
    default: 'normal'
  },
  toDo: Array
});

let User = mongoose.model('User', UserSchema);
module.exports = User;