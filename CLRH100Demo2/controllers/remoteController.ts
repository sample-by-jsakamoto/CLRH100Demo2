namespace CLRH100Demo2 {
    export class RemoteController {

        public state: HostState;

        public get connected(): boolean {
            return this.mainHub.connectionState == SignalRConnState.Connecting ||
                this.mainHub.connectionState == SignalRConnState.Connected;
        }

        constructor(private $rootScope: ng.IRootScopeService, private mainHub: MainHubService) {
            this.state = {
                shutterOpened: false,
                enableRemoteControl: true
            };

            $rootScope.$on('updateHostState', (event, newState) => this.onUpdateHostState(newState));
            $rootScope.$on('connectedToHub', () => mainHub.requestCurrentState());

            // 初期状態要求をホストに通知
            if (mainHub.connectionState == SignalRConnState.Connected) {
                mainHub.requestCurrentState();
            }
        }

        public onClickToggleButton(): void {
            this.mainHub.requestToggleState();
        }

        private onUpdateHostState(newState: HostState): void {
            this.state = newState;
        }
    }

    angular.module('CLRH100Demo2').controller('remoteController', ['$rootScope', 'mainHub', RemoteController]);
}