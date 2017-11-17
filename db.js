var mongoose = require("mongoose");

var mdbURL =  "mongodb://pozas91:pozas91@ds149865.mlab.com:49865/si1718-npg-chapters";

mongoose.connect(mdbURL, { useMongoClient: true }, (error) => {
    
    if(error) {
        console.error("ERROR: Cannot connect to database because: " + error);
    } else {
        console.info("INFO: Database connection succesfully.");
    }

});