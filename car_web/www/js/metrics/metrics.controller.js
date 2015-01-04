(function () {
    angular
        .module('app.metrics')
        .controller('metrics', [metricsCtrl]);


    function metricsCtrl() {
        var metrics = this;

        activate();

        function activate() {
            console.log('Metric Controller Loaded');
        }

        
    }
})();
