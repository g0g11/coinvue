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
    const { coinId, amount } = req.body;
    const addCoin = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { _wallet: [{ currency: coinId, amount: amount }] } }
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
    const coins = await User.find({}).populate('_wallet.currency');
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
    const { userId, coinId, amount, exchangeId } = req.body;
    const coin = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { _wallet: { currency: coinId, amount: amount, exchange: exchangeId } } }
    );

    res.send(coin);
    res.status(202);
  } catch (err) {
    console.error(err);
    res.status(400);
  }
};
