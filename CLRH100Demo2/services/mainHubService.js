var CLRH100Demo2;
(function (CLRH100Demo2) {
    var MainHubService = (function () {
        function MainHubService($rootScope) {
            var _this = this;
            this.$rootScope = $rootScope;
            this.connectionState = 0 /* Connecting */;
            var conn = $.hubConnection();
            this.hub = conn.createHubProxy("MainHub");
            this.hub.on('updateHostState', function (newState) { return $rootScope.$apply(function () { return _this.onUpdateHostState(newState); }); });
            this.hub.on('requestCurrentState', function () { return $rootScope.$apply(function () { return _this.onRequestCurrentState(); }); });
            this.hub.on('requestToggleState', function () { return $rootScope.$apply(function () { return _this.onRequestToggleState(); }); });
            // SiganlR 切断時の再接続処理を配線
            var timerState = { id: null };
            conn.stateChanged(function (args) {
                $rootScope.$apply(function () { return _this.connectionState = args.newState; });
                if (args.newState == 1 /* Connected */) {
                    $rootScope.$emit('connectedToHub');
                }
                if (args.newState == 4 /* Disconnected */) {
                    if (timerState.id == null) {
                        timerState.id = setInterval(function () { return conn.start(); }, 5000);
                    }
                }
                else if (timerState.id != null) {
                    clearInterval(timerState.id);
                    timerState.id = null;
                }
            });
            var settings = {};
            if (/\.ngrok\.io$/.test(location.host))
                settings.transport = 'longPolling';
            conn
                .start(settings)
                .then(function () { return $rootScope.$apply(function () {
                $rootScope.$emit('connectedToHub');
            }); });
        }
        MainHubService.prototype.setHostState = function (state) {
            if (this.connectionState == 1 /* Connected */)
                this.hub.invoke('SetHostState', state);
        };
        MainHubService.prototype.requestCurrentState = function () {
            if (this.connectionState == 1 /* Connected */)
                this.hub.invoke('RequestCurrentState');
        };
        MainHubService.prototype.requestToggleState = function () {
            if (this.connectionState == 1 /* Connected */)
                this.hub.invoke('RequestToggleState');
        };
        MainHubService.prototype.onUpdateHostState = function (newState) {
            this.$rootScope.$emit('updateHostState', newState);
        };
        MainHubService.prototype.onRequestCurrentState = function () {
            this.$rootScope.$emit('requestCurrentState');
        };
        MainHubService.prototype.onRequestToggleState = function () {
            this.$rootScope.$emit('requestToggleState');
        };
        return MainHubService;
    }());
    CLRH100Demo2.MainHubService = MainHubService;
    angular.module('CLRH100Demo2.Services', [])
        .service('mainHub', ['$rootScope', MainHubService]);
})(CLRH100Demo2 || (CLRH100Demo2 = {}));
//# sourceMappingURL=mainHubService.js.map