'use strict';

/**
 * @ngdoc service
 * @name frontEndApp.auth
 * @description
 * # auth
 * Service in the frontEndApp.
 */
angular.module('frontEndApp')
    .service('auth', function ($http, API_URL, authToken) {
        var url = API_URL + 'login';

        this.login = function (email, password) {
            return $http.post(url, {
                email: email,
                password: password
            }).success(function (res) {
                authToken.setToken(res.token);
            });
        };

    });