var express = require("express");
var bodyParser = require("body-parser");

var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

var Statistic = require("./Statistic");

// GET method to get all chapters saved in the database.
router.get("/", (req, res) => {

    Statistic.find((error, statistics) => {

        if (error) {

            console.error("ERROR: Error getting statistics from database");
            return res.status(500).send("There was a problem finding statistics.");

        } else {
            return res.status(200).send(statistics);
        }
    });
});

module.exports = router;
