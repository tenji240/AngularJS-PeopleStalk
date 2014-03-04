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
        type: "POST",
        url: "http://127.0.0.1:8888/",
        data: JSON.stringify(dataobject),
        datatype: "json",
        contentType: 'application/json; charset=utf-8',
        success: function(result)
        {
            //result = JSON.parse(result);
            alert(result);
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
    alert(json);
}
//search
function findUser(name){
    collection.find({name:name}).toArray(function (err, result) {
        window.alert(result[0].name);
        window.alert(result[0].email);
        window.alert(result[0].phone);
        window.alert(result[0].photo);
    });
}