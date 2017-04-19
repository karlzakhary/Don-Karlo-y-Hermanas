angular.module('seProject').
  component('companiesList', {
    //Important note on path: it starts from the app folder as the root
    templateUrl: 'components/companies-list/companies-list.template.html',
    controller: function CategoryController($http, $stateParams) {
      var self = this;
        this.heading = "Companies";
    // this.id = $stateParams.id;

      $http.get('http://localhost:3000/admin/categories/category/' + $stateParams.id).then(function(response) {
       // console.log(response.data);
        self.companies = response.data;
      });
    }
  });
