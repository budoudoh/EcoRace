(function () {
    angular
        .module('app')
        .controller('modal', ['$modalInstance', modal]);



    function modal($modalInstance) {
        var modal = this;
        

        activate();

        function activate() {
            
        }

        modal.ok = function () {
            $modalInstance.close(true);
        };

        modal.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        modal.no = function () {
            modal.showSecondaryMessage = true;
        };

        modal.continue = function () {
            $modalInstance.close(false);
        };
    }
})();
