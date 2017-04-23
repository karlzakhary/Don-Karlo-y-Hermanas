var companyApp = angular.module("CompanyApp",[]);
  companyApp.controller("compCtrl",function($scope){
    $scope.query = {}
    $scope.queryBy = '$'

//     $scope.companies = function(e){

//   $http.get('http://localhost:3000/categories/category/:id').then(function(res)){
  
//   $scope.companies=res.data;

//       }).catch(function (error){
//     console.log(error);});
  
// }

    
    $scope.companies = [
      {
        "CompanyName" : "Omar",
        "CompanyAddress" : "Helio",
        "Categories" : "BI"
      },
      {
        "CompanyName" : "Mohamed",
        "CompanyAddress" : "Almaza",
        "Categories" : "BI"
      },
      {
        "CompanyName" : "mof",
        "CompanyAddress" : "shams",
        "Categories" : "MET"
      },
      {
        "CompanyName" : "Ahmed",
        "CompanyAddress" : "Tagamo3",
        "Categories" : "IET"
      },
      {
        "CompanyName" : "Nour",
        "CompanyAddress" : "Hegaz",
        "Categories" : "Civil"
      },
      {
        "CompanyName" : "Mohamed",
        "CompanyAddress" : "Rehab",
        "Categories" : "Arch"
      },
      {
        "CompanyName" : "Mohamed",
        "CompanyAddress" : "Maadi",
        "Categories" : "Arch"
      }
    ];
    $scope.orderProp="name";                
  });
