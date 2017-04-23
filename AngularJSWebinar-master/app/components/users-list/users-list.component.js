  angular.module('seProject').
  component('usersList', {
    //Important note on path: it starts from the app folder as the root
    templateUrl: 'components/users-list/users-list.template.html',
    controller: function UsersListController($http) {
      var self = this;
      this.heading = "Users";

      $http.get('http://localhost:3000/admin/users').then(function(response) {
        self.clients = response.data;
      });

    }

  
  });