var express = require("express");
var bodyParser = require("body-parser");

var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

var NewChapter = require('./NewChapter');

router.get('', (req, res) => {
    
    NewChapter.find((error, newsChapters) => {

        if (error) {

            console.error("ERROR: Error getting news chapters from database");
            return res.status(500).send("There was a problem finding news chapters.");

        } else {
            
            return res.status(200).send(newsChapters);
        }
    });
});

router.get('/stats', (req, res) => {
    
    NewChapter.count((error, count) => {
                
        if(error) {
            
            console.error("ERROR: Error getting news chapters from database");
            return res.status(500).send("There was a problem finding news chapters.");
            
        } else {
            
            return res.status(200).send({
                total: count
            });
        }
        
    });
});

// DELETE method to delete specific chapter in the database.
router.delete('/:idChapter', (req, res) => {

    let idChapter = req.params.idChapter;

    if (!idChapter) {

        console.warn("WARNING: DELETE request to " + req.originalUrl + " without idChapter");
        return res.status(400).send("Please indicate to /new-chapters/:idChapter param");

    } else {

        NewChapter.deleteOne({ "idChapter": idChapter }, (error, chapter) => {

            if (error) {

                console.error("ERROR: Cannot removed new chapter from database because: " + error);
                return res.status(500).send("Sorry, cannot do this operation.");

            } else {

                if (chapter) {

                    return res.status(200).send("New chapter deleted successfully.");

                } else {

                    return res.status(404).send("New chapter not found.");
                }
            }
        });
    }

});


module.exports = router;
