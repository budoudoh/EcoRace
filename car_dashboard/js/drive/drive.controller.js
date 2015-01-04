(function () {
    angular
        .module('app')
        .controller('drive', driveCtrl);


    function driveCtrl(dataservice, $scope) {
        var drive = this;

        drive.selectTrip = selectTrip;
        drive.progressColor = progressColor;

        drive.selectedTrip = null;

        activate();

        function activate() {
            console.log('trip Controller Loaded');
            getUser();
            getFriends();
        }

        function getUser() {
            dataservice.user.get().then(function (data) {
                console.log(data);
                drive.user = data;
            });
        }

        function getFriends() {
            dataservice.friends.get().then(function (data) {
                console.log(data);
                drive.friends = data;
            });
        }

        function selectTrip(trip) {
            drive.selectedTrip = trip;
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

        $scope.$on('metricChange', function(event, data) {
            console.log('metric change');
            drive.user.currentTrip.fuelUsed = data.fuel;
            drive.user.currentTrip.metrics.speed = data.speed;
            drive.user.currentTrip.metrics.ac = data.ac;
            drive.user.currentTrip.metrics.tirePressure = data.tirePressure;
            drive.user.currentTrip.score = Math.round(data.efficiency);
            console.log(data.speed);
        });
    }
})();
