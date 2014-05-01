/*
    Node JS Server Side Javascript Handler
    Author: Tenji Tembo
    Class: CMSC 448/445
    Project: 1
    
    This code is repsonsible for handling all POST requests
    and AJAX calls received from the webpage, pulling the 
    information from the database, and returing the data back.
    
    NOTE: PLEASE SEE README.md FIRST before executing!!
*/

//Declarations
var http = require('http');
var fs = require('fs');
var path = require('path');
var mongo = require("mongoskin");
global.mongo = mongo;
var db = mongo.db("mongodb://localhost:27017/data", {native_parser:true});
db.bind('people');
var cache = [];

//Server Declaration - Server will hand all POST Requests
var server = http.createServer(function (request, response) {
    console.log('request starting...');
	
    //determine path to site    
	var filePath = '.' + request.url;
	if (filePath == './')
		filePath = './index.html';
		
	var extname = path.extname(filePath);
	var contentType = 'text/html';
    
    //set up context
	switch (extname) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
	}
    
    //Check AJAX Post Request
	if(request.method == "POST") {
        var body = '';
        var msg = '';
        
        //Begin AJAX Parse
        request.on('data', function(data) {

                body+= data;
                json_body = JSON.parse(body);

                //Insert to Database
                if(json_body.option == "insert") {
                   msg = "Successfully Inserted Into Database";
                    insertDB(json_body);
                }

                //Remove from Database
                else if(json_body.option == "remove") {
                   msg = "Successfully Removed From Database";
                   removeDB(json_body);
                } 
            
                //display element from database
                else if (json_body.option == "search"){

                    for(var data = 0; data < cache.length; data++) {

                       var test = cache[data];
                        var s = [];

                        if (test.name == json_body.name){
                            s.push(test);
                            msg = "{\"data\": " + JSON.stringify(s) + "}";
                        }
                    }
                } 
                
                //Parse Data from call
                else{
                    showDB();
                    msg = "{\"data\": " + JSON.stringify(cache) + "}";
                }
            });
        
        //write data to sever request
        request.on('end', function() {
           response.write(msg);
           response.end();
       });
    }
    
    //return the server request back to client side
	path.exists(filePath, function(exists) {
	
		if (exists) {
			fs.readFile(filePath, function(error, content) {
				if (error) {
					response.writeHead(500);
					response.end();
				}
				else {
					response.writeHead(200, { 'Content-Type': contentType });
					response.end(content, 'utf-8');
				}
			});
		}
		else {
			response.writeHead(404);
			response.end();
		}
	});
	
}).listen(8888);

console.log('Server running at http://127.0.0.1:8888/');

//Add JSON document to database
function insertDB(json) {
        delete(json['option']);
        cache.push(json);
        //console.log(cache);
    
        db.people.insert(json,function(err,result){
            if(err) throw err;
            if(result) console.log("SUCCESSFULLY ADDED: " + json.name);
        });
    console_showDB();
    
}

//Remove JSON document from database
function removeDB(json){
    remove_Arr = [];
    delete(json['option']);
    
    for(var data = 0; data < cache.length; data++){
       if (cache[data].name != json.name){
           remove_Arr.push(cache[data]);
       }   
    }
    
    cache = remove_Arr;
    
    db.people.remove(json, function(err,result){
         if(err) throw err;
         if(result) console.log("SUCCESSFULLY REMOVED: " + json.name);
     });
}


//Debuggin Purposes
function console_showDB(){
     db.people.find().toArray(function (err, items){});
}

//Debugging
function showDB() {
  return db.people.find();
}

//Parse JSON data
function grabData(err, result) {
    msg = "{\"data\":";
    msg += result;
    msg += "}";
}

