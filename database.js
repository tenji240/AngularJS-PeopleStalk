/*
* This is the database JS Handler for the top level 
* of the application. 
* Author - Tenji Tembo
*/

//Global Stuff for rendering the TABLE
var users = [];
var temp;

//magical employee constructor - hopefully port to JSON Object
function employee(fullname, email, phone, picture) {
    this.fullname = fullname;
    this.email = email;
    this.phone = phone;
    this.picture = picture;
}

//returns the employee object...
//dunno why....
function getEmployee(fullname) {
    var i;
    for (i = 0; i < users.length; i++){
        if(fullname == user[i].fullname){
            return users[i];  
        }
    }
}

//add in a new user 
//untested....
function addUser(fullname, email, phone) {
    temp = employee(fullname ,email ,phone ,null);
    users.push(newUser);
}

//creates the intial set of users
//pulls from the initial table of users
//update the global object array to add and display new users....
function loadTable() {
    for(i = 0; i < users.length; i++){
        
        //if(!document.getElementsByTagName) return;
        
        tabBody = document.getElementsByTagName('tbody').item(0);
        
        //a row elements
        row = document.createElement('tr');
        
        //three column elements
        cell_1 = document.createElement('td');
        cell_2 = document.createElement('td');
        cell_3 = document.createElement('td');
            
        //added corresponding elements
        textNode_1 = document.createTextNode(users[i].fullname);
        textNode_2 = document.createTextNode(users[i].email);
        textNode_3 = document.createTextNode(users[i].phone);
        
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
    }
}

//three global objects just to make life easier - exists in the DB
var a = new employee('Tenji Tembo', 'tenji@go.com', 2024102211);
var b = new employee('James Patt', 'james@ball.co', 2021114421);
var c = new employee('Jim Morty', 'jim_morty@aol.com', 2228881166);

//without this, no initial users.
function sample() {
    users.push(a);
    users.push(b);
    users.push(c);
}




