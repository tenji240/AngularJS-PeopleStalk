var http = require('http');
var fs = require('fs');
var path = require('path');
/*var db = require('mongoskin').db('mongodb://localhost:27017/people'); 
console.info(db);
var collection = db.collection('people');
console.info(collection);*/

var mongo = require("mongoskin");
global.mongo = mongo;
var db = mongo.db("mongodb://localhost:27017/data", {native_parser:true});
db.bind('people');


var server = http.createServer(function (request, response) {
    console.log('request starting...');
	
	var filePath = '.' + request.url;
	if (filePath == './')
		filePath = './admin.html';
		
	var extname = path.extname(filePath);
	var contentType = 'text/html';
	switch (extname) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
	}
	if(request.method == "POST")
    {
        var body = '';
        var msg = '';
        request.on('data', function(data)
                   {
                       body+= data;
                       json_body = JSON.parse(body);
                       if(json_body.option == "insert")
                       {
                           msg = "Successfully Inserted Into Database!!!";
                        insertDB(json_body);
                       }
                       else if(json_body.option == "remove")
                       {
                           msg = "Successfully Removed From Database!!!";
                           removeDB(json_body);
                       }
                       else
                       {
                          msg = showDB();
                       }
                   });
        request.on('end', function()
                   {
                       response.write(msg);
                       response.end();
                   });
    }
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

function insertDB(json)
{
        delete(json['option']);
        db.people.insert(json,function(err,result)
                         {
                            if(err) throw err;
                            if(result) console.log("SUCCESSFULLY ADDED: " + json.name);
                         });
    console_showDB();
}
function removeDB(json)
{
    delete(json['option']);
    db.people.remove(json, function(err,result)
                     {
                         if(err) throw err;
                         if(result) console.log("SUCCESSFULLY REMOVED: " + json.name);
                     });
    console_showDB(); 
}
function console_showDB()
{
     db.people.find().toArray(function (err, items){
    console.info(items);
    });
}

function showDB()
{
    json_data = "{\"data\": ";
    var data = db.people.find().toArray(function (err, items)
                                        {
                                            return items;
                                        });
    console.log(data);
    json_data= json_data + data + "}";
    console.log(json_data);
    return json_data;
}

//db.people.insert({name:"Tenji", email:"tembot@go.com", phone:"202442221", photo:"http://google.com"}, function (err, result) {
//    if(err) throw err;
//    if(result) console.log('Added');
//});

/**db.people.find().toArray(function (err, items){
    console.info(items);
});**/


    //console.log(name);
    //alert({name:name, email:email, phone:phone, photo:url});
   /**8 db.people.insert({name:name, email:email, phone:phone, photo:url}, function (err, result) {
        if (err) throw err;
        if (result) alert('Added!');
    });**/

/*
//display all elements
    db.collection.find({}, function(err, result){
        result.each(function(err, person) {
            
            console.log(person);
            
            
            tabBody = document.getElementsByTagName('tbody').item(0);
            
            //a row elements
            row = document.createElement('tr');
            
            //three column elements
            cell_1 = document.createElement('td');
            cell_2 = document.createElement('td');
            cell_3 = document.createElement('td');
    
            //added corresponding elements
            textNode_1 = document.createTextNode(person.name);
            textNode_2 = document.createTextNode(person.email);
            textNode_3 = document.createTextNode(person.phone);
            
             //attached the information to the cells
            cell_1.appendChild(textNode_1);
            cell_2.appendChild(textNode_2);
            cell_3.appendChild(textNode_3);

            //attached the cells to the row
            row.appendChild(cell_1);
            row.appendChild(cell_2);
            row.appendChild(cell_3);

            //attach the row to the body
            tabBody.appendChild(row);
            
            
        });
    }); 
    
    */


                                     
