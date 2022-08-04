const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const cacheSchema = new Schema({
    key: {
        type: String,
        required: true,

    },
    createdAt: {
        type: Date,
        index: true,
        default: Date.now(),
        expires: 10 //document expires at expireAt + 10 seconds
    },
    value: {
        type: String,
        required: true,
    },
});


module.exports = mongoose.model('Cache', cacheSchema)
