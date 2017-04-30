    angular.module('seProject').
  component('deleteService', {
    templateUrl: 'components/delete-service/delete-service.template.html',
    controller: function DeleteServiceController($http, $stateParams) {
      var self = this;
        this.heading = "Delete Service";
        //this.id = $stateParams.cid;

      $http.delete('http://localhost:3000/admin/categories/category/company/service/'+$stateParams.cid+'/deleteService').then(function(response) {
          
      });
    }
  });