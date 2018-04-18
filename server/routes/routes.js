const authGoogleController = require('../controllers/auth.google.controller');
const authGeneralController = require('../controllers/auth.general.controller');
const coinCryptoCompareController = require('../controllers/coin.cryptocompare.controller');
const coinController = require('../controllers/coin.controller');

const passport = require('passport');

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
  app.get('/api/auth/current_user', authGeneralController.myProfile);

  // cron for fetching all crypto currencies
  app.get('/api/cron/coin/all', coinCryptoCompareController.fetchAll);
  app.get('/api/cron/coin/prices', coinCryptoCompareController.fetchPrices);

  // fetch all coins from own database
  app.get('/api/public/coin/all', coinController.listAll);
};
