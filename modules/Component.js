"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
var Store_1 = require("./Store");
var State_1 = require("./State");
var Message_1 = require("./Message");
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.prototype.setStates = function (states) {
        var _a;
        var storeStates = new Store_1.StoreForObjects();
        for (var key in states) {
            storeStates.push((_a = {}, _a[key] = new State_1.State(this, states[key]), _a));
        }
        return storeStates;
    };
    Component.prototype.setSender = function () {
        return new Message_1.Sender;
    };
    Component.prototype.setRecipient = function (handlers, senders) {
        return new Message_1.Recipient(this, handlers, senders);
    };
    return Component;
}());
exports.Component = Component;
