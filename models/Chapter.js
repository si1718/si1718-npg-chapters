var mongoose = require("mongoose");

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
