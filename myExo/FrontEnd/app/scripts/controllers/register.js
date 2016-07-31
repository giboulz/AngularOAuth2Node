'use strict';
angular.module('frontEndApp').controller('RegisterCtrl', function ($scope, alert, auth) {
    $scope.submit = function () {

        auth.register($scope.email, $scope.password).success(function (res) {
            alert('success', 'OK! ', 'le compte a été créé' + res.user.email + '!');
            console.log(res);

        }).error(function (err) {
            alert('warning', 'Opps!', 'Could not register : ');
            console.log(err);
        });
    };
});