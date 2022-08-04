const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');
const marked = require('marked');

const CacheModel = mongoose.model("Cache");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send(marked(fs.readFileSync(process.cwd() + "/readme.md").toString()));
});

router.get('/cache', async function (req, res, next) {
  try {
    const { key } = req.query
    const val = await CacheModel.findOne({ key: key })
    if (!val) {
      const newCache = await CacheModel.create({ key: key, value: key })
      return res.json({ ...newCache.toJSON(), debug: 'Cache miss' })
    }
    return res.json({ ...val.toJSON(), debug: 'Cache hit' })

  } catch (err) {
    next(err)
  }

})
module.exports = router;
