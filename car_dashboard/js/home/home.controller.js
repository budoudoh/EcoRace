(function () {
    angular
        .module('app')
        .controller('home', homeCtrl);


    function homeCtrl(dataservice) {
        var home = this;



        activate();

        function activate() {
            getUser();
            getFriends();
        }

        function getUser() {
            dataservice.user.get().then(function (data) {
                console.log(data);
                home.user = data;
            });
        }

        function getFriends() {
            dataservice.friends.get().then(function (data) {
                console.log(data);
                home.friends = data;
            });
        }
    }
})();
