	// create the module and name it scotchApp
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

	// create the controller and inject Angular's $scope
	peopleApp.controller('mainController', function($scope) {
		// create a message to display in our view
		$scope.message = 'Welcome to PeopleStalk.com!';
	});

	peopleApp.controller('manageController', function($scope) {
		$scope.message = 'Manage all your "friends"!';
	});

	peopleApp.controller('friendsController', function($scope) {
		$scope.message = 'All everyone you know is here!';
	});
	
	peopleApp.controller('profileController', function($scope){
	  $scope.message = 'Welcome to Profiles!';
	});