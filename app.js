var PORT = 8000;
var http = require('http')
var url = require('url')
var fs = require('fs')

var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname

    // response.write(pathname)
    // response.end()
})

server.listen(PORT)
console.log('Server running at port: ' + PORT)

