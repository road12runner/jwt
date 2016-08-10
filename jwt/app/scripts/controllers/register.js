'use strict';

/**
 * @ngdoc function
 * @name jwtApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the jwtApp
 */
angular.module('jwtApp')
  .controller('RegisterCtrl', function ($scope, alert, auth) {
    $scope.submit = function() {

      auth.register($scope.email, $scope.password)
      .success(function(res) {
        alert('success', 'Account Created!', 'Welcome, ' + res.user.email + "!");
      })
      .error(function(err) {
        alert('warning', 'Something went wrong', err.message);
      })
    }

  });
