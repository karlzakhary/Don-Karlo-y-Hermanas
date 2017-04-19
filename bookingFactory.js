var app = angular.module('myProject', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('booking', {
            url : '/booking/:id',
            templateUrl : '/services.html',
            controller : 'bookingCtrl',
            resolve : {
                post : ['$stateParams', 'booking',
                    function($stateParams, companies) {
                        return companies.get($stateParams.id);
                    }]

            }
             }]);