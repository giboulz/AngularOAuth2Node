'use strict';

/**
 * @ngdoc service
 * @name frontEndApp.auth
 * @description
 * # auth
 * Service in the frontEndApp.
 */
angular.module('frontEndApp')
    .service('auth', function ($http, API_URL, authToken, $state) {


        function authSuccessful(res) {
            authToken.setToken(res.token);
            //$state est un service de ui.router.
            $state.go('main');
        }


        this.login = function (email, password) {
            return $http.post(API_URL + 'login', {
                email: email,
                password: password
            }).success(authSuccessful);
        };

        this.register = function (email, password) {
            return $http.post(API_URL + 'register', {
                email: email,
                password: password
            }).success(authSuccessful);
        };



    });