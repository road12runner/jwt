'use strict';

//angular.module('jwtApp')
//  .controller('headerCtrl', function ($scope, authToken) {
//    $scope.isAuthenticated = authToken.isAuthenticated;
//  });


angular.module('jwtApp')
  .controller('headerCtrl', function ($scope, $auth) {
    $scope.isAuthenticated = $auth.isAuthenticated;
  });
