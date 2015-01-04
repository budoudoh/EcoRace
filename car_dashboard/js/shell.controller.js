(function () {
    angular
        .module('app')
        .controller('shell', shellCtrl);


    function shellCtrl($location, $scope, $timeout, dataservice) {
        var shell = this;


        shell.navVisible = false;

        shell.showMenu = showMenu;
        shell.goToTrips = goToTrips;
        shell.goToHome = goToHome;
        shell.carState = 'parked';

        activate();

        function activate() {
            console.log('shell Controller Loaded');
        }

        function showMenu(show) {
            console.log('Open nav');
            shell.navVisible  = show;
        }

        function goToTrips() {
            $location.path( '/trips' );
            shell.navVisible  = false;
        }

        function goToHome() {
            $location.path( '/' );
            shell.navVisible  = false;
        }

        $scope.$on('$locationChangeStart', function() {
            switch ($location.path()){
                case '/park':
                    shell.title = 'My Summary';
                    break;
                case '/drive':
                    shell.title = 'Current Trip';
                    break;
                case '/':
                    shell.title = 'Trip Summary';
                    break;
            }   
        });

        (function tick() {
            getCar();
            $timeout(tick, 1000);
        
    })();

        function getCar(){
            console.log('Getting car state');
            dataservice.car.get().then(function (data) {
                console.log(data);
                switch (shell.carState) {
                    case 'parked':
                        if (data.drive === true) {
                            //This should mark the transition from park into drive.  We should start polling instantaneous data and doing cool calculations
                            shell.carState = 'drive';
                            console.log('Now entering drive mode');
                            $location.path( '/drive' );
                        } else {
                            console.log('We are still in the initial park mode');
                            $location.path( '/park' );
                        }
                        
                    break;
                    case 'drive':
                        if (data.parked === true) {
                            //This should mark the transition from drive into park.  We should stop polling and calculating and switch to the trip summary screen
                            shell.carState = 'endTrip';
                            console.log('Now ending park mode');
                            $location.path( '/' );
                        }
                        console.log('We are still in drive mode');
                    break;
                }
            });
        }
    }
})();
