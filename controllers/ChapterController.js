var express = require("express");
var bodyParser = require("body-parser");

var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

var Chapter = require("../models/Chapter");

router.get("/", function(req, res) {
    
    Chapter.find({}, function(err, chapters) {
        
        if(err) {
            return res.status(500).send("There was a problem finding the chapters.");
        } else {
            res.status(200).send(chapters);
        }
    });
});

router.get("/:id", function(req, res) {
    
    Chapter.findById(req.params.id, function(err, chapter) {
        
        if(err) {
            return res.status(500).send("There was a problem finding the chapter.");
        }
        
        if(!chapter) {
            return res.status(404).send("No chapter found.");
        }
        
        res.status(200).send(chapter);
    });
});

router.post("/", function(req, res) {
    
    Chapter.create({
        book: req.body.book,
        name: req.body.name,
        authors: req.body.authors,
        pages: req.body.pages
        
    }, function(err, contact) {
        
        if(err) {
            return res.status(500).send("There was a problea adding the information to the database.");
        } else {
            res.status(200).send(contact);
        }
    });
});

router.put("/:id", function(req, res) {
    
    Chapter.findByIdAndUpdate(req.params.id, req.body, function(err, chapter) {
        
        if(err) {
            return res.status(500).send("There was a problem updating the chapter.");
        }
        
        res.status(200).send(chapter);
    });
});

router.delete("/:id", function(req, res) {
    
    Chapter.findByIdAndRemove(req.params.id, function(err, chapter) {
        
        if(err) {
            return res.status(500).send("There was a problem deleting the chapter.");
        }
        
        res.status(200).send("Chapter " + chapter.name + " was deleted.");
    });
});

module.exports = router;
