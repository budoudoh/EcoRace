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
            park.user = dataservice.user.getCache();
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
