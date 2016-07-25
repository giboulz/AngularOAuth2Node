'use strict';

angular
    .module('frontEndApp').config(function ($urlRouterProvider, $stateProvider, $httpProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider.

        state('main', {
            url: '/',
            templateUrl: '/views/main.html'

        })

        .state('logout', {
                url: '/logout',
                controller: 'LogoutCtrl'
            })
            .state('jobs', {
                url: '/jobs',
                templateUrl: '/views/jobs.html',
                controller: 'JobsCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: '/views/login.html',
                controller: 'LoginCtrl'
            })


        .state('register', {
            url: '/register',
            templateUrl: '/views/register.html',
            controller: 'RegisterCtrl'

        });

        $httpProvider.interceptors.push('authInterceptor');
    })

.constant('API_URL', 'http://localhost:3000/');