app.controller('updateServiceCtrl', function($scope,$http,$stateParams) {
   $scope.updateService = function(){
      var 
        service= JSON.stringify({
          
        	sid: $stateParams.sid,
          servicename: $scope.servicename,
            price: $scope.price,
            description: $scope.description,
            company: $stateParams.id
            
            
        })
    $http.post("http://localhost:3000/admin/categories/category/company/"+$stateParams.id+"/service/updateInfo/"+ $stateParams.sid, service).success(function(service, status) {
        console.log('Data posted successfully');
      })

   }
});


