var mongoose = require("mongoose");

var mdbURL =  "mongodb://pozas91:pozas91@ds149865.mlab.com:49865/si1718-npg-chapters";

mongoose.connect(mdbURL, {
    useMongoClient: true
});