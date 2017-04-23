var app = angular.module('seProject');
app.controller('addServiceCtrl', function($scope,$http,$stateParams) {
   $scope.addService = function(){
      var 
        service= JSON.stringify({

            servicename: $scope.servicename,
            price: $scope.price,
            description: $scope.description,
            company: $stateParams.cid

            
        })
    $http.post("http://localhost:3000/admin/categories/category/company/"+$stateParams.cid+"/addService", service).success(function(service, status) {
        console.log('Data posted successfully');
      })
   }
});
