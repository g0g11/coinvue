const express = require('express'),
  morgan = require('morgan');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

// mongoose models
require('./models/Coin');
require('./models/User');
require('./models/Exchange');

// authentication services
require('./services/passport');

// CronJobs
require('./services/cronjobs');

// load keys for DEV or PROD environment
require('dotenv').config();
const keys = require('./config/keys');

// connect to mongodb
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

// initialize express app
const app = express();

// Middleware
app.use(bodyParser.json());

// set cookie settings
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

// Express Logger Middleware
app.use(morgan('dev', {
  skip: function (req, res) {
    return res.statusCode < 400
  }, stream: process.stderr
}));

app.use(morgan('dev', {
  skip: function (req, res) {
    return res.statusCode >= 400
  }, stream: process.stdout
}));

// authentication provider
app.use(passport.initialize());
app.use(passport.session());

// Authentication Routes
require('./routes/routes')(app);

// client public folder
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// server running process
const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${ENV} mode!`);
});
