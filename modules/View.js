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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootView = exports.ViewEvents = exports.View = void 0;
var DOMElement_1 = require("./DOMElement");
var Component_1 = require("./Component");
var Store_1 = require("./Store");
;
var AbstractView = /** @class */ (function (_super) {
    __extends(AbstractView, _super);
    function AbstractView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbstractView.prototype.createDOMElement = function (template) {
        return new DOMElement_1.DOMElement(template);
    };
    AbstractView.prototype.containerProp = function (prop, value) {
        if (value)
            this.element.container[prop] = value;
        return this.element.container[prop];
    };
    Object.defineProperty(AbstractView.prototype, "container", {
        get: function () {
            return this.element.container;
        },
        enumerable: false,
        configurable: true
    });
    return AbstractView;
}(Component_1.Component));
var SimpleView = /** @class */ (function (_super) {
    __extends(SimpleView, _super);
    function SimpleView(template) {
        var _this = _super.call(this) || this;
        _this.name = template.name;
        _this.element = _this.createDOMElement(template);
        _this.classes = _this.element.classes;
        _this.attributes = _this.element.attributes;
        return _this;
    }
    return SimpleView;
}(AbstractView));
var View = /** @class */ (function (_super) {
    __extends(View, _super);
    function View() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    View.prototype.setName = function (newName) {
        this.name = newName;
        return this;
    };
    View.prototype.createSimpleView = function (template) {
        return new SimpleView(template);
    };
    View.prototype.bindEvents = function () {
        var events = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            events[_i] = arguments[_i];
        }
        return new (ViewEvents.bind.apply(ViewEvents, __spreadArrays([void 0, this], events)))();
    };
    View.prototype.getChild = function (name) {
        var value;
        var handler = function (node) {
            if (node.name === name)
                value = node;
        };
        this.treeTrevesal(handler, this);
        return value;
    };
    View.prototype.treeTrevesal = function (handler, tree) {
        var callback = function (node) {
            handler(node);
            if (node.children) {
                node.children.forEach(function (child) { return callback(child); });
            }
        };
        callback(tree);
    };
    return View;
}(AbstractView));
exports.View = View;
var ViewEvents = /** @class */ (function (_super) {
    __extends(ViewEvents, _super);
    function ViewEvents(Context) {
        var events = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            events[_i - 1] = arguments[_i];
        }
        var _this = _super.apply(this, events) || this;
        _this.Context = Context;
        _this.fields.forEach(function (event) { return _this.addEvent(event); });
        return _this;
    }
    ViewEvents.prototype.addEvent = function (event) {
        event.block.addEventListener(event.name, event.callback.bind(this.Context), event.capture);
    };
    ViewEvents.prototype.removeEvent = function (event) {
        event.block.removeEventListener(event.name, event.callback.bind(this.Context), event.capture);
    };
    ViewEvents.prototype.push = function (event) {
        this.addEvent(event);
        _super.prototype.push.call(this, event);
    };
    ViewEvents.prototype.pop = function () {
        this.removeEvent(this.fields.slice(-1)[0]);
        _super.prototype.pop.call(this);
    };
    return ViewEvents;
}(Store_1.StoreForArrays));
exports.ViewEvents = ViewEvents;
var RootView = /** @class */ (function (_super) {
    __extends(RootView, _super);
    function RootView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hooks = [];
        return _this;
    }
    RootView.prototype.buildView = function () {
        var _this = this;
        var handler = function (node) {
            _this.appendChild(node);
            if (node.mounted) {
                _this.hooks.push(node.mounted.bind(node));
            }
        };
        this.treeTrevesal(handler, this);
    };
    RootView.prototype.appendChild = function (node) {
        var container = node.container;
        if (!!node.children) {
            node.children.forEach(function (child) {
                container.append(child.container);
            });
        }
    };
    RootView.prototype.runMountedHooks = function () {
        var _this = this;
        setTimeout(function () {
            _this.hooks.forEach(function (hook) { return hook(); });
        }, 500);
    };
    return RootView;
}(View));
exports.RootView = RootView;
