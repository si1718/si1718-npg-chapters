var mongoose = require("mongoose");
var slugify = require("slugify");

var ChapterSchema = new mongoose.Schema({
   idChapter: {
       type: String,
       required: true,
       unique: true
   },
   book: {
       type: String,
       required: true
   },
   name: {
       type: String,
       required: true
   },
   researchersName: {
       type: [String],
       required: true
   },
   researchers: {
       type: [String],
       required: true
   },
   pages: {
       type: String,
       required: true
   }
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
