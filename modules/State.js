"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
var State = /** @class */ (function () {
    function State(context, params) {
        this.callbacks = [];
        this.binds = [];
        this.context = context;
        var value = params.value, callbacks = params.callbacks, binds = params.binds, reverseBinds = params.reverseBinds;
        this.cache = value;
        binds && this.setBinds(binds);
        reverseBinds && this.setReverseBinds(reverseBinds);
        callbacks && this.addCallbacks.apply(this, callbacks);
    }
    State.prototype.setBinds = function (binds) {
        var _this = this;
        binds.forEach(function (bind) { return _this.setBind(bind); });
    };
    State.prototype.setReverseBinds = function (binds) {
        var _this = this;
        binds.forEach(function (bind) { return _this.setReverseBind(bind); });
    };
    State.prototype.paramValidator = function (params) {
        return function (someParam) {
            for (var _i = 0, params_1 = params; _i < params_1.length; _i++) {
                var param = params_1[_i];
                if (param === someParam)
                    return true;
            }
            return false;
        };
    };
    State.prototype.value = function (value) {
        var _this = this;
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var hasParam = this.paramValidator(params);
        if (value !== undefined && (hasParam('forcibly') || value !== this.cache)) {
            this.cache = value;
            !hasParam('nobind') && this.updateBinds(value);
            this.callbacks.forEach(function (callback) {
                callback.call(_this.context, _this.cache);
            });
        }
        return this.cache;
    };
    State.prototype.updateBinds = function (value) {
        for (var _i = 0, _a = this.binds; _i < _a.length; _i++) {
            var bind = _a[_i];
            bind.value(value);
        }
    };
    State.prototype.addCallbacks = function () {
        var _this = this;
        var callbacks = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            callbacks[_i] = arguments[_i];
        }
        callbacks.forEach(function (callback) {
            _this.callbacks.push(callback);
        });
        return this;
    };
    State.prototype.setBind = function (bind) {
        this.binds.push(bind);
        return this;
    };
    State.prototype.setReverseBind = function (bind) {
        bind.binds.push(this);
        return this;
    };
    return State;
}());
exports.State = State;
