angular.module('seProject').
  component('servicesList', {
   //Important note on path: it starts from the app folder as the root
    templateUrl: 'components/services-list/services-list.template.html',
    controller: function CompanyController($http,$stateParams) {
      var self = this;
        this.heading = "Services";
        console.log("id"+$stateParams.id +"shghall");
    // this.id = $stateParams.id;

      $http.get('http://localhost:3000/admin/categories/category/company/' + $stateParams.id).then(function(response) {
       // console.log(response.data);
        self.services = response.data;
      });
    }

  
  });
    