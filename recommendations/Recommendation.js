var mongoose = require("mongoose");

var RecommendationSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    recommendations: {
        type: [String],
        required: true
    }
});

mongoose.model("Recommendation", RecommendationSchema);

module.exports = mongoose.model("Recommendation");
