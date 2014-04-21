// create the module and name it scotchApp
var clear = false;
var update = false;
var array = [
        {id:0, name:'Alpha', email:'alpha@gmail.com', phone:'111-222-3333', url:'http://tinyurl.com/k9oey4q', password:'paper56'},
        {id:1, name:'Beta', email:'beta@gmail.com', phone:'111-222-3345', url:'http://tinyurl.com/jvwsjcl', password:'bell541'},
        {id:2, name:'Charlie', email:'charlie@gmail.com', phone:'111-223-4456', url:'http://tinyurl.com/layxu5v', password:'calling131'},
        {id:3, name:'Delta', email:'delta@gmail.com', phone:'111-445-2213', url:'http://tinyurl.com/kfmjv2l', password:'wankel123'}
    ];

var peopleApp = angular.module('peopleApp', ['ngRoute']);

// configure our routes
peopleApp.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
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
          templateUrl : 'pages/profile.html',
          controller  : 'profileController'
        });
});

//Vanilla Screens
// create the controller and inject Angular's $scope

peopleApp.controller('mainController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Welcome to PeopleStalk.com!';

});

//create the controller and inject Angular's $scope
peopleApp.controller('manageController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Add or Delete Users Here';
    
    $scope.addUser = function(){
        array.push({
            id:array.length,
            name:$scope.user.name,
            email:$scope.user.email,
            phone:$scope.user.phone,
            url:$scope.user.url,
            password:$scope.user.password
        });
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
        for(var data = 0; data < array.length; data++){
            if(array[data].name == $scope.inputText)
                $scope.user = array[data];
        }
    }
    
});