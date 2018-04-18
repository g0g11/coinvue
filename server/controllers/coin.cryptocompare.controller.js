const _ = require('lodash');
const mongoose = require('mongoose');
const coinController = require('./coin.controller');

global.fetch = require('node-fetch');
const cc = require('cryptocompare');

// coin model
const Coin = mongoose.model('coins');
const Exchange = mongoose.model('exchanges');

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

// TODO: add different currencies, historical data
// TODO: Refactor lodash methods
module.exports.fetchPrices = async (req, res) => {
  try {
    const coins = await Coin.find({ ignore: false });
    const coinSymbols = await _.map(coins, 'shortName');

    // limit of 50 currencies per request (length limit fetch request)
    const coinNames = _.chunk(coinSymbols, 50);

    // update prices in mongodb
    _.forEach(coinNames, async (coin) => {
      try {
        const price = await cc.priceMulti(coin, ['USD', 'EUR', 'CHF']);
        _.mapKeys(price, async (value, key) => {
          const newPrices = await Coin.findOneAndUpdate({ shortName: key }, { $set: { priceUSD: value.USD, priceEUR: value.EUR, priceCHF: value.CHF } });
          return newPrices;
        });
      } catch (err) {
        console.error(err);
      }
    });

    res.send(coins);
    res.status(200);
  } catch (err) {
    console.error(err);
    res.status(400);
  }
};

module.exports.exchangeList = async (req, res) => {
  try {
    const exchanges = await cc.exchangeList();

    _.forEach(Object.keys(exchanges), async (name) => {
      const existingExch = await Exchange.findOne({ name });
      if (!existingExch) {
        await new Exchange({
          name,
        }).save();
      }
    });
    res.send(exchanges);
    res.status(200);
  } catch (err) {
    console.error(err);
    res.status(400);
  }
};

