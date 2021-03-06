const mongoose = require('mongoose');
const { Schema } = mongoose;

// TODO: Update Schema with additional properties (like image, etc.)
// TODO: Set default values (for example default image)
const userSchema = new Schema({
  googleId: String,
  firstName: String,
  lastName: String,
  email: String,
  picture: String,
  language: { type: String, default: 'en' },
  _wallet: [
    {
      amount: Number,
      currency: { type: Schema.Types.ObjectId, ref: 'coins' },
      exchange: { type: Schema.Types.ObjectId, ref: 'exchanges' },
      // _id: false,
    },
  ],
  _apiExchange: [
    {
      apiKey: String,
      apiSecret: String,
      exchange: { type: Schema.Types.ObjectId, ref: 'exchanges' },
      _id: false,
    },
  ],
});

mongoose.model('users', userSchema);
