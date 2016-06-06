namespace CLRH100Demo2 {
    export class RemoteController {

        public state: HostState;

        constructor(private $rootScope: ng.IRootScopeService, private mainHub: MainHubService) {
            this.state = {
                shutterOpened: false,
                enableRemoteControl: false
            };

            $rootScope.$on('updateHostState', (event, newState) => this.onUpdateHostState(newState));

            // 初期状態要求をホストに通知
            if (mainHub.connectionState != SignalRConnState.Connected) {
                $rootScope.$on('connectedToHub', () => mainHub.requestCurrentState());
            }
            else {
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