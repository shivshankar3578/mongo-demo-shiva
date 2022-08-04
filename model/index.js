
const mongoose = require('mongoose');

mongoose.connect(process.env.mongo_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set('debug', true);

const cacheModel = require("./cache");

module.exports = { cacheModel };