var mongoose = require("mongoose");
var config = require("config-yml");

mongoose.connect(config.db.url, { useMongoClient: true }, (error) => {
    
    if(error) {
        console.error("ERROR: Cannot connect to database because: " + error);
    } else {
        console.info("INFO: Database connection succesfully.");
    }

});