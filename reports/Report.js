var mongoose = require("mongoose");

var ReportSchema = new mongoose.Schema({
    keyword: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: false
    },
    count: {
        type: Number,
        required: false
    },
    chapters: {
        type: Number,
        required: false
    },
    researchers: {
        type: Number,
        required: false
    },
    year: {
        type: Number,
        required: false
    },
    type: {
        type: String,
        required: true
    }
});

mongoose.model("Report", ReportSchema);

module.exports = mongoose.model("Report");
