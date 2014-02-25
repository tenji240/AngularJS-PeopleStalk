/*
* This is the database JS Handler for the top level 
* of the application. 
*/

var users = [];

function employee(fullname, email, phone, picture) {
    this.fullname = fullname;
    this.email = email;
    this.phone = phone;
    this.picture = picture;
}

function getEmployee(fullname) {
    var i;
    for (i = 0; i < users.length; i++){
        if(fullname == user[i].fullname){
            return users[i];  
        }
    }
}

function addUser(fullname, email, phone) {
    var newUser = employee(fullname ,email ,phone ,null);
    users.push(newUser);
}

function loadTable() {
    for(i = 0; i < users.length; i++){
        
        //if(!document.getElementsByTagName) return;
        
        tabBody = document.getElementsByTagName('tbody').item(0);
        
        row = document.createElement('tr');
        
        cell_1 = document.createElement('td');
        cell_2 = document.createElement('td');
        cell_3 = document.createElement('td');
            
        textNode_1 = document.createTextNode(users[i].fullname);
        textNode_2 = document.createTextNode(users[i].email);
        textNode_3 = document.createTextNode(users[i].phone);
        
        cell_1.appendChild(textNode_1);
        cell_2.appendChild(textNode_2);
        cell_3.appendChild(textNode_3);
        
        row.appendChild(cell_1);
        row.appendChild(cell_2);
        row.appendChild(cell_3);
        
        tabBody.appendChild(row);
    }
}

var a = new employee('Tenji Tembo', 'tenji@go.com', 2024102211);
var b = new employee('James Patt', 'james@ball.co', 2021114421);
var c = new employee('Jim Morty', 'jim_morty@aol.com', 2228881166);

function sample() {
    users.push(a);
    users.push(b);
    users.push(c);
}




