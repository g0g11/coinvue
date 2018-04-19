const CronJob = require('cron').CronJob;
const axios = require('axios');
const keys = require('../config/keys');

// access api to fetch all coins
const fetchCoins = new CronJob('00 */5 * * * *', async () => {
  await axios.get(`http://${process.env.HOSTNAME}:${process.env.PORT}/api/cron/currency/all`);
  await axios.get(`http://${process.env.HOSTNAME}:${process.env.PORT}/api/cron/currency/prices`);
  await axios.get(`http://${process.env.HOSTNAME}:${process.env.PORT}/api/cron/exchanges/all`);
});

// initialize CronJob
fetchCoins.start();

