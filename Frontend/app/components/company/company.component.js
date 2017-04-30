angular.module('seProject').
  component('company', {
    //Important note on path: it starts from the app folder as the root
    templateUrl: 'components/company/company.template.html',
    controller: function CompanyController($http, $stateParams,$scope) {
      var self = this;
        this.heading = "Company";
    // this.id = $stateParams.id;
var variable = $stateParams.id ;
      $http.get('http://localhost:3000/companies/' + $stateParams.id).then(function(response) {
       // console.log(response.data);
        self.company= response.data;
    self.services=self.company.Services;
    console.log(self.services);
    });

    }
  });




/*angular.module('myProject').
  component('company', {
    //Important note on path: it starts from the app folder as the root
    templateUrl: 'components/companies-list/company.template.html',
    controller: 'CompanyController',
    resolve : {
			company : ['$stateParams', 'companies',
			function($stateParams, companies) {
				return companies.get($stateParams.id);
			}]

		}
    });

  app.controller('CompanyController', ['$scope', function ($scope) {

$scope.getCompany = function (id) {
       return $http.get('http://localhost:3000/companies/' + id).then(function(res) {
			return res.data;
    })}}]);

  
  app.controller('companies',
function() {
	var o = {
		companies : []
	};
    o.get = function(id) {
		//use the express route to grab this post and return the response
		//from that route, which is a json of the post data
		//.then is a promise, a kind of newly native thing in JS that upon cursory research
		//looks friggin sweet; TODO Learn to use them like a boss.  First, this.
		return $http.get('http://localhost:3000/companies/' + id).then(function(res) {
			return res.data;
		});
	};
}) ;*/