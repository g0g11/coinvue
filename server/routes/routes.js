const authGoogleController = require('../controllers/auth.google.controller');
const authGeneralController = require('../controllers/auth.general.controller');
const passport = require('passport');

module.exports = (app) => {
  // Google Authentication Service
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
  }));
  app.get('/auth/google/callback', passport.authenticate('google'),
    authGoogleController.callback);

  // api logout and redirect to main route
  app.get('/api/logout', authGeneralController.logout);

  // api current logged in user
  app.get('/api/current_user', authGeneralController.myProfile);
};
