var mongoose = require("mongoose");
var slugify = require("slugify");

var ChapterSchema = new mongoose.Schema({
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
});

mongoose.model("Chapter", ChapterSchema);

module.exports = mongoose.model("Chapter");
module.exports.generateChapterId = function(book, name, researchers) {
    
    var researchersKeys = [];
    
    for(var i = 0; i < researchers.length; i++) {
        researchersKeys.push(researchers[i].key);
    }
    
    return slugify(book.key + name + researchersKeys.toString(), {
        replacement: '-',
        remove: null,
        lower: true
    });
};
