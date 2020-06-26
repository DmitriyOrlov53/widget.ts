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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreForObjects = exports.StoreForArrays = void 0;
var Store = /** @class */ (function () {
    function Store() {
    }
    Store.prototype.forEach = function (callback) {
        var _this = this;
        var cleanFields = __assign({}, this.fields);
        Object.keys(cleanFields).forEach(function (key) { return callback(_this.fields[key], key); });
    };
    Store.prototype.get = function (key) {
        return this.fields[key];
    };
    Store.prototype.getAll = function () {
        return this.fields;
    };
    Store.prototype.set = function (key, value) {
        this.fields[key] = value;
        return this;
    };
    return Store;
}());
var StoreForArrays = /** @class */ (function (_super) {
    __extends(StoreForArrays, _super);
    function StoreForArrays() {
        var fields = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fields[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this.fields = fields;
        return _this;
    }
    StoreForArrays.prototype.push = function (value) {
        this.fields.push(value);
    };
    StoreForArrays.prototype.pop = function () {
        this.fields.pop();
    };
    return StoreForArrays;
}(Store));
exports.StoreForArrays = StoreForArrays;
var StoreForObjects = /** @class */ (function (_super) {
    __extends(StoreForObjects, _super);
    function StoreForObjects(fields) {
        var _this = _super.call(this) || this;
        _this.fields = fields ? fields : {};
        return _this;
    }
    StoreForObjects.prototype.push = function (value) {
        var keys = Object.keys(value);
        if (keys.length > 1)
            throw new Error;
        var fields = this.fields;
        this.fields = __assign(__assign({}, fields), value);
    };
    StoreForObjects.prototype.pop = function () {
        var keys = Object.keys(this.fields);
        var lastKey = keys[keys.length - 1];
        delete this.fields[lastKey];
    };
    return StoreForObjects;
}(Store));
exports.StoreForObjects = StoreForObjects;
