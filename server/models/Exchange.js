const mongoose = require('mongoose');
const { Schema } = mongoose;

// TODO: not in use currently
const exchangeSchema = new Schema({
  name: String,
  url: String,
});

mongoose.model('exchanges', exchangeSchema);
