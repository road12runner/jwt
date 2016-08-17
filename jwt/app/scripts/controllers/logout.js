'use strict';
//angular.module('jwtApp')
//  .controller('LogoutCtrl', function (authToken, $state) {
//    authToken.removeToken();
//    $state.go('main');
//  });


angular.module('jwtApp')
  .controller('LogoutCtrl', function ($auth, $state) {
    $auth.logout();
    $state.go('main');
  });
