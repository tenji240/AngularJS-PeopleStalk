// create the module and name it scotchApp
var clear = false;
var update = false;
var array = [
        {id : 0, name : 'Alpha', email : 'alpha@gmail.com', phone : '111-222-3333', url : 'http://tinyurl.com/k9oey4q', password : 'paper56'},
        {id : 1, name : 'Beta', email : 'beta@gmail.com', phone : '111-222-3345', url : 'http://tinyurl.com/jvwsjcl', password : 'bell541'},
        {id : 2, name : 'Charlie', email : 'charlie@gmail.com', phone : '111-223-4456', url : 'http://tinyurl.com/layxu5v', password : 'calling131'},
        {id : 3, name : 'Delta', email : 'delta@gmail.com', phone : '111-445-2213', url : 'http://tinyurl.com/kfmjv2l', password : 'wankel123'}
    ];

var peopleApp = angular.module('peopleApp', ['ngRoute']);

// configure our routes
peopleApp.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/home', {
            templateUrl : 'pages/home.html',
            controller  : 'mainController'
        })

        // route for the about page
        .when('/manage', {
            templateUrl : 'pages/manage.html',
            controller  : 'manageController'
        })

        // route for the contact page
        .when('/friends', {
            templateUrl : 'pages/friends.html',
            controller  : 'friendsController'
        })

        .when('/profile', {
            templateUrl   : 'pages/profile.html',
            controller    : 'profileController'
        })
    
        .when('/login', {
            templateUrl : 'pages/login.html',
            controller  : 'loginController'
        })
    
        .when('/signup', {
            templateUrl : 'pages/signup.html',
            controller  : 'signupController'
        })
        
        .when('/', {
            templateUrl : 'pages/welcome.html',
            controller  : 'welcomeController' 
        });
});

//Controllers
// create the controller and inject Angular's $scope
peopleApp.controller('mainController', function ($scope) {
    // create a message to display in our view
    $scope.message = 'Welcome to PeopleStalk.com!';

});

//Welcome Screen
peopleApp.controller('welcomeController', function ($scope) {
    $scope.message = 'Welcome to PeopleStalk.com!'
});

//Login Controller
peopleApp.controller('loginController', [ '$scope', '$location', function ($scope, $location) {
    $scope.master = array;
    
    $scope.login = function(){
        
        var found = false;
        
        for(var data = 0; data < array.length; data++){
            if(array[data].email == $scope.user.email && array[data].password == $scope.user.password){
                window.alert('Welome - Click to Redirect'); 
                found = true;
                break;
            }
            else
                window.alert('Invalid Email and/or Password');
        }
        
        if(found){
            window.location('/#home');
        }
    }
}]);

//Signup Controller
peopleApp.controller('signupController', function ($scope) {
    $scope.master = array;
    
    $scope.signUp = function(){
        var found = false;
        
        for(var data = 0; data < array.length; data++){
            if(array[data].name == $scope.user.name){
                found = true;
                break;
            }
        }
        
        if(!found){
            array.push({
                id : array.length,
                name : $scope.user.name,
                email : $scope.user.email,
                phone : $scope.user.phone,
                password : $scope.user.password
            });
        
            window.alert('Welcome, ' + $scope.user.name +  ' to PeopleStalk.');
            window.location('#home');
        }
    }
});

//create the controller and inject Angular's $scope
peopleApp.controller('manageController', function ($scope, $window) {
    
    // create a message to display in our view
    $scope.message = 'Add or Delete Users Here';
    
    $scope.addUser = function(){
        var dataObject = {
            id : array.length,
            name : $scope.user.name,
            email : $scope.user.email,
            phone : $scope.user.phone,
            url : $scope.user.url,
            password : $scope.user.password,
            option: "insert"
        };

        array.push(dataObject);
        $window.alert('Successfully Added ' + $scope.user.name +  ' to PeopleStalk.');
        addUser_PostR(dataObject);
    }
    
    
    $scope.removeUser = function(){
        var found = false;
        for(var data = 0; data < array.length; data++){
            if(array[data].name == $scope.user.name){
                array.splice(data,1);
                found = true;
                break;
            }
        }
        if(!found)
            $window.alert('Can\'t Find ' + $scope.user.name +  ' in PeopleStalk.');
        else{
            dataObject = {name:$scope.user.name, option:"remove"};
            removeUser_PostR(dataObject);
        }
    }
    
    $scope.updateUser = function(){
        var found = false;
        
        var dataObject = {
            id : array.length,
            name : $scope.user.name,
            email : $scope.user.email,
            phone : $scope.user.phone,
            url : $scope.user.url,
            password : $scope.user.password,
            option: "insert"
        };
        
        
        for(var data = 0; data < array.length; data++){
            if(array[data].name == $scope.user.name){
                array[data].email = $scope.user.email;
                array[data].phone = $scope.user.phone;
                array[data].url = $scope.user.url;
                array[data].password = $scope.user.password;
                found = true;
                break;
            }
        }
        if(!found)
            $window.alert('Can\'t Find ' + $scope.user.name +  ' in PeopleStalk.');
        else{
            
            //Remove the Old
            var temp = {name:$scope.user.name, option:"remove"};
            removeUser_PostR(temp);
            
            //Add in the new!
            addUser_PostR(dataObject);
        }
    }
    
    $scope.master = array;
    
});

peopleApp.controller('friendsController', function($scope) {
    $scope.message = 'Anyone and Everyone you know is displayed here!';
    
    $scope.master = array;
});

peopleApp.controller('profileController', function($scope){
    $scope.message = 'Welcome to Profiles!';
    
    $scope.master = array;
    
    $scope.showUser = function(){
        
        var found = false;
        
        for(var data = 0; data < array.length; data++){
            if(array[data].name == $scope.inputText){
                $scope.user = array[data];
                found = true;
            }
        }
        
        if(!found)
            window.alert('Can\'t Find ' + $scope.user.name +  ' in PeopleStalk.');;
    }
    
});

//External non Associated functions used to perform AJAX Call to NodeJS Server.
//Hopefully it works....
function addUser_PostR(dataObject){
    
    window.alert("Executing Post Request for " + dataObject.name);
    
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8888/",
        data: JSON.stringify(dataObject),
        datatype: "json",
        contentType: 'application/json; charset=utf-8',
        success: function(result) { alert("Completed Post Request"); },
        error: function(xmlhdrq, ajaxOptions, thrownError) {
            alert(xmlhdrq.status);
            alert(thrownError);
        }
    });
} 

function removeUser_PostR(dataObject){
     //POST REQUEST - Server Side JS
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8888/",
        data: JSON.stringify(dataObject),
        datatype: "json",
        contentType: 'application/json; charset=utf-8',
        success: function(result) { alert("Removed " + dataObject.name + " From Database."); },
        error: function(xmlhdrq, ajaxOptions, thrownError) {
            alert(xmlhdrq.status);
            alert(thrownError);
        }
    });
}