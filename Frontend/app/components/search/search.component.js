angular.module('seProject').
  component('search',{
    //Important note on path: it starts from the app folder as the root
    templateUrl: 'components/search/search.template.html',
    controller: function searchController($http,$scope) {
  var self =this;
    $scope.query = {}
    $scope.queryBy = '$'


     this.heading="Search";
     $scope.companies =[
        $http.get('http://localhost:3000/companies').then(function(response) {
        console.log(response.data);
        //console.log(ay7aga);
        self.companies = response.data;
        // $scope.cName = self.companies.Categories.name;
      })];


    $scope.orderProp="name";

  }

 });
