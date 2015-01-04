(function () {
    angular
        .module('app')
        .controller('park', parkCtrl);


    function parkCtrl(dataservice) {
        var park = this;

        park.selectTrip = selectTrip;
        park.progressColor = progressColor;

        park.selectedTrip = null;

        activate();

        function activate() {
            console.log('trip Controller Loaded');
            getUser();
            getFriends();
        }

        function getUser() {
            dataservice.user.get().then(function (data) {
                console.log(data);
                park.user = data;
            });
        }

        function getFriends() {
            dataservice.friends.get().then(function (data) {
                console.log(data);
                park.friends = data;
            });
        }

        function selectTrip(trip) {
            park.selectedTrip = trip;
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
