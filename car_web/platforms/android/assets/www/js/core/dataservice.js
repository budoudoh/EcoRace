(function () {
    /** This handles all interaction with the server.  
    * @class app.core.dataservice
    * @memberOf app.core    
    */
    angular
        .module('app')
        .factory('dataservice', dataservice); 

    /* @ngInject */
    function dataservice($http, $location, $q, userUrl, friendsUrl) {
        var user = {};

        var service = {
            user: {
                get: getUser,
                getCache: getUserCache
            },
            friends: {
                get: getFriends
            }
        };

        return service;

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

        function buildUrl(uri){
            var url =  uri;

            

            return url;
        }
    }
})();
