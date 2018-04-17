const mongoose = require('mongoose');
const { Schema } = mongoose;

// TODO: extend Schema (prices)
const coinSchema = new Schema({
  cryptoCompareId: String,
  webUrl: String,
  imageUrl: String,
  shortName: String,
  fullName: String,
  totalCoinSupply: String,
  priceUSD: Number,
  priceCHF: Number,
  priceEUR: Number,
});

mongoose.model('coins', coinSchema);
