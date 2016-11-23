//Lets require/import the HTTP module
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

var mimeTypes = {
	"jpg": "image/jpeg",
	"png": "image/png",
	"js": "text/javascript",
	"css": "text/css",
	"json": "application/json"
};

//print the version
var ver = "v1.0.0";
console.log("test-server " + ver);

//Lets define a port we want to listen to
const PORT = 8088;

//We need a function which handles requests and send response
function handleRequest(req, res){
	var uri = url.parse(req.url).pathname;
	console.log("URI: " + uri);
	var file = true;
	// requests
	if (uri.split("/")[uri.split("/").length - 1].split(".").length === 1) {
		file = false;
	}
	
	console.log(file);
	var filename = path.join(process.cwd(), "www", uri);
	if (!file) {filename += "/index.html"}
	fs.stat(filename, function(err, stat) {
		if(err === null) {
			var mimeType = mimeTypes[path.extname(filename).split(".")[path.extname(filename).split(".").length]];
			res.writeHead(200, mimeType);
			var fileStream = fs.createReadStream(filename);
			fileStream.pipe(res);
		} else if(err.code == 'ENOENT') {
			console.log("File does not exist: " + filename);
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.write('404 Not Found\n');
			res.end();
			return;
		} else {
			console.log('Error: ', err.code);
		}
	});
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
	//Callback triggered when server is successfully listening. Hurray!
	console.log("Server listening on port " + PORT);
});
