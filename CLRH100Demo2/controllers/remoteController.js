var CLRH100Demo2;
(function (CLRH100Demo2) {
    var RemoteController = (function () {
        function RemoteController($rootScope, mainHub) {
            var _this = this;
            this.$rootScope = $rootScope;
            this.mainHub = mainHub;
            this.state = {
                shutterOpened: false,
                enableRemoteControl: false
            };
            $rootScope.$on('updateHostState', function (event, newState) { return _this.onUpdateHostState(newState); });
            // 初期状態要求をホストに通知
            if (mainHub.connectionState != 1 /* Connected */) {
                $rootScope.$on('connectedToHub', function () { return mainHub.requestCurrentState(); });
            }
            else {
                mainHub.requestCurrentState();
            }
        }
        RemoteController.prototype.onClickToggleButton = function () {
            this.mainHub.requestToggleState();
        };
        RemoteController.prototype.onUpdateHostState = function (newState) {
            this.state = newState;
        };
        return RemoteController;
    }());
    CLRH100Demo2.RemoteController = RemoteController;
    angular.module('CLRH100Demo2').controller('remoteController', ['$rootScope', 'mainHub', RemoteController]);
})(CLRH100Demo2 || (CLRH100Demo2 = {}));
//# sourceMappingURL=remoteController.js.map