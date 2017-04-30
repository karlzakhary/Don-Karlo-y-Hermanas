angular.module('seProject').
  component('service', {
    //Important note on path: it starts from the app folder as the root
    templateUrl: 'components/service/service.template.html',
    controller: function ServiceController($http, $stateParams) {
      var self = this;
       // this.heading = "Service";
    // this.id = $stateParams.id;
      $http.get('http://localhost:3000/services/'+ $stateParams.id).then(function(response) {
       console.log(response.data);
        self.service= response.data;

      });
    }
  });