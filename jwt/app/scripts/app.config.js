angular
  .module('jwtApp').config(function($urlRouterProvider, $stateProvider, $httpProvider, $authProvider, API_URL){

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
    })
    .state('login', {
      url: '/login',
      templateUrl: '/views/login.html',
      controller: 'LoginCtrl'
    });

    $httpProvider.interceptors.push('authInterceptor');

    $authProvider.loginUrl = API_URL + 'login';
    $authProvider.signupUrl = API_URL + 'register';

    $authProvider.google({
      clientId: '345560570467-odmobbh2g7l39ajj2rbna3r5as4ruik4.apps.googleusercontent.com',
      url: API_URL + 'auth/google'
    });

  })
  .constant('API_URL', 'http://localhost:3000/')
  .run(function($window){
    var params = $window.location.search.substring(1);
    if (params && $window.opener && $window.opener.location.origin === $window.location.origin) {
      var pair = params.split('=');
      var code = decodeURIComponent(pair[1]);

      $window.opener.postMessage(code, $window.location.origin);
    }
  });
