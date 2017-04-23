angular.module('seProject').
  component('deleteCategory', {
    //Important note on path: it starts from the app folder as the root
    templateUrl: 'components/delete-category/delete-category.template.html',
    controller: function DeleteCategoryController($http, $stateParams) {
      var self = this;
        this.heading = "Delete Category";
        //this.id = $stateParams.cid;

      $http.delete('http://localhost:3000/admin/categories/category/' + $stateParams.cid +'/deleteCategory').then(function(response) {
          
      });
    }
  });