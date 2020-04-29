/**
 * Skrevet av Mikael
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// LoggSkjema
let loggSchema = new Schema({
  email: {
    type: String
  },
  act: {
    type: String
  },
  date: {
    type: String
  }
}, {
    collection: 'logg'
  })

let Logg = mongoose.model('Logg', loggSchema)
module.exports = Logg;