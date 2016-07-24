'use strict';
/**
 * @ngdoc service
 * @name frontEndApp.authToken
 * @description
 * # authToken
 * Factory in the frontEndApp.
 */
angular.module('frontEndApp').factory('authToken', function ($window) {
    var storage = $window.localStorage;
    var cachedToken;
    var userToken = 'userToken'; 
    // Public API here
    var authToken =  {
        setToken: function (token) {
            //permet de garder le token en cache, et pas d'aller le chercher dans le local storage a chaque fois.
            cachedToken = token;
            storage.setItem('userToken', token);
        },
        getToken: function () {
            if (!cachedToken) {
                cachedToken = storage.getItem(userToken);
            }
            return cachedToken;
        },
        isAuthenticated: function () {
            return !!authToken.getToken();
        }, 
        removeToken: function(){
            cachedToken = null; 
            storage.removeItem(userToken); 
        }
    }; 
    
    return authToken; 
});