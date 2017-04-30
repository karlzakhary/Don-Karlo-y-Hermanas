'use strict';

// Step 1

var blogApp = angular.module('seProject', ['ui.router']);

blogApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  var categoriesState = {
    name: 'categories',
    url: '/admin/categories',
    template: '<categories-list></categories-list>'
  }
   var usersState = {
    name: 'users',
    url: '/admin/users',
    template: '<users-list></users-list>'
  }
  var addCategoryState = {
    name:'addCategory',
    url:'/admin/categories/addCategory',
    templateUrl: 'components/create-newCategory/create-newCategory.template.html'
  }
   var addCompanyState = {
    name:'addCompany',
    url:'/admin/categories/category/:cid/addCompany',
    templateUrl: 'components/create-newCompany/create-newCompany.template.html'
  }
  var addServiceState = {
    name:'addService',
    url:'/admin/categories/category/company/:cid/addService',
    templateUrl: 'components/create-newService/create-newService.template.html'
  }
    var addAdvertismentState = {
    name:'addAdvertisment',
    url:'/admin/categories/category/company/:cid/createAdvertisment',
    templateUrl: 'components/create-newAdvertisment/create-newAdvertisment.template.html'
  }
    var updateCategoryState = {
    name:'updateCategory',
    url:'/admin/categories/category/:cid/updateInfo',
    templateUrl: 'components/update-category/update-category.template.html'
  }
   var updateCompanyState = {
    name:'updateCompany',
    url:'/admin/categories/category/:catid/company/:id/updateInfo',
    templateUrl: 'components/update-company/update-company.template.html'
  }
  var updateServiceState = {
    name:'updateService',
    url:'/admin/categories/category/company/:id/service/updateInfo/:sid',
    templateUrl: 'components/update-service/update-service.template.html'
  }
  var categoryState = {
    name: 'category',
    url: '/admin/categories/category/:id',
    template: '<companiess-list></companiess-list>'
  }

  var companyStatee = {
     name: 'companyy',
    url: '/admin/categories/category/company/:id',
    template: '<services-list></services-list>'
  }
      var deleteCategoryState = {
    name:'deleteCategory',
    url:'/admin/categories/category/:cid/deleteCategory',
    template: '<delete-category></delete-category>'
  }
     var deleteCompanyState = {
    name:'deleteCompany',
    url:'/admin/categories/category/company/deleteCompany/:cid',
    template: '<delete-company></delete-company>'
  }
       var deleteServiceState = {
    name:'deleteService',
    url:'/admin/categories/category/company/service/:cid/deleteService',
    template: '<delete-service></delete-service>'
  }
        var deleteUserState = {
    name:'deleteUser',
    url:'/admin/users/:cid/deleteUser',
    template: '<delete-user></delete-user>'
  }
   var homeState = {
    name:'home',
    url:'/home',
    template: '<home></home>'
  }

  var accountState = {
    name: 'account',
    url: '/MyAccount/:id',
    template: '<account></account>'
  }

  var serviceState = {
    name: 'service',
    url: '/services/:id',
    template: '<service></service>'
  }

  var companiesState = {
    name: 'companies',
    url: '/companies',
    template: '<companies-list></companies-list>'
  } 

  var loginState = {
    name: 'login',
    url: '/login',
    template: '<login></login>'
  }

  var registerState = {
    name: 'register',
    url: '/register',
    template: '<register></register>'
  }

var companyState = {
     name: 'company',
    url: '/companies/:id',
    template: '<company></company>'
  }
  var bookingState = {
     name: 'booking',
    url: '/booking/:id',
    template: '<booking></booking>'
  }
   var searchState = {
     name: 'search',
    url: '/search',
    template: '<search></search>'
  }

  $stateProvider.state(categoriesState);
  $stateProvider.state(usersState);
  $stateProvider.state(addCategoryState);
  $stateProvider.state(addCompanyState);
  $stateProvider.state(addServiceState);
  $stateProvider.state(addAdvertismentState);
  $stateProvider.state(categoryState);
  $stateProvider.state(companyState);
  $stateProvider.state(updateCategoryState);
  $stateProvider.state(updateCompanyState);
  $stateProvider.state(updateServiceState);
  $stateProvider.state(deleteCategoryState);
  $stateProvider.state(deleteCompanyState);
  $stateProvider.state(deleteServiceState);
  $stateProvider.state(deleteUserState);
   $stateProvider.state(bookingState);
  $stateProvider.state(serviceState);
  $stateProvider.state(companyStatee);
  $stateProvider.state(accountState);
  $stateProvider.state(homeState);
  $stateProvider.state(companiesState);
  $stateProvider.state(loginState);
  $stateProvider.state(registerState);
  $stateProvider.state(searchState);


  $urlRouterProvider.when('', '/admin/categories');
}]);


