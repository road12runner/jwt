'use strict';

/**
 * @ngdoc function
 * @name jwtApp.controller:JobsCtrl
 * @description
 * # JobsCtrl
 * Controller of the jwtApp
 */
angular.module('jwtApp')
  .controller('JobsCtrl', function ($scope, $http, alert, API_URL) {

    $http.get(API_URL + 'jobs').success(function(jobs){
      alert('some jobs');
      $scope.jobs = jobs;
    }).error(function(err){
      alert('warning', 'Unable to get jobs', err.message);
    });
  });
