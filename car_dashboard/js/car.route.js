(function () {
    'use strict';
    angular
        .module('app')
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when(
                    '/',
                    {
                        controller: 'home',
                        controllerAs: 'home',
                        templateUrl: 'js/home/home.html'
                    }
                )
                .when(
                    '/park',
                    {
                        controller: 'home',
                        controllerAs: 'home',
                        templateUrl: 'js/home/home.html'
                    }
                )
                .when(
                    '/drive',
                    {
                        controller: 'home',
                        controllerAs: 'home',
                        templateUrl: 'js/home/home.html'
                    }
                );
        }]);
}) ();
