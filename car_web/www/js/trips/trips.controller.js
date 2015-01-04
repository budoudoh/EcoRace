(function () {
    angular
        .module('app')
        .controller('trips', tripsCtrl);


    function tripsCtrl(dataservice) {
        var trips = this;

        trips.selectTrip = selectTrip;
        trips.progressColor = progressColor;

        trips.selectedTrip = null;

        activate();

        function activate() {
            console.log('trip Controller Loaded');
            trips.user = dataservice.user.getCache();
        }

        function selectTrip(trip) {
            trips.selectedTrip = trip;
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
