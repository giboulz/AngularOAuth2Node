'use strict';


angular.module('frontEndApp')
  .controller('LogoutCtrl', function (authToken, $state) {
    authToken.removeToken(); 
    $state.go('main'); 
  });
