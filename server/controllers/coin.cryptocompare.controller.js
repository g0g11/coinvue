const _ = require('lodash');
global.fetch = require('node-fetch');
const cc = require('cryptocompare');
const mongoose = require('mongoose');

// coin model
const Coin = mongoose.model('coins');

// fetch coins from CryptoCompare (used in CronJob)
module.exports.fetchAll = async (req, res) => {
  try {
    const coins = await cc.coinList();

    // add a new coin if coin not exist in mongodb
    const coinSnapshot = await _.forEach(coins.Data, async (data) => {
      const existingCoin = await Coin.findOne({ cryptoCompareId: data.Id });
      if (!existingCoin) {
        new Coin({
          cryptoCompareId: data.Id,
          webUrl: data.Url,
          imageUrl: data.ImageUrl,
          shortName: data.Symbol,
          fullName: data.CoinName,
          totalCoinSupply: data.TotalCoinSupply,
        }).save();
      }
    });
    res.send(coinSnapshot);
    res.status(200);
  } catch (err) {
    console.error(err);
    res.status(400);
  }
};

