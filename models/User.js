const db = require('../config/db');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  provider: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = db.getConnections().main.model('User', UserSchema);
