const express = require('express');
const mongoose = require('mongoose');

// load keys for DEV or PROD environment
require('dotenv').config();
const keys = require('./config/keys');

// connect to mongodb
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

// initiate app
const app = express();

// all backend routes
// .....

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
