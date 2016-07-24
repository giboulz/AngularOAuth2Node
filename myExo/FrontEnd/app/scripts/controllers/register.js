'use strict';
angular.module('frontEndApp').controller('RegisterCtrl', function ($scope, $rootScope, $http, alert, authToken) {
    $scope.submit = function () {
        var url = 'http://localhost:3000/register';
        var user = {
            email: $scope.email,
             password: $scope.password
        };
        $http.post(url, user).success(function (res) {
            alert('success', 'OK! ', 'le compte a été créé'+ res.user.email + '!');
            console.log(res);
            authToken.setToken(res.token); 
        }).error(function (err) {
            alert('warning', 'Opps!', 'Could not register');
            console.log(err);
        });
    };
});