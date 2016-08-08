'use strict';

angular.module('jwtApp')
  .controller('headerCtrl', function ($scope, authToken) {
    $scope.isAuthenticated = authToken.isAuthenticated;
  });
