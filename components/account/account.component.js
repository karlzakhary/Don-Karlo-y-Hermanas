angular.module('myProject').
  component('account', {
    //Important note on path: it starts from the app folder as the root
    templateUrl: 'components/account/account.template.html',
     controller: function AccountController($http, $stateParams, $scope) {
      var ctrl= this;
        this.heading = "Profile";
     console.log("variable");
	// this.id = $stateParams.id;
var variable = $stateParams.id ;
      $http.get('http://localhost:3000/MyAccount/'+$stateParams.id).then(function(response) {
       // console.log(response.data);
       console.log("variable");
        ctrl.profile= response.data;
		$scope.profile=ctrl.profile;
      });
	   
     $scope.updateClient = function (){
	   var client= JSON.stringify({
        	id: $stateParams.id,
            email: $scope.email,
            phone: $scope.phone,
            firstname: $scope.firstname,
            lastname: $scope.lastename
        }) ;
    $http.put("http://localhost:3000/MyAccount/"+$stateParams.id+"/edit/", client).success(function(client, status) {
        console.log('Data posted successfully');
      })

	 }
	  
	 }
  });


	
	
	
	
	
	
	
	
	
	/* controller: 'ProfileCtrl',
	resolve : {
			profile : ['profiles',
			function(profiles) {
				console.log("TEST");
				return profiles.getProfile();
			}]

		}});

*/


































/* angular.module('myProject').component('account', {
   templateUrl: 'components/account/account.template.html',
	controller: 'AuthCtrl',
	resolve : {
			profilePromise : ['profiles',
			function(profiles) {
				return profiles.getProfile();
			}]

		}
  });

app.controller($http,auth) {
      var self = this;
        this.heading = "Profiles";
    // this.id = $stateParams.id;

      $http.get('http://localhost:3000/MyAccount'+payload._id).then(function(response) {
       // console.log(response.data);
        self.profiles = response.data;
      });
    } ;
*/
  /*
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

app.factory('profiles', ['$http', 'auth',
function($http, auth) {
	var o = {
		profiles : []
	};

     o.getProfile = function () {
          	return $http.get('/MyAccount/' +user._id).then(function(res)
               { return res.data;
              })}}]);


app.factory('auth', ['$http', '$window',
function($http, $window) {
	var auth = {};

	var self = this;
        this.heading = "Profiles";
    // this.id = $stateParams.id;

     

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
		return $http.post('http://localhost:3000/register', user).success(function(data) {
			auth.saveToken(data.token);
		});
	};

/*	auth.getProfile = function(user) {
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
}]);
*/