const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    requied: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: 'New York',
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const User = mongoose.model('User', userSchema)
module.exports = User;