const mongoose = require('mongoose');

// mongodb models
const User = mongoose.model('users');
const Coin = mongoose.model('coins');

// Public: List all Coins
module.exports.listAll = async (req, res) => {
  try {
    const coins = await Coin.find({});
    res.send(coins);
    res.status(200);
  } catch (err) {
    console.error(err);
    res.status(400);
  }
};

// Private: Add a new Coin to Portfolio
module.exports.addCoin = async (req, res) => {
  try {
    const { currency, amount, exchange } = req.body;
    const addCoin = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { _wallet: [{ currency: currency._id, amount: amount, exchange: exchange._id }] } }
    );

    res.send(addCoin._wallet);
    res.status(201);
  } catch (err) {
    console.error(err);
    res.status(400);
  }
};

// Private: List my Coins from Portfolio
module.exports.listMyCoins = async (req, res) => {
  try {
    const coins = await User.find({})
      .populate('_wallet.currency')
      .populate('_wallet.exchange');
    res.send(coins[0]._wallet);
    res.status(200);
  } catch (err) {
    console.error(err);
    res.status(400);
  }
};

// Private: Delete a coin from Portfolio
module.exports.deleteCoin = async (req, res) => {
  try {
    const coin = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { _wallet: { _id: req.params.id } } }
    );
    res.send(coin);
    res.status(202);
  } catch (err) {
    console.error(err);
    res.status(404);
  }
};

// Private: Add API Information
module.exports.addApi = async (req, res) => {
  try {
    const { apiKey, apiSecret, exchange } = req.body;
    // TODO: Check if API key already exist
    const api = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { _apiExchange: [{ apiKey, apiSecret, exchange: exchange._id }] } }
    );
    res.send(api);
    res.status(201);
  } catch (err) {
    console.error(err);
    res.send(404);
  }
};
