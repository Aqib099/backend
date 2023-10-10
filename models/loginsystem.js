const mongoose = require('mongoose');
const { isEmail, isIn } = require('validator');

const signupSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: isEmail,
      message: 'Invalid email address',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8, // Minimum password length
  },
});

module.exports = mongoose.model('Login', signupSchema);