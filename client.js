function addUser()
{
    var name = document.getElementById('name_add').value;
    var email = document.getElementById('email_add').value;
    var phone = document.getElementById('phone_add').value;
    var url = document.getElementById('url_add').value;
    dataobject = {name:name, email:email, phone:phone, url:url, option:"insert"};
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8888/",
        data: JSON.stringify(dataobject),
        datatype: "json",
        contentType: 'application/json; charset=utf-8',
        success: function(result)
        {
            alert(result);
        },
        error: function(xmlhdrq, ajaxOptions, thrownError)
        {
            alert(xmlhdrq.status);
            alert(thrownError);
        }
    });
}

//delete a user
function deleteUser(name){
    var name = document.getElementById('name_add').value;
    dataobject = {name:name, option:'remove'};
     $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8888/",
        data: JSON.stringify(dataobject),
        datatype: "json",
        contentType: 'application/json; charset=utf-8',
        success: function(result)
        {
            alert(result);
        },
        error: function(xmlhdrq, ajaxOptions, thrownError)
        {
            alert(xmlhdrq.status);
            alert(thrownError);
        }
    });
}
//Load table
function loadTable()
{ 
    dataobject = {option:'show'};
     $.ajax({
         async:true,
        type: "POST",
        url: "http://127.0.0.1:8888/",
        data: JSON.stringify(dataobject),
        datatype: "json",
        contentType: 'application/json; charset=utf-8',
        success: function(result)
        {
           showTable(result);
        },
        error: function(xmlhdrq, ajaxOptions, thrownError)
        {
            alert(xmlhdrq.status);
            alert(thrownError);
        }
    });
}
function showTable(json)
{
   // alert(json);
    var stuff = JSON.parse(json);
    console.log(stuff);
    
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
    
}
//search
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
           // alert(thrownError);
        }
    });
}

function showUser(user){
    id_body = document.getElementById('user').item(0);
    image = document.createElement('img');
    name_ = document.createElement('h4');
    email_ = document.createElement('h4');
    phone_ = document.createElement('h4');
    
    name_1 = document.createTextNode(user.name);
    email_1 = document.createTextNode(user.email);
    phone_1 = document.createTextNode(user.phone);
    image.src = user.photo;
    
    name_.appendChild(name_1);
    email_.appendChild(email_1);
    phone_.appendChild(phone_1);
    
    id_body.appendChild(image);
    id_body.appendChild(name_);
    id_body.appendChild(email_);
    id_body.appendChild(phone_);
}