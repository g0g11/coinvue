const CronJob = require('cron').CronJob;
const axios = require('axios');
const keys = require('../config/keys');

// access api to fetch all coins
const fetchCoins = new CronJob('00 */1 * * * *', async () => {
  await axios.get(`http://${process.env.HOSTNAME}:${process.env.PORT}/api/cron/coin/all`);
});

// initialize CronJob
fetchCoins.start();

