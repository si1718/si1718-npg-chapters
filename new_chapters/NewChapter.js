var mongoose = require("mongoose");

var NewChapterSchema = new mongoose.Schema({
    idChapter: {
        type: String,
        required: true,
        unique: true
    },
    book: {
        type: {
            key: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: false
            },
            view: {
                type: String,
                required: false
            },
        },
        required: true
    },
    name: {
        type: String,
        required: true
    },
    researchers: {
        type: [{
            key: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: false
            },
            view: {
                type: String,
                required: false
            },
        }],
        required: true
    },
    pages: {
        type: String,
        required: true
    },
    keywords: {
        type: [String],
        required: false
    },
    viewURL: {
        type: [String],
        required: true
    }
}, { collection: 'chapters_new'});

mongoose.model("NewChapter", NewChapterSchema);

module.exports = mongoose.model("NewChapter");
