"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logic = void 0;
var Component_1 = require("./Component");
var Logic = /** @class */ (function (_super) {
    __extends(Logic, _super);
    function Logic(Main) {
        var _this = _super.call(this) || this;
        _this.Main = Main;
        return _this;
    }
    return Logic;
}(Component_1.Component));
exports.Logic = Logic;
