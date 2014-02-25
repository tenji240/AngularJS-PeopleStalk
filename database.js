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
    for(i = 0; i < user.length; i++){
        document.write('<tr>');
        document.write('<td>' + user[i].fullname + '</td>');
        document.write('<td>' + users[i].email + '</td>');
        document.write('<td>' + users[i].phone + '</td>');
        document.write('</tr>');
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




