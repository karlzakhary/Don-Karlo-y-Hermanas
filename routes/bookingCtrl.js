var app = angular.module('myProject', ['ui.router']);
app.controller('bookingCtrl', ['$scope', 'booking', 'auth',
    function($scope, booking, auth) {
        $scope.booking = booking.booking;
        $scope.isLoggedIn = auth.isLoggedIn;
        //setting title to blank here to prevent empty posts
       // $scope.title = '';

        $scope.addBooking = function(slot) {
            //if ($scope.title === '') {
              //  return;
           // }
            booking.create({
                slot : $scope.slot
             //   link : $scope.link
            });
            //clear the values
            $scope.slot = '';
            //$scope.link = '';
        }
       }
        ]);
