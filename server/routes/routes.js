const authGoogleController = require('../controllers/auth.google.controller');
const authGeneralController = require('../controllers/auth.general.controller');
const coinCryptoCompareController = require('../controllers/coin.cryptocompare.controller');
const coinController = require('../controllers/coin.controller');
const coinCcxtController = require('../controllers/coin.ccxt.controller');

const passport = require('passport');

// TODO: Route to update/edit coin
module.exports = (app) => {
  // Google Authentication Service
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
  }));
  app.get('/auth/google/callback', passport.authenticate('google'),
    authGoogleController.callback);

  // api logout and redirect to main route
  app.get('/api/auth/logout', authGeneralController.logout);

  // api current logged in user
  app.get('/api/auth/user', authGeneralController.myProfile);

  // cron for fetching all crypto currencies
  app.get('/api/cron/currency/all', coinCryptoCompareController.fetchAll);
  app.get('/api/cron/currency/prices', coinCryptoCompareController.fetchPrices);
  // app.get('/api/')

  // cron for fetching all exchanges
  app.get('/api/cron/exchanges/all', coinCryptoCompareController.exchangeList);

  // fetch all coins from own database
  app.get('/api/currency/all', coinController.listAll);

  // list my coin portfolio
  app.get('/api/wallet/all', coinController.listMyCoins);

  // add new coins to portfolio
  app.post('/api/wallet/add', coinController.addCoin);

  // add api key of exchange or wallet
  app.post('/api/wallet/api', coinController.addApi);

  // delete coin from portfolio
  app.delete('/api/wallet/remove', coinController.deleteCoin);

  // add exchange / wallets to fetch automatically
  app.get('/api/wallet/getBalance', coinCcxtController.getBalance);
};
