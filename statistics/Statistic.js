var mongoose = require("mongoose");
var slugify = require("slugify");

var StatisticSchema = new mongoose.Schema({
    keyword: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
}, {
    collection: 'keyword_date_tweets'
});

mongoose.model("Statistic", StatisticSchema);

module.exports = mongoose.model("Statistic");
