namespace CLRH100Demo2 {
    export class HostController {

        public state: HostState;

        constructor(private $rootScope: ng.IRootScopeService, private mainHub: MainHubService) {
            this.state = {
                shutterOpened: false,
                enableRemoteControl: false
            };

            $rootScope.$on('requestCurrentState', () => this.onRequestCurrentState());
            $rootScope.$on('requestToggleState', () => this.onRequestToggleState());
            $rootScope.$watch(() => this.state, () => this.mainHub.setHostState(this.state), true);

            // 初期状態を全リモートコントローラに通知
            if (mainHub.connectionState != SignalRConnState.Connected) {
                $rootScope.$on('connectedToHub', () => mainHub.setHostState(this.state));
            }
            else {
                mainHub.setHostState(this.state);
            }
        }

        private toggleState(): void {
            this.state.shutterOpened = !this.state.shutterOpened;
        }

        public onClickToggleButton(): void {
            this.toggleState();
        }

        private onRequestToggleState(): void {
            if (this.state.enableRemoteControl)
                this.toggleState();
        }

        private onRequestCurrentState(): void {
            this.mainHub.setHostState(this.state);
        }
    }

    angular.module('CLRH100Demo2').controller('hostController', ['$rootScope', 'mainHub', HostController]);
}