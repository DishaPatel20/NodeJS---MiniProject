// use of 3 three core modules:-
const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = "localhost";
const port = 3000;

// creating a server

// this request(req) already has so many powers with it. 
// 1st power is whatever incoming request is coming we can find from which url its coming.
// 
const server = http.createServer((req, res) => {

// who ever is requesting to the server thier data will be shown by :-
	// console.log(req.headers);

	console.log('request for ' + req.url + 'by method ' +  req.method);

// how to open index.html for a particular url :-
	if(req.method == 'GET'){
		var fileURL;
		if(req.url == '/'){
			fileURL = "/index.html"
		}else{ fileURL = req.url }

// to give proper path :-
		var filePath = path.resolve('./public'+fileURL);

// to check the extension of the file :-
		const fileExt = path.extname(filePath);

		if (fileExt == '.html') {
			fs.exists(filePath, (exists) => {
				if(!exists){
					res.statusCode = 404;
					res.setHeader('Content-Type', 'text/html');
					res.end('<html> <body> <h1> ERROR 404:'+ fileURL+' does not exists </h1> </body> </html>');

				}

				res.statusCode = 200;
				res.setHeader('Content-Type', 'text/html');
				fs.createReadStream(filePath).pipe(res);

			})
		} else {
			res.statusCode = 404;
			res.setHeader('Content-Type', 'text/html');
			res.end('<html> <body> <h1> ERROR 404:'+ fileURL+' not a HTML file </h1> </body> </html>');

		}	

	}else{
		res.statusCode = 404;
		res.setHeader('Content-Type', 'text/html');
		res.end('<html> <body> <h1> ERROR 404:'+ fileURL+' not supported. </h1> </body> </html>');

	}

	
});

// to CALL THE SERVER
server.listen(port, hostname, ()=>{
	console.log(`server running at http://${hostname}:${port}`);
});