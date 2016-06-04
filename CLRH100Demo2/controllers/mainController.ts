namespace CLRH100Demo2 {
    export class MainController {

        public shutterOpened: boolean;

        constructor() {
            this.shutterOpened = false;
        }

        public onClickToggleButton(): void {
            this.shutterOpened = !this.shutterOpened;
        }
    }

    angular.module('mainApp').controller('mainController', [MainController]);
}