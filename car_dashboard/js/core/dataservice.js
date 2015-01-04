(function () {
    /** This handles all interaction with the server.  
    * @class app.core.dataservice
    * @memberOf app.core    
    */
    angular
        .module('app')
        .factory('dataservice', dataservice); 

    /* @ngInject */
    function dataservice($http, $location, $q, userUrl, friendsUrl, carInitUrl, m2xUrl, carChangeUrl) {
        var user = {};

        var testServiceFlip = true;

        var service = {
            user: {
                get: getUser,
                getCache: getUserCache
            },
            friends: {
                get: getFriends
            },
            car: {
                get: getCar
            },
            m2x: {
                post: postTripData
            }
        };

        return service;


        function getCar(){
            var url = carInitUrl;
            if (testServiceFlip) {
                url = carChangeUrl;
            }

            return $http.get(buildUrl(url), {
                    params: {}
                })
                .then(getCarComplete)
                .catch(function(message) {
                    console.log(message);
                });

            function getCarComplete(data) {
                var results = [];
                if (data.data){
                    results = data.data;
                    testServiceFlip = true;
                }

                return results;
            }
        }

        function getFriends(){
            return $http.get(buildUrl(friendsUrl), {
                    params: {}
                })
                .then(getFriendsComplete)
                .catch(function(message) {
                    console.log(message);
                });

            function getFriendsComplete(data) {
                var results = [];
                if (data.data){
                    results = data.data;
                }

                return results;
            }
        }

        function getUserCache() {
            return user;
        }

        function getUser(userId){
            return $http.get(buildUrl(userUrl), {
                    params: {}
                })
                .then(getUserComplete)
                .catch(function(message) {
                    console.log(message);
                });

            function getUserComplete(data) {
                var results = [];
                if (data.data){
                    results = user = data.data;
                }

                return results;
            }
        }

        function postTripData(data) {
            return $http.put(buildUrl(m2xUrl), data, {
                    headers: {
                        'X-M2X-KEY': '594ff310060a6be0185d893e67875292'
                    }
                })
                .then(postTripDataComplete)
                .catch(function(message) {
                    console.log(message);
                });

            function postTripDataComplete(data) {
                var results = [];
                if (data.data){
                    results = data.data;
                }

                return results;
            }
        }

        function buildUrl(uri){
            var url = uri;

            

            return url;
        }
    }
})();
