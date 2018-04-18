const mongoose = require('mongoose');
const { Schema } = mongoose;
const CoinSchema = require('./Coin');

// TODO: Update Schema with additional properties (like image, etc.)
// TODO: Set default values (for example default image)
const userSchema = new Schema({
  googleId: String,
  firstName: String,
  lastName: String,
  email: String,
  picture: String,
  language: { type: String, default: 'en' },
  coins: [CoinSchema],
});

mongoose.model('users', userSchema);
