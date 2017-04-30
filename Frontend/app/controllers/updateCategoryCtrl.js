app.controller('updateCategoryCtrl', function($scope,$http,$stateParams) {
   $scope.updateCategory = function(){
      var 
        category= JSON.stringify({
        	id: $stateParams.cid,
            Categoryname: $scope.Categoryname,
            
        })
    $http.post("http://localhost:3000/admin/categories/category/"+$stateParams.cid+"/updateInfo", category).success(function(category, status) {
        console.log('Data posted successfully');
      })

   }
});