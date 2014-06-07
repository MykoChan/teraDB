var express = require('express'),
    jade = require('jade');

var app = express();

app.set('view-engine', 'jade');

var server = app.listen(8080, function() {
    console.log("Listening on port %d", server.address().port);
});

app.use('/public', express.static(__dirname + '/public'));

app.get("/", function (req, res) {
    res.render("index.jade");
});

app.get("/about", function (req, res) {
    res.render("about.jade");
});

app.get("/contact", function (req, res) {
    res.render("contact.jade");
});


