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
  priceUSD: { type: Number, default: 0 },
  priceCHF: { type: Number, default: 0 },
  priceEUR: { type: Number, default: 0 },
  ignore: { type: Boolean, default: false },
});

mongoose.model('coins', coinSchema);
