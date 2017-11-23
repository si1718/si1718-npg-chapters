/* global __dirname */

var express = require("express");
var db = require("./db");
var bodyParser = require("body-parser");
var helmet = require("helmet");
var path = require("path");

var app = express();
var baseURL = "/api/v1";

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(helmet());

var ChapterController = require("./chapters/ChapterController");
app.use(baseURL + "/chapters", ChapterController);

module.exports = app;
