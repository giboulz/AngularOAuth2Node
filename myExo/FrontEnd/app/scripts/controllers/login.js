'use strict';


angular.module('frontEndApp')
    .controller('LoginCtrl', function ($scope, $rootScope, $http, alert, authToken, API_URL) {
        $scope.submit = function () {
            var url = API_URL + 'login';
            var user = {
                email: $scope.email,
                password: $scope.password
            };
            $http.post(url, user).success(function (res) {
                alert('success', 'login success mec !! ', 'RE bienvenue!');
                console.log(res);
                authToken.setToken(res.token);
            }).error(function (err) {
                alert('warning', 'Something went wrong :( !', 'pas bon password');
                console.log(err);
            });
        };
    });