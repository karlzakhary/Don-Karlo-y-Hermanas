angular.module('seProject').
  component('categoriesList', {
    //Important note on path: it starts from the app folder as the root
    templateUrl: 'components/categories-list/categories-list.template.html',
    controller: function CategoriesListController($http) {
      var self = this;
      this.heading = "Categories";

      $http.get('http://localhost:3000/admin/categories').then(function(response) {
        self.categories = response.data;
      });

    }

  
  });
  