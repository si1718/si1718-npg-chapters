var app = require("./app");
var port = process.env.PORT || 10000;

var server = app.listen(port, () => {
    console.log("Express server listening on port " + port);
});