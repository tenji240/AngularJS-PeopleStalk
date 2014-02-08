var http = require("http");

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(8888);
//open browser and go to http://localhost:8888

//begin i/o
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter the letter grade you want in this class:  ", function(answer) {
	console.log("Okay, expect an", answer, "at the end of the semester :)");
  rl.close();
});