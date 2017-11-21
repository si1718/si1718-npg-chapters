var mongoose = require("mongoose");
var slugify = require("slugify");

var ChapterSchema = new mongoose.Schema({
   idChapter: String,
   book: String,
   name: String,
   researchersName: [String],
   researchers: [String],
   pages: String
});

mongoose.model("Chapter", ChapterSchema);

module.exports = mongoose.model("Chapter");
module.exports.generateChapterId = function(book, name, researchers) {
    return slugify(book + name + researchers.toString(), {
        replacement: '-',
        remove: null,
        lower: true
    });
};
