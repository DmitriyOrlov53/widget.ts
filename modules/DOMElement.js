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
exports.AttributesDOMStream = exports.ClassesDOMStream = exports.DOMElement = void 0;
var Store_1 = require("./Store");
var DOMElement = /** @class */ (function () {
    function DOMElement(template) {
        var tag = template.tag, classes = template.classes, attributes = template.attributes;
        this.container = document.createElement(tag);
        this.classes = new ClassesDOMStream(this);
        this.attributes = new AttributesDOMStream(this);
        this.parseTemplate(classes, attributes);
    }
    DOMElement.prototype.append = function (container) {
        this.container.append(container);
    };
    DOMElement.prototype.parseTemplate = function (classes, attrs) {
        var _this = this;
        classes && classes.forEach(function (_class) { return _this.classes.push(_class); });
        attrs && attrs.forEach(function (attr) { return _this.attributes.push(attr); });
    };
    return DOMElement;
}());
exports.DOMElement = DOMElement;
var DOMStream = /** @class */ (function (_super) {
    __extends(DOMStream, _super);
    function DOMStream() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DOMStream;
}(Store_1.StoreForArrays));
var ClassesDOMStream = /** @class */ (function (_super) {
    __extends(ClassesDOMStream, _super);
    function ClassesDOMStream(DOMElment) {
        var _this = _super.call(this) || this;
        _this.DOMElement = DOMElment;
        _this.classList = _this.DOMElement.container.classList;
        return _this;
    }
    ClassesDOMStream.prototype.push = function (_class) {
        this.classList.add(_class);
        _super.prototype.push.call(this, _class);
    };
    ClassesDOMStream.prototype.pop = function () {
        var _class = this.fields.slice(-1)[0];
        this.classList.remove(_class);
        _super.prototype.pop.call(this);
    };
    return ClassesDOMStream;
}(DOMStream));
exports.ClassesDOMStream = ClassesDOMStream;
var AttributesDOMStream = /** @class */ (function (_super) {
    __extends(AttributesDOMStream, _super);
    function AttributesDOMStream(DOMElement) {
        var _this = _super.call(this) || this;
        _this.DOMElement = DOMElement;
        _this.container = _this.DOMElement.container;
        return _this;
    }
    AttributesDOMStream.prototype.push = function (attribute) {
        var name = attribute.name, value = attribute.value;
        this.container.setAttribute(name, value);
        _super.prototype.push.call(this, attribute);
    };
    AttributesDOMStream.prototype.pop = function () {
        var value = this.fields.slice(-1)[0].value;
        this.container.removeAttribute(value);
        _super.prototype.pop.call(this);
    };
    return AttributesDOMStream;
}(DOMStream));
exports.AttributesDOMStream = AttributesDOMStream;
