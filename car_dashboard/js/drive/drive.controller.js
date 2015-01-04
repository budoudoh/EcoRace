(function () {
    angular
        .module('app')
        .controller('drive', driveCtrl);


    function driveCtrl(dataservice) {
        var drive = this;

        drive.selectTrip = selectTrip;
        drive.progressColor = progressColor;

        drive.selectedTrip = null;

        activate();

        function activate() {
            console.log('trip Controller Loaded');
            drive.user = dataservice.user.getCache();
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
    }
})();
