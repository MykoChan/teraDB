var http = require("http");

http.createServer(function (req, res) {
    req.on("end", function () {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.render('index.html');
    }); 
}).listen(8080);
