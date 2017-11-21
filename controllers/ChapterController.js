var express = require("express");
var bodyParser = require("body-parser");

var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

var Chapter = require("../models/Chapter");

// GET ALL
router.get("/", (req, res) => {
    
    console.info("INFO: New GET request to " + req.originalUrl);
    
    Chapter.find({}, (error, chapters) => {
        
        if(error) {
            console.error("ERROR: Error getting chapters from database");
            return res.status(500).send("There was a problem finding chapters.");
        } else {
            res.status(200).send(chapters);
        }
    });
});

// GET SPECIFIC
router.get("/:idChapter", (req, res) => {
    
    console.info("INFO: GET request to " + req.originalUrl);
    
    let idChapter = req.params.idChapter;
    
    if(!idChapter) {
        
        console.warn("WARNING: GET request to " + req.originalUrl + " without idChapter");
        res.status(400).send("Please indicate to /chapters/:idChapter param");
        
    } else {
        
        Chapter.findOne({"idChapter" : idChapter}, (error, chapter) => {
        
            if(error) {
                console.error("ERROR: Error getting chapters from database");
                return res.status(500).send("There was a problem finding the chapter.");
            }
            
            if(!chapter) {
                return res.status(404).send("No chapter found with idChapter: " + idChapter);
            }
            
            res.status(200).send(chapter);
        });
    }

});

// POST SPECIFIC
router.post("/", (req, res) => {
    
    console.info("INFO: POST request to " + req.originalUrl);
    
    let body = req.body;
    
    if(!body) {
        
        console.warn("WARNING: Body data not found.");
        res.status(400).send("Please, indicate data to create a new chapter");
        
    } else {
        
        if(!body.book || !body.name || !body.pages || !body.researchers || !body.researchersName) {
            
            console.warn("WARNING: The body to new chapter " + JSON.stringify(body, 2, null) + " is not well-formed.");
            res.status(422).send("Please, indicate correct data to create a new chapter");
            
        } else {
            
            Chapter.create({
                idChapter: Chapter.generateChapterId(body.book, body.name, body.researchers),
                book: body.book,
                name: body.name,
                pages: body.pages,
                researchers: body.researchers,
                researchersName: body.researchersName
            }, (error, chapter) => {
                
                if(error) {
                    console.error("ERROR: Cannot save a new chapter because: " + error);
                    return res.status(500).send("There was a problem adding the information to the database.");
                } else {
                    res.status(201).send(chapter);
                }
            });
        }
    }

});

// PUT SPECIFIC
router.put("/:idChapter", (req, res) => {
    
    console.info("INFO: PUT request to: " + req.originalUrl);
    
    let idChapter = req.params.idChapter;
    
    if(!idChapter) {
        
        console.warn("WARNING: PUT request to " + req.originalUrl + " without idChapter");
        res.status(400).send("Please indicate to /chapters/:idChapter param");
        
    } else {
        
        let body = req.body;
        
        // body.idChapter = Chapter.generateChapterId("1234", "Demo", ["0000-0001-5217-865"].toString());
        
        Chapter.findOneAndUpdate({"idChapter" : idChapter}, body, {new: true}, (error, chapter) => {
            
            if(error) {
                
                console.error("ERROR: Cannot updated chapter from database because: " + error);
                res.status(500).send("Sorry, cannot do this operation.");
                
            } else {
                
                res.status(200).send(chapter);
            }
        });
    }
});

// DELETE ALL
router.delete('/', (req, res) => {
    
    console.info("INFO: DELETE request to: " + req.originalUrl);
    
    Chapter.deleteMany({}, (error, chapter) => {
        
        if(error) {
            console.error("ERROR: Cannot delete data from database.");
            return res.status(500).send("There was a problem deleting chapters.");
        }
        
        res.status(200).send("All chapters removed succesfully.");
    });

});

// DELETE SPECIFIC
router.delete("/:idChapter", (req, res) => {
    
    console.info("INFO: DELETE request to: " + req.originalUrl);
    
    let idChapter = req.params.idChapter;
    
    if(!idChapter) {
        
        console.warn("WARNING: DELETE request to " + req.originalUrl + " without idChapter");
        res.status(400).send("Please indicate to /chapters/:idChapter param");
        
    } else {
        
        Chapter.deleteOne({"idChapter" : idChapter}, (error, chapter) => {
            
            if(error) {
                
                console.error("ERROR: Cannot removed chapter from database because: " + error);
                res.status(500).send("Sorry, cannot do this operation.");
                
            } else {
                
                res.status(200).send("Chapter deleted successfully.");
            }
        });
    }
    
});

module.exports = router;
