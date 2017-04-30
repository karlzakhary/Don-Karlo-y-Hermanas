 angular.module('seProject').
  component('deleteUser', {
    templateUrl: 'components/delete-user/delete-user.template.html',
    controller: function DeleteUserController($http, $stateParams) {
      var self = this;
        this.heading = "Delete User";
        //this.id = $stateParams.cid;

      $http.delete('http://localhost:3000/admin/users/'+$stateParams.cid+'/deleteUser').then(function(response) {
          
      });
    }
  });