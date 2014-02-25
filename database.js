/*
* This is the database JS Handler for the top level 
* of the application. 
*/

var users = [];

function employee(fullname, email, phone, picture){
    this.fullname=fullname;
    this.email=email;
    this.phone=phone;
    this.picture=picture;
}

function getEmployee(fullname){
    for(i = 0; i < users.length; i++){
        if(fullname == user[i].fullname){
             return users[i];  
        }
    }
}

function addUser(fullname, email, phone){
    var newUser = employee(fullname,email,phone,null);
    users.push(newUser);
}

function loadTable(){
    for(i = 0; i < user.length; i++){
        document.write('<tr>');
        document.write('<td>' + user[i].fullname + '</td>');
        document.write('<td>' + users[i].email + '</td>');
        document.write('<td>' + users[i].phone + '</td>');
        document.write('</tr>');
    }
}


function sample(){
    addUser('Tenji Tembo', 'tenji@go.com', 2024102211);
    addUser('James Patt', 'james@ball.co', 2021114421);
    addUser('Jim Morty', 'jim_morty@aol.com', 2228881166);

}

