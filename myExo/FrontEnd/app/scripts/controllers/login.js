'use strict';


angular.module('frontEndApp')
    .controller('LoginCtrl', function ($scope, $rootScope, alert, auth) {
        $scope.submit = function () {

            auth.login($scope.email, $scope.password).success(function (res) {
                alert('success', 'login success mec !! ', 'RE bienvenue!');
                console.log(res);
                
            }).error(function (err) {
                alert('warning', 'Something went wrong :( !', 'pas bon password');
                console.log(err);
            });
        };
    });