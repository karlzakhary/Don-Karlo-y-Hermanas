var app = angular.module('seProject');
app.controller('addAdvertismentCtrl', function($scope,$http,$stateParams) {
   $scope.addAdvertisment = function(){
      var 
        advertisment= JSON.stringify({
            
            adLink: $scope.adLink,
            imagePath: $scope.imagePath,
            originalname : $scope.originalname,
            company: $stateParams.cid
        

            
        })
    $http.post("http://localhost:3000/admin/categories/category/company/"+$stateParams.cid+"/createAdvertisment", advertisment).success(function(advertisment, status) {
        console.log('Data posted successfully');
      })
   }
});
