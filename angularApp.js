var app = angular.module('myProject', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
$stateProvider.state('home', {
		url : '/home',
		templateUrl : '/home.html',
		controller : 'MainCtrl',
		resolve : {
			companyPromise : ['companies',
			function(companies) {
				return companies.getAll();
			}]

		}
	}).state('profile', {
		url : '/MyAccount/:userID',
		templateUrl : '/profile.html',
		controller : 'ProfileCtrl',
		resolve : {
			user : ['$stateParams', 'clients',
			function($stateParams, clients) {
				return clients.getProfile($stateParams.userID);
			}]

		}
	}).state('companies', {
		url : '/companies/:companyID',
		templateUrl : '/companies.html',
		controller : 'companiesCtrl',
		resolve : {
			company : ['$stateParams', 'companies',
			function($stateParams, companies) {
				return companies.getCompany($stateParams.id);
			}]

		}
	}).state('login', {
		url : '/login',
		templateUrl : '/login.html',
		controller : 'AuthCtrl',
		onEnter : ['$state', 'auth',
		function($state, auth) {
			if (auth.isLoggedIn()) {
				$state.go('home');
			}
		}]

	}).state('register', {
		url : '/register',
		templateUrl : '/register.html',
		controller : 'AuthCtrl',
		onEnter : ['$state', 'auth',
		function($state, auth) {
			if (auth.isLoggedIn()) {
				$state.go('home');
			}
		}]

	});
    $urlRouterProvider.otherwise('home');
}]);

app.controller('MainCtrl', ['$scope', 'companies', 'auth',
function($scope, posts, auth) {
	$scope.companies = companies.companies;
	$scope.isLoggedIn = auth.isLoggedIn;
	//setting title to blank here to prevent empty posts
	$scope.title = '';

		
}]);
