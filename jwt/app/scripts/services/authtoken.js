'use strict';

angular.module('jwtApp')
  .factory('authToken', function ($window) {
    var storage = $window.localStorage;
    var cachedToken;

    var authToken = {
      setToken : function(token) {
        cachedToken = token;
        storage.setItem('userToken', token);
      },
      getToken: function() {
        return (cachedToken) ? cachedToken : storage.getItem('userToken');
      },
      isAuthenticated: function(){
        return !!authToken.getToken();
      },
      removeToken: function() {
        cachedToken = null;
        storage.removeItem('userToken');
      }
    };

    return authToken;
  });
