var express = require("express");
var db = require("./db");
var bodyParser = require("body-parser");
var helmet = require("helmet");

var app = express();
var baseURL = "/api/v1";

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(helmet());

var ChapterController = require("./controllers/ChapterController");
app.use(baseURL + "/chapters", ChapterController);

module.exports = app;
