'use strict';
angular.module('readAnalytics', ['ngRoute'])
  .config(function ($locationProvider) {
    $locationProvider.html5Mode(true);    
  }).factory('authInterceptor',
  function ($q) {
    return {

      request: function (config) {
        config.headers = config.headers || {};
        if (sessionStorage.getItem('token')) {
          config.headers.Authorization = 'Bearer ' + sessionStorage.setItem('token');
        }
        return config;
      },

      responseError: function (response) {
        if (response.status === 401) {
          $location.path('/');
          sessionStorage.removeItem('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }

    };
  })
  .run(function ($rootScope) { });
