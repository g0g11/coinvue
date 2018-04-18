const mongoose = require('mongoose');
const { Schema } = mongoose;

// TODO: extend Schema
const walletSchema = new Schema({
  name: String,
  apiKey: String,
  url: String,
});

mongoose.model('wallets', walletSchema);
