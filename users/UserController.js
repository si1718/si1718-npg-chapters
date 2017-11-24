var express = require("express");
var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');
var config = require("config-yml");
var bcrypt = require('bcrypt');

var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

var User = require("./User");

// GET method to get all users saved in the database.
router.get("/", (req, res) => {
    
    var query = {};

    for (var key in req.query) {
        if (req.query.hasOwnProperty(key)) {
            query[key] = { $regex: '.*' + req.query[key] + '.*', $options: 'i' };
        }
    }

    User.find(query, (error, users) => {

        if (error) {

            console.error("ERROR: Error getting chapters from database");
            return res.status(500).send("There was a problem finding users.");

        } else {
            return res.status(200).send(users);
        }
    });
});

// POST method to authenticate a user
router.post('/authenticate', (req, res) => {
    
    let body = req.body;

    if (!body) {

        console.warn("WARNING: Body data not found.");
        return res.status(400).send("Please, indicate data to authenticate a user");

    } else {

        if (!body.email || !body.password) {

            console.warn("WARNING: The body to authenticate " + JSON.stringify(body, 2, null) + " is not well-formed.");
            return res.status(422).send("Please, indicate correct data to authenticate user");

        } else {

            User.findOne({ email: body.email }, (error, user) => {

                if (error) {

                    console.error("ERROR: Error getting user from database");
                    return res.status(500).send("There was a problem finding the user.");

                } else {

                    if (user) {

                        if(bcrypt.compareSync(req.body.password, user.password)) {
                            
                            return res.status(400).send("Authentication failed. Wrong password.");
                            
                        } else {
                            
                            const payload = {
                                email: user.email,
                                name: user.name
                            };
                            
                            var token = jwt.sign(payload, config.app.salt, {
                                expiresIn: '100d'
                            });
                            
                            return res.status(200).send({
                                message: "Authentication successfully",
                                token: token
                            });
                        }

                    } else {
                        
                        return res.status(404).send("The indicated user hasn't registered in database.");
                    }
                }
            });
        }
    }
});

// POST method to register a new user
router.post("/", (req, res) => {

    let body = req.body;

    if (!body) {

        console.warn("WARNING: Body data not found.");
        return res.status(400).send("Please, indicate data to create a new user");

    } else {

        if (!body.email || !body.name || !body.password) {

            console.warn("WARNING: The body to new user " + JSON.stringify(body, 2, null) + " is not well-formed.");
            return res.status(422).send("Please, indicate correct data to create a new user");

        } else {

            User.findOne({ "email": body.email }, (error, user) => {

                if (error) {

                    console.error("ERROR: Error getting chapters from database");
                    return res.status(500).send("There was a problem finding the user.");

                } else {

                    if (user) {

                        console.warn("WARNING: The indicated user " + JSON.stringify(body, 2, null) + " already exists");
                        return res.status(409).send("The indicated user already exists.");

                    } else {
                        
                        var salt = bcrypt.genSaltSync(config.app.saltRounds);
                        var hash = bcrypt.hashSync(body.password, salt);
                        body.password = hash;

                        User.create(body, (error, user) => {

                            if (error) {

                                console.error("ERROR: Cannot save a new user because: " + error);
                                return res.status(500).send("There was a problem adding the information to the database.");

                            } else {
                                return res.status(201).send(user);
                            }
                        });
                    }
                }
            });
        }
    }
});

module.exports = router;
