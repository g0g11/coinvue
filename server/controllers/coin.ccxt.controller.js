const _ = require('lodash');
const mongoose = require('mongoose');
const ccxt = require('ccxt');

// mongodb models
const User = mongoose.model('users');
const Coin = mongoose.model('coins');
const Exchange = mongoose.model('exchanges');

const fetchBalance = async (apiKey, apiSecret, userId) => {
  try {
    // Fetch data from exchange
    let exchange = new ccxt.binance();
    exchange.apiKey = apiKey;
    exchange.secret = apiSecret;

    const balance = await exchange.fetchBalance();

    // TODO: Remove error undefined
    // store coins in database
    const plusBalance = Object.entries(balance.total)
      .filter(([key, value]) => (value > 0))
      .forEach(async (coin) => {
        try {
          const exchangeId = await Exchange.findOne({ name: 'Binance' });
          const currencyId = await Coin.findOne({ shortName: coin[0] });
          const searchCoin = await User.findOne({ _wallet:  { $elemMatch: { currency: currencyId._id, exchange: exchangeId } } });
          if (!searchCoin) {
            const addCoin = await User.findByIdAndUpdate(
              userId,
              { $push: { _wallet: [{ currency: currencyId._id, amount: coin[1], exchange: exchangeId._id }], }, }
              );
          } else {
            // TODO: Update amount
            // const updateAmount = await User.findByIdAndUpdate(
            //   userId,
            //   { $push: { _wallet: [{ currency: currencyId._id, amount: coin[1], exchange: exchangeId._id }], }, }
            // );
          }

        } catch (err) {
          console.error(err);
        }
      });
  } catch (err) {
    console.error(err);
  }
};

// TODO: add multiple exchanges or wallets
module.exports.getBalance = async (req, res) => {
  try {
    // Find API to fetch
    const toFetch = await User.find({ })
      .select('_apiExchange _wallet')
      .populate('_wallet.currency')
      .populate('_wallet.exchange')
      .populate({
        path: '_apiExchange.exchange',
        match: { name: 'Binance' },
        select: '_id name',
      })

    _.forEach(toFetch, (data) => {
      const userId = data._id;
      const apiExchange = _.chain(data._apiExchange)
        .filter('exchange')
        .mapKeys('exchange.name')
        .value();

      if (apiExchange.Binance) {
        const { apiKey, apiSecret } = apiExchange.Binance;
        fetchBalance(apiKey, apiSecret, data._id);
      }

    });

    res.send(toFetch);
    res.status(200);
  } catch (err) {
    console.error(err);
    res.status(400);
  }

};
