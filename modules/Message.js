"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipient = exports.Sender = void 0;
var Store_1 = require("./Store");
var Sender = /** @class */ (function () {
    function Sender() {
        this.recipients = new Store_1.StoreForArrays();
    }
    Sender.prototype.sendMessage = function (message) {
        this.recipients.fields.forEach(function (recipient) {
            recipient.getMessage(message);
        });
    };
    Sender.prototype.addRecipient = function (recipient) {
        this.recipients.push(recipient);
        return this;
    };
    return Sender;
}());
exports.Sender = Sender;
var Recipient = /** @class */ (function () {
    function Recipient(context, handlers, senders) {
        var _this = this;
        this.context = context;
        this.handlers = new Store_1.StoreForObjects(handlers);
        senders && senders.forEach(function (sender) { return _this.addSender(sender); });
    }
    Recipient.prototype.getMessage = function (message) {
        var handler = this.handlers.get(message);
        handler && handler.call(this.context);
    };
    Recipient.prototype.addSender = function (sender) {
        sender.addRecipient(this);
        return this;
    };
    return Recipient;
}());
exports.Recipient = Recipient;
