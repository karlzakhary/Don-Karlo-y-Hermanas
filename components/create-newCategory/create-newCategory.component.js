angular.module('seProject').
  component('addCategory', {
    //Important note on path: it starts from the app folder as the root
    templateUrl: 'components/create-newCategory/create-newCategory.template.html',
    controller: function CategoriesAddController($http) {
      var self = this;
      this.heading = "Add Category";

  $http.post('http://localhost:3000/admin/categories/addCategory').then(function(response) {
      //  self.categories = response.data;
      });

    }

  
  });