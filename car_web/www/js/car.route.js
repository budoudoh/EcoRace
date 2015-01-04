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
                    '/trips',
                    {
                        controller: 'trips',
                        controllerAs: 'trips',
                        templateUrl: 'js/trips/trips.html'
                    }
                )
                .when(
                    '/trip',
                    {
                        controller: 'home',
                        controllerAs: 'home',
                        templateUrl: 'js/home/home.html'
                    }
                )
                .when(
                    '/metrics',
                    {
                        controller: 'metrics',
                        controllerAs: 'metrics',
                        templateUrl: 'js/metrics/metrics.html'
                    }
                );
        }]);
}) ();
