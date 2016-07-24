'use strict';
angular.module('frontEndApp').controller('HeaderCtrl', function ($scope, authToken) {
    $scope.isAuthenticated = authToken.isAuthenticated; 
    
});