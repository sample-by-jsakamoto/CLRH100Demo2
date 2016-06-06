namespace CLRH100Demo2 {

    /** SignalR の接続状態を示す定数です。 */
    export const enum SignalRConnState {
        Connecting = 0,
        Connected = 1,
        Reconnectiong = 2,
        Disconnected = 4
    }

    export class MainHubService {

        private hub: HubProxy;

        /** サーバー(SignalR)との接続状態 */
        public connectionState: SignalRConnState;

        constructor(private $rootScope: ng.IRootScopeService) {
            this.connectionState = SignalRConnState.Connecting;

            var conn = $.hubConnection();
            this.hub = conn.createHubProxy("MainHub");
            this.hub.on('updateHostState', (newState) => $rootScope.$apply(() => this.onUpdateHostState(newState)));
            this.hub.on('requestCurrentState', () => $rootScope.$apply(() => this.onRequestCurrentState()));
            this.hub.on('requestToggleState', () => $rootScope.$apply(() => this.onRequestToggleState()));

            // SiganlR 切断時の再接続処理を配線
            var timerState = { id: null as number };
            conn.stateChanged(args => {
                $rootScope.$apply(() => this.connectionState = args.newState);

                if (args.newState == SignalRConnState.Connected) {
                    $rootScope.$emit('connectedToHub');
                }
                if (args.newState == SignalRConnState.Disconnected) {
                    if (timerState.id == null) {
                        timerState.id = setInterval(() => conn.start(), 5000);
                    }
                }
                else if (timerState.id != null) {
                    clearInterval(timerState.id);
                    timerState.id = null;
                }
            });

            var settings: any = {};
            if (/\.ngrok\.io$/.test(location.host)) settings.transport = 'longPolling';
            conn
                .start(settings)
                .then(() => $rootScope.$apply(() => {
                    $rootScope.$emit('connectedToHub');
                }));
        }

        public setHostState(state: HostState): void {
            if (this.connectionState == SignalRConnState.Connected)
                this.hub.invoke('SetHostState', state);
        }

        public requestCurrentState(): void {
            if (this.connectionState == SignalRConnState.Connected)
                this.hub.invoke('RequestCurrentState');
        }

        public requestToggleState(): void {
            if (this.connectionState == SignalRConnState.Connected)
                this.hub.invoke('RequestToggleState');
        }

        private onUpdateHostState(newState: HostState): void {
            this.$rootScope.$emit('updateHostState', newState);
        }

        private onRequestCurrentState(): void {
            this.$rootScope.$emit('requestCurrentState');
        }

        private onRequestToggleState(): void {
            this.$rootScope.$emit('requestToggleState');
        }
    }

    angular.module('CLRH100Demo2.Services', [])
        .service('mainHub', ['$rootScope', MainHubService]);
}