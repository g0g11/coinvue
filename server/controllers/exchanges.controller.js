const mongoose = require('mongoose');

// mongodb models
const Exchange = mongoose.model('exchanges');

// Public: List all Exchanges
module.exports.listAll = async (req, res) => {
  try {
    const exchanges = await Exchange.find({});
    res.send(exchanges);
    res.status(200);
  } catch (err) {
    console.error(err);
    res.status(400);
  }
};
