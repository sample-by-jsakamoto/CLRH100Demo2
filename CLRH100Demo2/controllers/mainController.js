var CLRH100Demo2;
(function (CLRH100Demo2) {
    var MainController = (function () {
        function MainController() {
            this.shutterOpened = false;
        }
        MainController.prototype.onClickToggleButton = function () {
            this.shutterOpened = !this.shutterOpened;
        };
        return MainController;
    }());
    CLRH100Demo2.MainController = MainController;
    angular.module('mainApp').controller('mainController', [MainController]);
})(CLRH100Demo2 || (CLRH100Demo2 = {}));
//# sourceMappingURL=mainController.js.map