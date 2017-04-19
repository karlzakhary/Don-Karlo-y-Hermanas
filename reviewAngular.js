var myapp = angular.module('myApp',[]);

myapp.controller('reviewCtrl', function($scope, $http, $stateParams, 'auth') {
   $scope.showReviews = "";
   $scope.postReviews = "";
   $scope.id="";
   $scope.review = [];

   $scope.getReviews = function(e){

      $http.get('/categories/category/company/'+$stateParams._id+'/review').then(function (response){
        $scope.review = response.data;
      }).catch(function (error){
        console.log(error);
      });
    }


    $scope.postReviews = function(e){

      $http.post('/categories/category/company/review/' + $stateparams.id).then(function (response){

// line

      }).catch(function (error){
        console.log(error);
      });
    }

   }
})
