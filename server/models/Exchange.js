const mongoose = require('mongoose');
const { Schema } = mongoose;

// TODO: not in use currently
const exchangeSchema = new Schema({
  name: String,

  // TODO: add available currencies
  // _availableCurrencies: [
  //   {
  //     currency: { type: Schema.Types.ObjectId, ref: 'coins' },
  //   },
  // ],
});

mongoose.model('exchanges', exchangeSchema);
