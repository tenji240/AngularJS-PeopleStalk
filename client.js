/*
    Node JS Client Side Javascript Handler
    Author: Tenji Tembo
    Class: CMSC 448/445
    Project: 1
    
    This code is responsible for handling all AJAX
    POST Request to the NodeJS Server Side Caller, as
    well as receiving requests from the Server Side, 
    parsing the JSON data, and displaying the correct data.
    
    NOTE: PLEASE SEE README.md FIRST before executing!!
*/

var clear = false;
var update = false;

//Add User to the Database
function addUser() {
    var name = document.getElementById('name_add').value;
    var email = document.getElementById('email_add').value;
    var phone = document.getElementById('phone_add').value;
    var url = document.getElementById('url_add').value;
    dataobject = {name:name, email:email, phone:phone, url:url, option:"insert"};
    
    //POST REQUEST - Server Side JS
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8888/",
        data: JSON.stringify(dataobject),
        datatype: "json",
        contentType: 'application/json; charset=utf-8',
        success: function(result) { alert(result); },
        error: function(xmlhdrq, ajaxOptions, thrownError) {
            alert(xmlhdrq.status);
            alert(thrownError);
        }
    });
}

//Delete a User from the Database
function deleteUser(name) {
    var name = document.getElementById('name_add').value;
    dataobject = {name:name, option:'remove'};
    
    //POST REQUEST - Server Side JS
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8888/",
        data: JSON.stringify(dataobject),
        datatype: "json",
        contentType: 'application/json; charset=utf-8',
        success: function(result) { alert(result); },
        error: function(xmlhdrq, ajaxOptions, thrownError) {
            alert(xmlhdrq.status);
            alert(thrownError);
        }
    });
}

//Load All Elements or Load One Element
function loadTable(bool,clear) { 
    
    //POST REQUEST - Server Side JS
    dataobject = {option:'show'};
    $.ajax({
        async:true,
        type: "POST",
        url: "http://127.0.0.1:8888/",
        data: JSON.stringify(dataobject),
        datatype: "json",
        contentType: 'application/json; charset=utf-8',
        success: function(result) { showTable(result,bool); },
        error: function(xmlhdrq, ajaxOptions, thrownError) {
            alert(xmlhdrq.status);
            alert(thrownError);
        }
    });
}

function showTable(json, bool) {
   // alert(json);
    if(bool == true) {
        
        var stuff = JSON.parse(json);
        console.log(stuff);
        if (clear)
        {
           tabBody = document.getElementsByTagName('tbody').item(0);
            
           //kill the children!!!!            
            while(tabBody.firstChild)
            {
                tabBody.removeChild(tabBody.firstChild);
            }
        }


        //Displays a Table of Users to the Page
        for(i = 0; i < stuff.data.length; i++){
            console.log(stuff.data[i].name);   

            tabBody = document.getElementsByTagName('tbody').item(0);

            //a row elements
            row = document.createElement('tr');

            //three column elements
            cell_1 = document.createElement('td');
            cell_2 = document.createElement('td');
            cell_3 = document.createElement('td');

            //added corresponding elements
            // is there a clear ethod for textnode?
            textNode_1 = document.createTextNode(stuff.data[i].name);
            textNode_2 = document.createTextNode(stuff.data[i].email);
            textNode_3 = document.createTextNode(stuff.data[i].phone);

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
        //lol never told it to clear 
        clear = true;
    }
    
    else{
        var stuff = JSON.parse(json);
        // console.log(stuff.data[0]);
        
        for(var data = 0; data < stuff.data.length; data++){
            if(stuff.data[data].name == document.getElementById('search_user').value) { showUser(stuff.data[data]); }
        }
    }
    
}

//Search for a User
function findUser(){
    var name = document.getElementById('search_user').value;
    dataobject = {name:name, option:"search"};
    $.ajax({
        async: true,
        type: "POST",
        url: "http://127.0.0.1:8888/",
        data: JSON.stringify(dataobject),
        datatype: "json",
        contentType: 'application/json; charset=utf-8',
        success: function(result)
        {
            var result = JSON.parse(result);
            showUser(result);
        },
        error: function(xmlhdrq, ajaxOptions, thrownError)
        {
            alert("USER: " + xmlhdrq.status);
            alert(thrownError);
        }
    });
}

//Displays the user on the page
function showUser(user){
    if(!update) {
        
        //update table
        id_body = document.getElementById('user');
        image = document.createElement('img');
        name_ = document.createElement('h4');
        email_ = document.createElement('h4');
        phone_ = document.createElement('h4');

        image.setAttribute("id", "profile_img");
        email_.setAttribute("id", "profile_email");
        name_.setAttribute("id", "profile_name");
        phone_.setAttribute("id", "profile_phone");

        console.log(user.name);
        console.log(user.url);

        name_1 = document.createTextNode(user.name);
        email_1 = document.createTextNode(user.email);
        phone_1 = document.createTextNode(user.phone);
        image.setAttribute('src', user.url);

        name_.appendChild(name_1);
        email_.appendChild(email_1);
        phone_.appendChild(phone_1);

        id_body.appendChild(image);
        id_body.appendChild(name_);
        id_body.appendChild(email_);
        id_body.appendChild(phone_);
        update = true;
        
    } else {
        
        // update profile
        var img =  document.getElementById("profile_img");    
        var name_ = document.getElementById("profile_name"); 
        var email_ = document.getElementById("profile_email"); 
        var phone_ =  document.getElementById("profile_phone");
        email_.innerHTML = user.email;
        name_.innerHTML = user.name;
        phone_.innerHTML = user.phone;
        img.setAttribute('src', user.url);
    }
}