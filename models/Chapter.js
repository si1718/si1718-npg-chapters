var mongoose = require("mongoose");

var ChapterSchema = new mongoose.Schema({
   book: String,
   name: String,
   authors: String,
   pages: String
});

mongoose.model("Chapter", ChapterSchema);

module.exports = mongoose.model("Chapter");
