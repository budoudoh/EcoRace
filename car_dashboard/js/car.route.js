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
                        controller: 'park',
                        controllerAs: 'park',
                        templateUrl: 'js/park/park.html'
                    }
                )
                .when(
                    '/drive',
                    {
                        controller: 'drive',
                        controllerAs: 'drive',
                        templateUrl: 'js/drive/drive.html'
                    }
                );
        }]);
}) ();
