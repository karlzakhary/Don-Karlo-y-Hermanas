var app = angular.module('seProject').component('register',{
     
     templateUrl: 'components/register/register.template.html',
     
});
app.controller('AuthCtrl', ['$scope', '$state', 'auth',
function($scope, $state, auth) {
	$scope.user = {};

	$scope.register = function() {
		auth.register($scope.user).error(function(error) {
			$scope.error = error;
		}).then(function() {
		//	$state.go(login);
		});
	};

	$scope.logIn = function() {
		auth.logIn($scope.user).error(function(error) {
			$scope.error = error;
		}).then(function() {
			
			//$state.go(login);
		});
	};

	
}]);


app.factory('auth', ['$http', '$window',
function($http, $window) {
	var auth = {};
	var o = {
		clients: []
	};



	auth.saveToken = function(token) {
		$window.localStorage['my-project-token'] = token;
	};

	auth.getToken = function() {
		return $window.localStorage['my-project-token'];
	}

	auth.admin = function () {
		if (auth.isLoggedIn()) {
			var token = auth.getToken();
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			if (payload.username == 'admin')
			return true ;
			else {
				return false ;
			}
	}
	}
	
	auth.isLoggedIn = function() {
		var token = auth.getToken();

		if (token) {
			var payload = JSON.parse($window.atob(token.split('.')[1]));

			return payload.exp > Date.now() / 1000;
		} else {
			return false;
		}
	};

	auth.currentUser = function() {
		if (auth.isLoggedIn()) {
			var token = auth.getToken();
			var payload = JSON.parse($window.atob(token.split('.')[1]));

			return payload.username;
		}
	};

	auth.currentid = function() {
		if (auth.isLoggedIn()) {
			var token = auth.getToken();
			var payload = JSON.parse($window.atob(token.split('.')[1]));

			return payload._id;
		}
	};

	auth.register = function(user) {
		return $http.post('http://localhost:3000/register', user).success(function(data) {
			auth.saveToken(data.token);
		});
	};

	auth.getProfile = function(user) {
		return $http.get('http://localhost:3000/MyAccount', user).success(function(data){

		})
	}

	auth.logIn = function(user) {
		return $http.post('http://localhost:3000/login', user).success(function(data) {
			auth.saveToken(data.token);
			console.log("DONE");
		});
	};

	auth.logOut = function() {
		$window.localStorage.removeItem('my-project-token');
	};

	return auth;
}]);

app.controller('NavCtrl', ['$scope', 'auth',
function($scope, auth) {
	$scope.isLoggedIn = auth.isLoggedIn;
	$scope.currentUser = auth.currentUser;
	$scope.logOut = auth.logOut;
	$scope.currentid = auth.currentid;
}]);