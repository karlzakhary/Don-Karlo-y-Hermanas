angular.module('myProject').
  component('service', {
    //Important note on path: it starts from the app folder as the root
    templateUrl: 'components/service/service.template.html',
    controller: function ServiceController($http, $stateParams) {
      var self = this;
        this.heading = "Service";
    // this.id = $stateParams.id;
var variable = $stateParams.id ;
      $http.get('http://localhost:3000/services/' + $stateParams.id).then(function(response) {
       // console.log(response.data);
       console.log(variable);
        self.service= response.data;
      });
    }
  });