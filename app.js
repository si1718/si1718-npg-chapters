/* global __dirname */

var express = require("express");
var db = require("./db");
var bodyParser = require("body-parser");
var helmet = require("helmet");
var path = require("path");
var jwt = require('express-jwt');
var morgan = require("morgan");
var config = require("config-yml");

var app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("dev"));

app.use(jwt({
    secret: config.app.secret,
}).unless({ path: ['/api/v1/*'] }));

var ChapterController = require("./chapters/ChapterController");
app.use("/api/v1/chapters", ChapterController);
app.use("/api/v1.1/chapters", ChapterController);

var UserController = require("./users/UserController");
app.use("/api/v1.1/users", UserController);

module.exports = app;
