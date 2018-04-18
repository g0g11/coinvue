const mongoose = require('mongoose');

// coin model
const Coin = mongoose.model('coins');

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
