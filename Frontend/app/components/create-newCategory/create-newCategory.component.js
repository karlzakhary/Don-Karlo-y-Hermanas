angular.module('seProject').
  component('addCategory', {
    //Important note on path: it starts from the app folder as the root
    templateUrl: 'components/create-newCategory/create-newCategory.template.html',
    controller: function addCategoryController($http,$scope) {
      var self = this;
      this.heading = "Add Category";
      //$scope.items = [];
     $scope.newCategory = {
       Categoryname: ''
     }

    $http.post('http://localhost:3000/admin/categories/addCategory',$scope.newCategory).then(function(response) {
      console.log(response);
       
      });

    }

  
  });