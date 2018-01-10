var express = require("express");
var bodyParser = require("body-parser");

var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

var Report = require("./Report");

// GET method to get all daily reports from database
router.get('/daily', (req, res) => {

    Report.find({ 'type': 'daily_report' }).exec((error, reports) => {

        if (error) {

            console.error("ERROR: Error getting reports from database");
            return res.status(500).send("There was a problem finding reports.");

        } else {
            return res.status(200).send(reports);
        }
    });
});

// GET method to get all monthly reports from database
router.get('/monthly', (req, res) => {

    Report.find({ 'type': 'monthly_report' }).exec((error, reports) => {

        if (error) {

            console.error("ERROR: Error getting reports from database");
            return res.status(500).send("There was a problem finding reports.");

        } else {
            return res.status(200).send(reports);
        }
    });
});

// GET method to get all researchers per year reports from database
router.get('/researchers-per-year', (req, res) => {

    Report.find({ 'type': 'researchers_per_year' }).exec((error, reports) => {

        if (error) {

            console.error("ERROR: Error getting reports from database");
            return res.status(500).send("There was a problem finding reports.");

        } else {
            return res.status(200).send(reports);
        }
    });
});

// GET method to get all researchers per chapter reports from database
router.get('/researchers-per-chapter', (req, res) => {

    Report.find({ 'type': 'researchers_per_chapter' }).exec((error, reports) => {

        if (error) {

            console.error("ERROR: Error getting reports from database");
            return res.status(500).send("There was a problem finding reports.");

        } else {
            return res.status(200).send(reports);
        }
    });
});

module.exports = router;
