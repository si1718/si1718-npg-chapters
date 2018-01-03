var express = require("express");
var bodyParser = require("body-parser");

var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

var Recommendation = require('./Recommendation');

router.get('', (req, res) => {
    
    Recommendation.find((error, recommendations) => {

        if (error) {

            console.error("ERROR: Error getting recommendations from database");
            return res.status(500).send("There was a problem finding recommendations.");

        } else {
            
            return res.status(200).send(recommendations);
        }
    });
});

router.get('/:key', (req, res) => {

    let key = req.params.key;

    if (!key) {
        
        return res.status(400).send("Please indicate to /recommendations/:key param");

    } else {

        Recommendation.findOne({ "key": key }, (error, recommendation) => {

            if (error) {

                console.error("ERROR: Error getting recommendations from database");
                return res.status(500).send("There was a problem finding the recommendation.");

            } else {

                if (recommendation) {

                    return res.status(200).send(recommendation);

                } else {

                    return res.status(404).send("No recommendation found with key: " + key);
                }
            }
        });
    }
});

module.exports = router;
