(function () {
    angular
        .module('app')
        .controller('shell', shellCtrl);


    function shellCtrl($location, $scope) {
        var shell = this;


        shell.navVisible = false;

        shell.showMenu = showMenu;
        shell.goToTrips = goToTrips;
        shell.goToHome = goToHome;

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
                case '/':
                    shell.title = '';
                    break;
                case '/trips':
                    shell.title = 'my trips';
                    break;
            }   
        });



        
    }
})();
