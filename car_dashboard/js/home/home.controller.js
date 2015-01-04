(function () {
    angular
        .module('app')
        .controller('home', homeCtrl);


    function homeCtrl(dataservice) {
        var home = this;

        home.progressColor = progressColor;

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

        function progressColor(value) {
            var color = "green";
            if (value < 20) {
                color = 'red';
            } else if (value >= 20 && value < 40){
                color = 'orange';
            } else if (value >= 40 && value < 75){
                color = 'yellow';
            }


            return color;
        }
    }
})();
