angular.module('seProject').
  component('deleteCompany', {
    //Important note on path: it starts from the app folder as the root
    templateUrl: 'components/delete-company/delete-company.template.html',
    controller: function DeleteCompanyController($http, $stateParams) {
      var self = this;
        this.heading = "Delete Company";
        //this.id = $stateParams.cid;

      $http.delete('http://localhost:3000/admin/categories/category/company/deleteCompany/'+$stateParams.cid).then(function(response) {
          
      });
    }
  });