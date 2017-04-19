app.controller('AuthCtrl', ['$scope', '$state', 'auth',
function($scope, $state, auth) {
	$scope.user = {};

	$scope.register = function() {
		auth.register($scope.user).error(function(error) {
			$scope.error = error;
		}).then(function() {
			$state.go('home');
		});
	};

	$scope.logIn = function() {
		auth.logIn($scope.user).error(function(error) {
			$scope.error = error;
		}).then(function() {
			$state.go('home');
		});
	};
}]);

app.factory('profile',['$http', 'auth',
function($http, auth) {
	var c = {
    clients : []
};
c.getProfile = function(userID) {
		return $http.get('/MyAccount/' + userID).then(function(res) {
			return res.data;
		});
	};
	c.updateProfile = function (userID){
		return $http.put('/MyAccount/'+ client._id + '/edit').then(function(res){

		})
	}

}])


app.factory('companies', ['$http', 'auth',
function($http, auth) {
	var o = {
		companies : []
};

    

	
	o.getAll = function() {
		return $http.get('/companies').success(function(data) {
			angular.copy(data, o.companies);
		});
	};
o.getCompany = function(companyID) {
		return $http.get('/companies/'+ companyID).then(function(res) {
			return res.data;
		});
	};
	
	
	
	

app.factory('auth', ['$http', '$window',
function($http, $window) {
	var auth = {};

	auth.saveToken = function(token) {
		$window.localStorage['my-project-token'] = token;
	};

	auth.getToken = function() {
		return $window.localStorage['my-project-token'];
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

	auth.register = function(user) {
		return $http.post('/register', user).success(function(data) {
			auth.saveToken(data.token);
		});
	};

	auth.logIn = function(user) {
		return $http.post('/login', user).success(function(data) {
			auth.saveToken(data.token);
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
}]);
