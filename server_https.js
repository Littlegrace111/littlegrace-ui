var app = require("express")();
var fs = require("fs");
var http = require("http");
var https = require("https");

var privateKey = fs.readFileSync("./ca/private.pem", "utf8");
var certificate = fs.readFileSync("./ca/csr.pem", "utf8");
var credentials = { key: privateKey, cert: certificate };

var httpServer = http.createServer(app);
var httpsServer = http.createServer(credentials, app);
var PORT = 8000;
var SSLPORT = 8001;

httpServer.listen(PORT, function () {
	console.log("HTTP Server is running on: http://localhost:%s", PORT);
});

httpsServer.listen(SSLPORT, function () {
	console.log("HTTPS Server is running on: https://localhost:%s", SSLPORT);
});

app.get('/', function(req, res) {
    
})
