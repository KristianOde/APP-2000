/**
 * Skrevet av Mikael
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Brukerprofil
let userSchema = new Schema({
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  }
}, {
    collection: 'users'
  })


let User = mongoose.model('User', userSchema)
module.exports = User;