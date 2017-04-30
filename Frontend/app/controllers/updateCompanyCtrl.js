app.controller('updateCompanyCtrl', function($scope,$http,$stateParams) {
   $scope.updateCompany = function(){
      var 
        company= JSON.stringify({
        	id: $stateParams.id,
            CompanyName: $scope.CompanyName,
            businessEmail: $scope.businessEmail,
            description: $scope.description,
            businessAddress: $scope.businessAddress,
            mobile: $scope.mobile,
            Category: $stateParams.catid,
            bankAccountNumber : $scope.bankAccountNumber,
            creditCardNumber : $scope.creditCardNumber
            
        })
    $http.post("http://localhost:3000/admin/categories/category/"+$stateParams.catid+"/company/"+$stateParams.id+"/updateInfo", company).success(function(company, status) {
        console.log('Data posted successfully');
      })

   }
});

