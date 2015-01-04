(function () {
    angular
        .module('app')
        .controller('shell', shellCtrl);


    function shellCtrl($location, $scope, $timeout, dataservice, $rootScope) {
        var shell = this;


        shell.navVisible = false;

        shell.showMenu = showMenu;
        shell.goToTrips = goToTrips;
        shell.goToHome = goToHome;
        shell.start = start;
        shell.carState = 'parked';

        shell.tripDataCacheM2X = [];
        shell.tripDataCache = [];

        activate();

        function activate() {
            console.log('shell Controller Loaded');

            $location.path( '/park' );
            initDec()
            subscribeToCar();
        }

        function subscribeToCar() {
            console.log(drive.vehicleinfo);
            //drive.vehicleinfo.subscribe(getCarSubscibe, logError);
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

        function logError() {
            console.log('Car Error');
        }

        function start() {
            (function tick() {
                getCar();
                $timeout(tick, 1000);
            })();
        }

        function getCar(){
            console.log('Getting car state');
            var currentState = {};
            if (shell.carState !== 'endTrip') {
                dataservice.car.get().then(function (data) {
                    console.log(data);
                    currentState = updateDataPoint(data);
                    addDataPoint(currentState);
                    switch (shell.carState) {
                        case 'parked':
                            if (currentState.value.ignition.vehiclePowerMode === 'running' && currentState.value.transmission.transmissionMode === 'Drive') {
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
                            if (currentState.value.ignition.vehiclePowerMode === 'off' && currentState.value.transmission.transmissionMode === 'Park') {
                                //This should mark the transition from drive into park.  We should stop polling and calculating and switch to the trip summary screen
                                shell.carState = 'endTrip';
                                console.log('Now ending park mode');
                                $location.path( '/' );
                                postM2x();
                            } else {
                                console.log('We are still in drive mode');
                            }
                        break;
                    }
                });
            }
            
        }

        function getCarSubscibe(data){
            console.log('Getting car state');
            var currentState = {};
            
                console.log(data);
                currentState = updateDataPoint(data);
                addDataPoint(currentState);
                switch (shell.carState) {
                    case 'parked':
                        if (currentState.value.ignition.vehiclePowerMode === 'running' && currentState.value.transmission.transmissionMode === 'Drive') {
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
                        if (currentState.value.ignition.vehiclePowerMode === 'off' && currentState.value.transmission.transmissionMode === 'Park') {
                            //This should mark the transition from drive into park.  We should stop polling and calculating and switch to the trip summary screen
                            shell.carState = 'endTrip';
                            console.log('Now ending park mode');
                            $location.path( '/' );
                            postM2x();
                        } else {
                            console.log('We are still in drive mode');
                        }
                    break;
                }
           
        }


        function updateDataPoint(newData) {
            var lastDataPoint = shell.tripDataCache[shell.tripDataCache.length - 1];
            var newDataPoint = angular.copy(lastDataPoint);

            var testCounterForTestData = shell.tripDataCache.length < newData.length ? shell.tripDataCache.length - 1 : newData.length - 1;

            if ( shell.tripDataCache.length === 0) {
                newDataPoint = newData[0];
            } else {
                //We need to figure out what changed and update the object
                for (var k in newData[testCounterForTestData].value) {
                    newDataPoint.value[k] = newData[testCounterForTestData].value[k];
                }
                //Let's calculate some metrics
                calcMetrics();
            }

            return newDataPoint;
        }

        function addDataPoint (currentState) {
            var date = new Date();

            shell.tripDataCache.push(currentState);

            var dataPoint = {
                timestamp: date.toISOString(),
                value: JSON.stringify(currentState)
            };

            shell.tripDataCacheM2X.push(dataPoint);
        }

        function postM2x() {
            
            for (var k in shell.tripDataCacheM2X) {
                dataservice.m2x.post(shell.tripDataCacheM2X[k]).then(function () {
                    console.log('Just posted to M2X');
                });
            }
        }

        function currentFuelUsage(){
            var initialFuelLevel = shell.tripDataCache[0].value.fuel.level;
            var currentFuelLevel = shell.tripDataCache[shell.tripDataCache.length - 1].value.fuel.level;

            shell.currentMetrics.fuel = initialFuelLevel - currentFuelLevel;

        }

        function currentSpeed(){
            var currentSpeedLevel = shell.tripDataCache[shell.tripDataCache.length - 1].value.vehicleSpeed.speed;


            shell.currentMetrics.speed = currentSpeedLevel;

        }

        function currentAC(){
            var currentACLevel = 0;
            var climateControls = shell.tripDataCache[shell.tripDataCache.length - 1].value.climateControl;
            var acOn = _.find(climateControls.zones, { 'airConditioning': "true" });
            console.log('AC on' + acOn);
            if (acOn !== undefined) {
                currentACLevel += 50;
            }


            shell.currentMetrics.ac = currentACLevel;

        }
		
		function currentTirePressure(){
			
			var currentTirePressure = 0;
            var tirePressure = shell.tripDataCache[shell.tripDataCache.length - 1].value.tire;
            
            console.log(tirePressure.zones);
            
            
           	for (var i = 0; i < tirePressure.zones.length; i++)
           	{
           		var temp = tirePressure.zones[i];
           		currentTirePressure += parseInt(temp.pressure);
           	}
           	
           	currentTirePressure = (currentTirePressure/40) * 100;
			shell.currentMetrics.tirePressure = currentTirePressure;		
		}
		
        function calcMetrics() {
            shell.currentMetrics = {};
            currentFuelUsage();
            currentSpeed();
            currentAC();
			currentTirePressure();

            $scope.$broadcast('metricChange', shell.currentMetrics);

        }
        
        // AT&T DRIVE DEC INIT
		function initDec() {
		    $rootScope.decInstance = {};
		    window.DecInstanceConstructor = function (inputParam) {
		        var input = inputParam;
		        var isOnline = input && input.successCode == '0';
		
		        function getSuccessObject() {
		            return isOnline ? input : null;
		        }
		
		        function getErrorObject() {
		            return !isOnline ? input : null;
		        }
		
		        function status() {
		            var returnObj = {};
		
		            returnObj.status = isOnline ? 'success' : 'error';
		            returnObj.message = isOnline ? input.successMessage : input.errorMessage;
		            returnObj.code = isOnline ? input.successCode : input.errorCode;
		
		            return returnObj;
		        }
		
		        return {
		            isOnline: isOnline,
		            status: status,
		            getSuccessObject: getSuccessObject,
		            getErrorObject: getErrorObject
		        };
		    };
		
		    function decCallback(decResponse) {
		        $rootScope.decInstance = new DecInstanceConstructor(decResponse);
		
		        decSetSubscriptions();
		    };
		
		    try {
		        // DO NOT REMOVE THE BELLOW COMMENT - used for grunt build process
		        init(decCallback, ["appmanager", "commerce", "connectivity", "identity", "media", "navigation", "notification", "policy", "sa", "search", "settings", "sms", "va", "vehicleinfo"], 'app');
		    } catch (e) {
		        $rootScope.decInstance = new DecInstanceConstructor({
		            "errorCode": e.code,
		            "errorMessage": e.message,
		            "thrownError": e
		        });
		    }
		}


    }
})();
