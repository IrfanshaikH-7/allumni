const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
  clg_email: {
    type: String,
    required: false,
  },
  type_of_job: {
    type: String,
    required: false,
  },
  date_of_joining: {
    type: String,
    required: false,
  },
  department: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: false,
  },
  yearOfjoining: {
    type: Number,
    required: false,
  },
  current_designation: {
    type: String,
    required: false,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;