var http = require('http');
var fs = require('fs');
var path = require('path');
var db = require('mongoskin').db('localhost:27017/people'); 
var collection = db.collection('names');

http.createServer(function (request, response) {
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

//display all elements
function displayAll(){
    db.collection('people').find({}, function(err, result){
        result.each(function(err, person) {
            
            window.alert(person.name);
            
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
}

//Add a User to the database
function addUser(name, email, phone, photo){
    db.collection('people').insert({name:name, email:email, phone:phone, photo:photo}, function (err, result) {
        if (err) throw err;
        if (result) window.alert('Added!');
    });
}
                                     
//delete a user
function deleteUser(name){
    db.collections('people').remove({name:name}, function (err, result) {
       if(!err) window.alert('Deleted'); 
    });
}

//search
function findUser(name){
    db.collection('people').find({name:name}).toArray(function (err, result) {
        window.alert(result[0].name);
        window.alert(result[0].email);
        window.alert(result[0].phone);
        window.alert(result[0].photo);
    });
}