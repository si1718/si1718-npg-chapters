var mongoose = require("mongoose");

var ReportSchema = new mongoose.Schema({
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
    },
    type: {
        type: String,
        required: true
    }
});

mongoose.model("Report", ReportSchema);

module.exports = mongoose.model("Report");
