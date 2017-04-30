var app = angular.module('seProject');
app.controller('addCompanyCtrl', function($scope,$http,$stateParams) {
   $scope.addCompany = function(){
      var 
        company= JSON.stringify({
            
            CompanyName: $scope.CompanyName,
            businessEmail: $scope.businessEmail,
            description: $scope.description,
            businessAddress: $scope.businessAddress,
            mobile: $scope.mobile,
            Category: $stateParams.cid,
            bankAccountNumber : $scope.bankAccountNumber,
            creditCardNumber : $scope.creditCardNumber

            
        })
    $http.post("http://localhost:3000/admin/categories/category/"+$stateParams.cid+"/addCompany", company).success(function(company, status) {
        console.log('Data posted successfully');
      })
   }
});
