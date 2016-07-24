'use strict';


angular.module('frontEndApp')
  .controller('JobsCtrl', function ($scope, $http, API_URL, alert) {
    
    $http.get(API_URL+'jobs' ).success(function(data){
        $scope.jobs = data; 
    }).error(function(err){
        alert('warning', 'echec de la récupération des jobs', err.message); 
    }); 

  });
