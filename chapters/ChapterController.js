var express = require("express");
var bodyParser = require("body-parser");

var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

var Chapter = require("./Chapter");

// GET method to get all chapters saved in the database.
router.get("/", (req, res) => {
    
    var logic = [];
    
    if(req.query.hasOwnProperty('name')) {
        
        var name = {
            $or: [
                {'name': {$regex: '.*' + req.query['name'] + '.*', $options: 'i'}}
            ]
        };
        
        logic.push(name);
    }
    
    if(req.query.hasOwnProperty('pages')) {
        
        var pages = {
            $or: [
                {'pages': {$regex: '.*' + req.query['pages'] + '.*', $options: 'i'}}
            ]
        };
        
        logic.push(pages);
    }
    
    if(req.query.hasOwnProperty('book')) {
        
        var book = {
            $or: [
                {'book.key': {$regex: '.*' + req.query['book'] + '.*', $options: 'i'}},
                {'book.title': { $regex: '.*' + req.query['book'] + '.*', $options: 'i' }},
                {'book.view': { $regex: '.*' + req.query['book'] + '.*', $options: 'i' }}
            ]
        };
        
        logic.push(book);
    }
    
    if(req.query.hasOwnProperty('researchers')) {
        
        var researchers = {
            $or: [
                {'researchers.key': { $regex: '.*' + req.query['researchers'] + '.*', $options: 'i' }},
                {'researchers.name': { $regex: '.*' + req.query['researchers'] + '.*', $options: 'i' }},
                {'researchers.view': { $regex: '.*' + req.query['researchers'] + '.*', $options: 'i' }}
            ]
        };
        
        logic.push(researchers);
    }
    
    var query = (logic.length > 0) ? {$and: logic} : {};
    
    var skip = (req.query.skip) ? parseInt(req.query.skip, 10) : null;
    var limit = (req.query.limit) ? parseInt(req.query.limit, 10) : null;

    Chapter.find(query, null, {skip: skip, limit: limit, order: "name"}, (error, chapters) => {

        if (error) {

            console.error("ERROR: Error getting chapters from database");
            return res.status(500).send("There was a problem finding chapters.");

        } else {
            
            return res.status(200).send(chapters);
        }
    });
});

// GET method to get stats of chapters
router.get("/stats", (req, res) => {
    
    var logic = [];
    
    if(req.query.hasOwnProperty('name')) {
        
        var name = {
            $or: [
                {'name': {$regex: '.*' + req.query['name'] + '.*', $options: 'i'}}
            ]
        };
        
        logic.push(name);
    }
    
    if(req.query.hasOwnProperty('pages')) {
        
        var pages = {
            $or: [
                {'pages': {$regex: '.*' + req.query['pages'] + '.*', $options: 'i'}}
            ]
        };
        
        logic.push(pages);
    }
    
    if(req.query.hasOwnProperty('book')) {
        
        var book = {
            $or: [
                {'book.key': {$regex: '.*' + req.query['book'] + '.*', $options: 'i'}},
                {'book.title': { $regex: '.*' + req.query['book'] + '.*', $options: 'i' }},
                {'book.view': { $regex: '.*' + req.query['book'] + '.*', $options: 'i' }}
            ]
        };
        
        logic.push(book);
    }
    
    if(req.query.hasOwnProperty('researchers')) {
        
        var researchers = {
            $or: [
                {'researchers.key': { $regex: '.*' + req.query['researchers'] + '.*', $options: 'i' }},
                {'researchers.name': { $regex: '.*' + req.query['researchers'] + '.*', $options: 'i' }},
                {'researchers.view': { $regex: '.*' + req.query['researchers'] + '.*', $options: 'i' }}
            ]
        };
        
        logic.push(researchers);
    }
    
    var query = (logic.length > 0) ? {$and: logic} : {};

    Chapter.count(query, (error, count) => {
                
        if(error) {
            
            console.error("ERROR: Error getting chapters from database");
            return res.status(500).send("There was a problem finding chapters.");
            
        } else {
            
            return res.status(200).send({
                total: count
            });
        }
        
    });
});

router.get('/graph', (req, res) => {
    
    var graph = {};
    
    var aggregation = [
        {
            $project : {
                name: {
                    $toUpper: "$_id"
                } , _id: 0
            }
        },
        {
            $sort : {
                name: 1
            }
        }
    ];
    
    Chapter.aggregate(aggregation, function(error, graph) {
        
        if(error) {
            
            console.error("ERROR: Getting chapters from database error by: " + error);
            return res.status(500).send("There was a problem getting graph.");
            
        } else {
            
            return res.status(200).send(graph);
        }
    });
});

// GET method to get chapters with id equals to idChapter.
router.get("/:idChapter", (req, res) => {

    let idChapter = req.params.idChapter;

    if (!idChapter) {
        
        return res.status(400).send("Please indicate to /chapters/:idChapter param");

    } else {

        Chapter.findOne({ "idChapter": idChapter }, (error, chapter) => {

            if (error) {

                console.error("ERROR: Error getting chapters from database");
                return res.status(500).send("There was a problem finding the chapter.");

            } else {

                if (chapter) {

                    return res.status(200).send(chapter);

                } else {

                    return res.status(404).send("No chapter found with idChapter: " + idChapter);
                }
            }
        });
    }
});

// POST method to saved a new indicated chapter.
router.post("/", (req, res) => {

    let body = req.body;

    if (!body) {

        console.warn("WARNING: Body data not found.");
        return res.status(400).send("Please, indicate data to create a new chapter");

    } else {

        if (!body.book || !body.name || !body.pages || !body.researchers) {

            console.warn("WARNING: The body to new chapter " + JSON.stringify(body, 2, null) + " is not well-formed.");
            return res.status(422).send("Please, indicate correct data to create a new chapter");

        } else {

            let idChapter = Chapter.generateChapterId(body.book, body.name, body.researchers);
            body.idChapter = idChapter;
            body.viewURL = 'https://si1718-npg-chapters.herokuapp.com/#!/chapters/' + idChapter + '/edit';
            
            var query = { "idChapter": body.idChapter };

            Chapter.findOne(query, (error, chapter) => {

                if (error) {

                    console.error("ERROR: Error getting chapters from database");
                    return res.status(500).send("There was a problem finding the chapter.");

                } else {

                    if (chapter) {

                        console.warn("WARNING: The indicated chapter " + JSON.stringify(body, 2, null) + " already exists");
                        return res.status(409).send("The indicated chapter already exists.");

                    } else {

                        Chapter.create({
                            idChapter: body.idChapter,
                            book: body.book,
                            name: body.name,
                            pages: body.pages,
                            researchers: body.researchers,
                            viewURL: body.viewURL,
                            keywords: body.keywords
                        }, (error, chapter) => {

                            if (error) {

                                console.error("ERROR: Cannot save a new chapter because: " + error);
                                return res.status(500).send("There was a problem adding the information to the database.");

                            } else {

                                return res.status(201).send(chapter);
                            }
                        });
                    }
                }
            });
        }
    }
});

// POST method to saved a specific chapter.
router.post("/:idChapter", (req, res) => {
    return res.status(405).send("This method isn't allowed.");
});

// PUT method to update a specific chapter.
router.put("/:idChapter", (req, res) => {

    let idChapter = req.params.idChapter;

    if (!idChapter) {

        return res.status(400).send("Please indicate to /chapters/:idChapter param");

    } else {

        let body = req.body;

        Chapter.findOneAndUpdate({ "idChapter": idChapter }, body, { new: true }, (error, chapter) => {

            if (error) {

                console.error("ERROR: Cannot updated chapter from database because: " + error);
                return res.status(500).send("Sorry, cannot do this operation.");

            } else {

                if (chapter) {

                    return res.status(200).send(chapter);

                } else {

                    return res.status(404).send("Chapter " + idChapter + " not found.");
                }
            }
        });
    }
});

// PUT method to update all chapters.
router.put("/", (req, res) => {
    return res.status(405).send("This method isn't allowed.");
});

// DELETE method to delete all chapters saved in the database.
/** router.delete('/', (req, res) => {

    Chapter.deleteMany({}, (error, chapter) => {

        if (error) {

            console.error("ERROR: Cannot delete data from database.");
            return res.status(500).send("There was a problem deleting chapters.");

        } else {

            return res.status(200).send("All chapters removed succesfully.");
        }
    });

}); **/

// DELETE method to delete specific chapter in the database.
router.delete("/:idChapter", (req, res) => {

    let idChapter = req.params.idChapter;

    if (!idChapter) {

        console.warn("WARNING: DELETE request to " + req.originalUrl + " without idChapter");
        return res.status(400).send("Please indicate to /chapters/:idChapter param");

    } else {

        Chapter.deleteOne({ "idChapter": idChapter }, (error, chapter) => {

            if (error) {

                console.error("ERROR: Cannot removed chapter from database because: " + error);
                return res.status(500).send("Sorry, cannot do this operation.");

            } else {

                if (chapter) {

                    return res.status(200).send("Chapter deleted successfully.");

                } else {

                    return res.status(404).send("Chapter not found.");
                }
            }
        });
    }

});

module.exports = router;
