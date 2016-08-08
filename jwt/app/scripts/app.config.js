angular
  .module('jwtApp').config(function($urlRouterProvider, $stateProvider){

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('main', {
      url: '/',
      templateUrl: '/views/main.html'
    })
    .state('register', {
      url: '/register',
      controller: 'RegisterCtrl',
      templateUrl: '/views/register.html'
    })
    .state('jobs', {
      url: '/jobs',
      controller: 'JobsCtrl',
      templateUrl: '/views/jobs.html'
    })
    .state('logout', {
      url: '/logout',
      controller: 'LogoutCtrl'
    });


  });
