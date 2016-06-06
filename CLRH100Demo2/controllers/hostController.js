var CLRH100Demo2;
(function (CLRH100Demo2) {
    var HostController = (function () {
        function HostController($rootScope, mainHub) {
            var _this = this;
            this.$rootScope = $rootScope;
            this.mainHub = mainHub;
            this.state = {
                shutterOpened: false,
                enableRemoteControl: false
            };
            $rootScope.$on('requestCurrentState', function () { return _this.onRequestCurrentState(); });
            $rootScope.$on('requestToggleState', function () { return _this.onRequestToggleState(); });
            $rootScope.$watch(function () { return _this.state; }, function () { return _this.mainHub.setHostState(_this.state); }, true);
            // 初期状態を全リモートコントローラに通知
            if (mainHub.connectionState != 1 /* Connected */) {
                $rootScope.$on('connectedToHub', function () { return mainHub.setHostState(_this.state); });
            }
            else {
                mainHub.setHostState(this.state);
            }
        }
        HostController.prototype.toggleState = function () {
            this.state.shutterOpened = !this.state.shutterOpened;
        };
        HostController.prototype.onClickToggleButton = function () {
            this.toggleState();
        };
        HostController.prototype.onRequestToggleState = function () {
            if (this.state.enableRemoteControl)
                this.toggleState();
        };
        HostController.prototype.onRequestCurrentState = function () {
            this.mainHub.setHostState(this.state);
        };
        return HostController;
    }());
    CLRH100Demo2.HostController = HostController;
    angular.module('CLRH100Demo2').controller('hostController', ['$rootScope', 'mainHub', HostController]);
})(CLRH100Demo2 || (CLRH100Demo2 = {}));
//# sourceMappingURL=hostController.js.map