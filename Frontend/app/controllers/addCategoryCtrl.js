
var app = angular.module('seProject');
app.controller('addCategoryCtrl', function($scope,$http) {
   $scope.addCategory = function(){
      var 
        category= JSON.stringify({
            Categoryname: $scope.Categoryname,
            
        })
    $http.post("http://localhost:3000/admin/categories/addCategory", category).success(function(category, status) {
        console.log('Data posted successfully');
      })
   }
});



